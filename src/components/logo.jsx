import logo from "../assets/logo.png";

import "../styles/logo.css";

function Logo() {
    return (
        <div class="logo-container flex:row hover:glow">
            <img src={logo} class="logo" alt="Skullhouse Logo" />
            <div class="flex:column">
                <h2>
                    MIT Alpha Mu Chapter
                </h2>
                <h1>
                    Phi Kappa Sigma
                </h1>
            </div>
        </div>
    )
}

export default Logo;