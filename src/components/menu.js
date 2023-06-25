import { useRef, useEffect } from 'preact/hooks';

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
    const hamburger = useRef();
    useEffect(() => {
        // Hide the menu whenever any link is pressed.
        document.addEventListener("click", ({ target, bubbles }) => {
            do {
                if (target?.localName !== "a") {
                    continue;
                }
                if (hamburger.current?.checked) {
                    hamburger.current.checked = false;
                }
            } while ((target = target.parentNode));
        });
    }, []);

    return (
        <div class="menu no-select" {...props}>
            <input id="toggle" type="checkbox" ref={hamburger}/>
            <label id="hamburger" for="toggle">
                <i class="fa-solid fa-bars fa-2xl" id="icon"></i>
            </label>
            <div id="container">
                {children}
            </div>
        </div>
    );
}