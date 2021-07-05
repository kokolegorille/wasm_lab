import React, { useEffect, useState } from "react";

import { 
    Game, 
    get_current_turn,
    get_grid,
} from "rustygo";

const RustyGo = () => {
    const [game, setGame] = useState();

    useEffect(() => {
        setGame(Game.new());
    }, []);

    if (game) {
        console.log("Go Game: ", game);

        console.log("Current turn: ", get_current_turn(game));

        // console.log("Grid: ", get_grid(game));

        get_grid(game)
    }

    return (
        <div>
            <h1>Rusty Go</h1>
        </div>
    )
}

export default RustyGo;