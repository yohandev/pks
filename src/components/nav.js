import { Logo } from "../components/logo";
import { InternalMenu, Menu } from "../components/menu";
import { Fetch } from "../components/fetch";

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
        <>
            <div class="nav-bar" {...props}>
                <Logo id="logo" href="/"/>
                <Menu id="menu">
                    <a href="/brothers">brothers</a>
                    <a href="/gallery">gallery</a>
                    <a href="/housing">summer housing</a>
                    <a href="/contact">contact</a>
                </Menu>
            </div>
            <Fetch url="/api/whoami.cgi" text options={{ credentials: "include" }}>
                {(res) => res.trim() == "brother" && (
                    <InternalMenu>
                        <a href="/alpha" color="#FFA500">&Alpha;</a>
                        <a href="/gamma" color="#B22222">&Gamma;</a>
                        <a href="/delta" color="#663399">&Delta;</a>
                        <a href="/thetatheta" color="#008080">&Theta;&Theta;</a>
                        <a href="/rho" color="#DC143C">&Rho;</a>
                        <a href="/tau" color="#48D1CC">&Tau;</a>
                        <a href="/omicron" color="#008B8B">&Omicron;</a>
                        <a href="/psi" color="#6B8E23">&Psi;</a>
                        <a href="/gammetheta" color="#483D8B">&Gamma;&Theta;</a>
                        <a href="/logout" icon>&#xe9ba;</a>
                    </InternalMenu>
                )}
            </Fetch>
        </>
    );
}