import Logo from "./logo";
import Menu from "./menu";

import "../styles/navigation.css";

function NavigationBar({ children }) {
    return (
        <div class="navigation-bar flex:row flex:align-center">
            <a href="/">
                <Logo />
            </a>
            <Menu>
                {children}
            </Menu>
        </div>
    );
}

export default NavigationBar;