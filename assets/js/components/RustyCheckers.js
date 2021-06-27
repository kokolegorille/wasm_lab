import React, { useEffect, useState } from "react";

import { 
    GameEngine, 
    log_game, 
    get_piece,
    get_current_turn,
    move_piece
} from "rustycheckers";

const RustyCheckers = () => {
    const [engine, setEngine] = useState();

    useEffect(() => {
        setEngine(GameEngine.new());
    }, []);

    // console.log(engine);

    if (engine) {
        log_game(engine);

        // console.log(get_piece(engine, 2, 2));

        // console.log(get_piece(engine, 0, 1));

        Array(8).fill().map((_, y) => 
            Array(8).fill().map((_, x) => {
                console.log(`${x}:${y} -> ${get_piece(engine, x, y)}`)
            })
        )

        console.log(get_current_turn(engine));

        console.log("Moving a piece!");

        // White is on top
        console.log(move_piece(engine, 0, 5, 1, 4));

        Array(8).fill().map((_, y) => 
            Array(8).fill().map((_, x) => {
                console.log(`${x}:${y} -> ${get_piece(engine, x, y)}`)
            })
        )

        console.log(get_current_turn(engine));
    }

    return (
        <div>
            <h1>Rusty Checkers</h1>
        </div>
    )
}

export default RustyCheckers;