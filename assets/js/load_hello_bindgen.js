// import { greet } from "hello-bindgen";
import { run } from "hello-bindgen";


const load_hello_bindgen = () => {
    console.log("HELLO BINDGEN!");

    // greet("Yo c moi! Mike le rappeur...");
    run();

    console.log("BYE BINDGEN!");
}

export default load_hello_bindgen
;