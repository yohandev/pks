import { render } from "preact";
import { Home } from "./views/home";
import { Brothers } from "./views/brothers";
import { NavBar } from "./components/nav";
import { Router } from "preact-router";

import "./styles/app.css";
import { Rho } from "./views/rho";
import { Settings } from "./views/settings";

// Hot-reloading
if (HOT_RELOAD) {
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
                {/* Public Pages */}
                <Home path="/" default/>
                <Brothers path="/brothers"/>
                
                {/* Internal Pages */}
                <Rho path="/rho/:rest*"/>
                <Settings path="/settings"/>
            </Router>
        </>
    );
}

render(<Main/>, document.body);