import { createSignal } from "solid-js";

import NavigationBar from "./navigation";
import banner from "../assets/streetview.jpg";

import "../styles/home.css";

function Home() {
    const [count, setCount] = createSignal(0);

    return (
        <>
            <NavigationBar>
                <a>Hello</a>
                <a>World</a>
                <a>Foo</a>
                <a>Bar</a>
            </NavigationBar>
            <div class="banner" />
            <div class="card">
                <button onClick={() => setCount((x) => x + 1)}>
                    count is {count()}
                </button>
            </div>
        </>
    );
}

export default Home;