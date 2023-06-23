import { Logo } from "../components/logo";
import { Menu } from "../components/menu";

import "../styles/home.css";

/**
 * Component for the front-page view of the website
 */
export function Home() {
    return (
        <div class="home">
            <div id="nav-bar">
                <Logo id="logo"/>
                <Menu id="menu">
                    <a>brothers</a>
                    <a>gallery</a>
                    <a>contact</a>
                    <a>summer housing</a>
                </Menu>
            </div>
            <div id="banner"/>
        </div>
    );
}