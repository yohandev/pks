import { createSignal } from 'solid-js';

import solidLogo from "../assets/solid.svg";
import logo from "../assets/logo.png";

import "../styles/home.css";

function Home() {
    const [count, setCount] = createSignal(0);

    return (
        <>
            <div>
                <a href="/">
                    <img src={logo} class="logo" alt="Skullhouse Logo" />
                </a>
                <a href="https://solidjs.com" target="_blank">
                    <img src={solidLogo} class="logo solid" />
                </a>
            </div>
            <h1>MIT Skullhouse</h1>
            <div class="card">
                <button onClick={() => setCount((x) => x + 1)}>
                    count is {count()}
                </button>
            </div>
        </>
    );
}

export default Home;