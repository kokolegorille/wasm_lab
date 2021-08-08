import React, { useEffect, useState } from "react";

import { 
    Game, 
    get_current_turn,
    get_grid,
} from "rustygo";

const RustyGo = () => {
    const [game, setGame] = useState();

    useEffect(() => {
        // If You use 
        // #[wasm_bindgen(constructor)]
        // You need to call new Game()
        // else, Game.new()

        // setGame(Game.new());
        setGame(new Game());
    }, []);

    if (game) {
        console.log("Go Game: ", game);

        console.log("Current turn: ", get_current_turn(game));

        // console.log("Grid: ", get_grid(game));

        const grid = get_grid(game);

        console.log(grid);
    }

    return (
        <div>
            <h1>Rusty Go</h1>
        </div>
    )
}

export default RustyGo;