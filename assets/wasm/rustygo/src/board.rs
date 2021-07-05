extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, PartialEq)]
pub enum Color {
    Black,
    White,
}

impl Color {
    pub fn next(&self) -> Self {
        match self {
            Color::Black => Color::White,
            Color::White => Color::Black,
        }
    }
}

impl ToString for Color {
    fn to_string(&self) -> String {
        match self {
            Color::Black => String::from("X"),
            Color::White => String::from("O"),
        }
    }
}

#[derive(Copy, Clone, Debug, PartialEq, Eq)]
pub struct Point(pub usize, pub usize);

impl Point {
    pub fn neighbors(&self) -> Vec<Point> {
        let mut vec = Vec::new();

        let Point(x, y) = *self;

        if x > 0 { vec.push(Point(x - 1, y)); }
        if y > 0 { vec.push(Point(x, y - 1)); }
        vec.push(Point(x + 1, y));
        vec.push(Point(x, y + 1));
        vec
    }
}

#[derive(Clone, Debug, PartialEq)]
pub struct GoString {
    color: Color,
    stones: Vec<Point>,
    liberties: Vec<Point>,
}

impl GoString {
    pub fn new(color: Color, stones: Vec<Point>, liberties: Vec<Point>) -> Self {
        Self { color, stones, liberties }
    }

    pub fn num_liberties(&self) -> usize {
        self.liberties.len()
    }

    fn without_liberty(&mut self, point: Point) {
        if let Some(pos) = self.liberties.iter().position(|p| *p == point) {
            self.liberties.remove(pos);
        }
    }

    fn with_liberty(&mut self, point: Point) {
        if let None = self.liberties.iter().position(|p| *p == point) {
            self.liberties.push(point);
        }
    }
}

// #[wasm_bindgen]
#[derive(Debug)]
pub struct Board {
    pub size: usize,
    grid: Vec<Option<GoString>>,
    pub black_captures: usize,
    pub white_captures: usize,
}

// #[wasm_bindgen]
impl Board {
    // #[wasm_bindgen(getter)]
    pub fn grid(&self) -> js_sys::Uint32Array {
        let vector = self.to_usize();
        js_sys::Uint32Array::from(&vector[..])
    }

    fn to_usize(&self) -> Vec<u32> {
        self.grid.iter().map(|el| match el {
            Some(gs) => {
                if gs.color == Color::Black { 1 } else { 2 }
            },
            None => 0,
        }).collect()
    }
}

impl Board {
    pub fn new(size: usize) -> Self {
        Self { 
            size, 
            grid: vec![None; size.pow(2)],
            black_captures: 0,
            white_captures: 0,
        }
    }

    pub fn place_stone(&mut self, color: Color, point: Point) -> Result<(), &'static str> {
        if ! self.is_on_grid(point) { return Err("Not on grid"); }

        match self.grid[self.point_to_index(&point)] {
            Some(_) => Err("Illegal move"),
            None => {
                let mut adjacent_same_color: Vec<GoString> = vec![];
                let mut adjacent_opposite_color: Vec<GoString> = vec![];
                let mut stones: Vec<Point> = vec![point];
                let mut liberties: Vec<Point> = vec![];

                for neighbor in self.neighbors(&point) {
                    match self.get_go_string(neighbor) {
                        Some(go_string) => {
                            if go_string.color == color {
                                if ! adjacent_same_color.contains(&go_string) {
                                    adjacent_same_color.push(go_string);
                                }
                            } else {
                                if ! adjacent_opposite_color.contains(&go_string) {
                                    adjacent_opposite_color.push(go_string);
                                }
                            }
                        },
                        None => liberties.push(neighbor),
                    }
                }

                for same_color_string in adjacent_same_color {
                    stones.extend_from_slice(&same_color_string.stones);
                    liberties.extend_from_slice(&same_color_string.liberties);
                    liberties.retain(|el| ! stones.contains(el))
                }

                let num_liberties = liberties.len();

                // Store killed stones in a vector, for later use with zobrist hash
                let killed: Vec<Point> = adjacent_opposite_color
                    .iter()
                    .filter(|gs| gs.num_liberties() == 1)
                    .flat_map(|gs| gs.stones.clone())
                    .collect();
                let num_killed = killed.len();

                let go_string = GoString::new(color, stones, liberties);

                if num_liberties > 0 || num_killed > 0 {
                    self.replace_string(&go_string);

                    if num_killed > 0 {
                        match color {
                            Color::Black => self.black_captures += num_killed,
                            Color::White => self.white_captures += num_killed,
                        }
                    }

                    for mut other_color_string in adjacent_opposite_color {
                        other_color_string.without_liberty(point);
                        if other_color_string.num_liberties() > 0 {
                            self.replace_string(&other_color_string);
                        } else {
                            self.remove_string(&other_color_string);
                        }
                    }

                    Ok(())
                } else {
                    Err("Illegal move")
                }

            }
        }
    }

    fn replace_string(&mut self, go_string: &GoString) {
        for point in &go_string.stones {
            let index = self.point_to_index(point);
            self.grid[index] = Some(go_string.clone());
        }
    }

    fn remove_string(&mut self, go_string: &GoString) {
        for point in &go_string.stones {
            for neighbor in point.neighbors() {
                match self.get_go_string(neighbor) {
                    Some(mut gs) => {
                        // println!("GS {:?} {:?}", gs, go_string);

                        // Compare on stones or color! because liberties can be different.
                        if gs.color != go_string.color {
                            gs.with_liberty(*point);
                            self.replace_string(&gs);
                        }
                    },
                    None => continue,
                }
            }

            let index = self.point_to_index(point);
            self.grid[index] = None;
        }
    }

    fn neighbors(&self, point: &Point) -> Vec<Point> {
        point.neighbors()
            .into_iter()
            .filter(|p| self.is_on_grid(*p))
            .collect()
    }

    fn is_on_grid(&self, point: Point) -> bool {
        let Point(x, y) = point;
        x < self.size && y < self.size
    }

    fn get_go_string(&self, point: Point) -> Option<GoString> {
        if ! self.is_on_grid(point) { return None; }

        match &self.grid[self.point_to_index(&point)] {
            Some(go_string) => Some(go_string.clone()),
            None => None,
        }
    }

    fn point_to_index(&self, point: &Point) -> usize {
        let Point(x, y) = point;
        x * self.size + y
    }
}

impl ToString for Board {
    fn to_string(&self) -> String {
        let mut string = String::new();
        // Reverse x range to display from the bottom...
        for x in (0..self.size).rev() {
            for y in 0..self.size {
                match self.get_go_string(Point(x, y)) {
                    Some(gs) => string.push_str(&gs.color.to_string()),
                    None => string.push('.'),
                }
            }
            string.push('\n');
        }
        string
    }
}