import { render } from "preact";
import { Home } from "./views/home";
import { Brothers } from "./views/brothers";
import { NavBar } from "./components/nav";
import Router from "preact-router";

import "./styles/app.css";

// Hot-reloading
if (!PROD) {
    new EventSource('/esbuild')
        .addEventListener('change', () => location.reload());
}

/**
 * Entry-point view and what is, essentially, displayed at all times
 * since this is a static website.
 */
function Main() {
    return (
        <>
            <NavBar/>
            <Router>
                <Home path="/" default/>
                <Brothers path="/brothers"/>
            </Router>
        </>
    );
}

render(<Main/>, document.body);