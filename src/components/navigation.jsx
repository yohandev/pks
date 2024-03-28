import { useFirebaseApp, useAuth } from "solid-firebase";
import { getAuth } from "firebase/auth";
import { RiSystemLogoutBoxRLine } from 'solid-icons/ri'

import Logo from "./logo";
import Menu, { InternalMenu } from "./menu";

import "../styles/navigation.css";
import { Show } from "solid-js";

function NavigationBar({ children }) {
    const app = useFirebaseApp();
    const auth = useAuth(getAuth(app));

    return (
        <>
            <div class="navigation-bar flex:row flex:align-center flex:wrap">
                <a href="/">
                    <Logo />
                </a>
                <Menu>
                    {children}
                </Menu>
            </div>
            <Show when={auth.data}>
                <InternalMenu>
                    <a href="/alpha">&Alpha;</a>
                    <a href="/gamma">&Gamma;</a>
                    <a href="/delta">&Delta;</a>
                    <a href="/thetatheta">&Theta;&Theta;</a>
                    <a href="/rho">&Rho;</a>
                    <a href="/tau">&Tau;</a>
                    <a href="/omicron">&Omicron;</a>
                    <a href="/psi">&Psi;</a>
                    <a href="/gammatheta">&Gamma;&Theta;</a>
                    <a href="/logout"><RiSystemLogoutBoxRLine /></a>
                </InternalMenu>
            </Show>
        </>
    );
}

export default NavigationBar;