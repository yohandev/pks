import "../styles/menu.css";

/**
 * A navigation bar/hamburger menu (depending on screen size)
 */
function Menu({ children }) {
    return (
        <div class="menu">
            <input id="menu-toggle" class="menu-toggle" type="checkbox" />
            <label id="hamburger" class="menu-hamburger" for="menu-toggle">
                <span class="menu-hamburger-icon">🍔</span>
            </label>
            <div class="menu-items">
                {children}
            </div>
        </div>
    );
}

export function InternalMenu({ children }) {
    return (
        <div class="internal-menu flex:row flex:justify-center flex:wrap">
            {children}
        </div>
    );
}

export default Menu;