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
                        <a href="/alpha">&Alpha;</a>
                        <a href="/gamma">&Gamma;</a>
                        <a href="/delta">&Delta;</a>
                        <a href="/thetatheta">&Theta;&Theta;</a>
                        <a href="/rho">&Rho;</a>
                        <a href="/tau">&Tau;</a>
                        <a href="/omicron">&Omicron;</a>
                        <a href="/psi">&Psi;</a>
                        <a href="/gammetheta">&Gamma;&Theta;</a>
                        <a href="/settings" icon>&#xf02e;</a>
                        <a href="/logout" icon>&#xe9ba;</a>
                    </InternalMenu>
                )}
            </Fetch>
        </>
    );
}