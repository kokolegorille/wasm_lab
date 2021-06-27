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

    // if (engine) {
    //     log_game(engine);

    //     // console.log(get_piece(engine, 2, 2));

    //     // console.log(get_piece(engine, 0, 1));

    //     Array(8).fill().map((_, y) => 
    //         Array(8).fill().map((_, x) => {
    //             console.log(`${x}:${y} -> ${get_piece(engine, x, y)}`)
    //         })
    //     )

    //     console.log(get_current_turn(engine));

    //     console.log("Moving a piece!");

    //     // White is on top
    //     console.log(move_piece(engine, 0, 5, 1, 4));

    //     Array(8).fill().map((_, y) => 
    //         Array(8).fill().map((_, x) => {
    //             console.log(`${x}:${y} -> ${get_piece(engine, x, y)}`)
    //         })
    //     )

    //     console.log(get_current_turn(engine));
    // }

    // Sample moves
    if (engine) {
        move_piece(engine, 0, 5, 1, 4);

        move_piece(engine, 3, 2, 2, 3);

        move_piece(engine, 1, 4, 3, 2);

        move_piece(engine, 2, 1, 4, 3);
    }

    const renderEngine = () => {
        if (!engine) { return null }
        return (
            <div className="monospace">
                <div>
                    <span>&nbsp;</span>
                    {
                        Array(8).fill().map((_, x) => <span key={`head-${x}`}>{` ${x} `}</span>)
                    }
                </div>
                {
                    Array(8).fill().map((_, y) => <div key={`row-${y}`}><span>{y}</span>{
                        Array(8).fill().map((_, x) => 
                            <span key={`cell-${y}-${x}`}>
                                { renderPiece(get_piece(engine, x, y)) }
                            </span>)
                    }</div>)
                }
            </div>
        )
    }

    const renderPiece = piece => {
        switch(piece) {
            case -1: return " . "
            case 1: return " B "
            case 2: return " W "
            case 5: return " B*"
            case 6: return " W*"
        }
    }

    console.log(`Rendering ${engine}`);

    return (
        <div>
            <h1>Rusty Checkers</h1>
            { renderEngine() }
        </div>
    )
}

export default RustyCheckers;