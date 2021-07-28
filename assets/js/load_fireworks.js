// import * as fw from "fireworks";
import { memory } from "fireworks/fireworks_bg.wasm";
import * as p5 from "p5";

console.log(p5);

console.log(Math.random)

const load_fireworks = () => {
    console.log("Start Fireworks!");
    console.log(memory);

    // const firework = fw.Firework.new();
    // console.log(firework);
}

export default load_fireworks;