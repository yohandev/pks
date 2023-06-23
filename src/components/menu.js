import "../styles/menu.css";

/**
 * Component for a horizontal text menu, which collapses to a hamburger button
 * on smaller devices. It accepts link(`<a>`) children for its options, ie:
 * ```
 * <Menu>
 *      <a href="/">Home</a>
 *      <a href="/about">About</a>
 *      <a href="/contact">Contact</a>
 * </Menu>
 * ```
 */
export function Menu({ children, ...props }) {
    return (
        <div class="menu no-select" {...props}>
            <input id="toggle" type="checkbox"/>
            <label id="hamburger" for="toggle">
                <i class="fa-solid fa-bars fa-2xl" id="icon"></i>
            </label>
            <div id="container">
                {children}
            </div>
        </div>
    );
}