import React, { useEffect, useState } from "react";

import { GameEngine, log_game } from "rustycheckers";

const RustyCheckers = () => {
    const [engine, setEngine] = useState();

    useEffect(() => {
        setEngine(GameEngine.new());
    }, []);

    // console.log(engine);

    if (engine) {
        log_game(engine);
    }

    return (
        <div>
            <h1>Rusty Checkers</h1>
        </div>
    )
}

export default RustyCheckers;