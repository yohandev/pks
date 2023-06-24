import { Logo } from "../components/logo";
import { Menu } from "../components/menu";

import "../styles/nav.css";

/**
 * Component for the top navigation-bar, with the hard-coded options:
 *  > logo/home
 *  > brothers
 *  > gallery
 *  > summer housing
 *  > contact
 */
export function NavBar(props) {
    return (
        <div class="nav-bar" {...props}>
            <Logo id="logo" href="/"/>
            <Menu id="menu">
                <a href="/brothers">brothers</a>
                <a href="/gallery">gallery</a>
                <a href="/housing">summer housing</a>
                <a href="/contact">contact</a>
            </Menu>
        </div>
    );
}