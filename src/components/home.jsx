import { createSignal } from 'solid-js';

import Logo from './logo';

import "../styles/home.css";

function Home() {
    const [count, setCount] = createSignal(0);

    return (
        <>
            <a href="/">
                <Logo />
            </a>
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