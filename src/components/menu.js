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
                {/* <i class="fa-solid fa-bars fa-2xl" id="icon"></i> */}
                <span class="material-symbols-rounded" id="icon">menu</span>
            </label>
            <div id="container">
                {children}
            </div>
        </div>
    );
}

/**
 * Component for a grid-style text menu, which is displayed only to logged-in users.
 * It accepts link(`<a>`) children for its options, ie:
 * ```
 * <InternalMenu>
 *      <a href="/rush">ρ</a>
 *      <a href="/food">δ</a>
 *      <a href="/parties">θθ</a>
 *      <a href="/logout" icon>&#xe9ba;</a>
 * </InternalMenu>
 * ```
 */
export function InternalMenu({ children, ...props }) {
    children.forEach((element) => {
        if (!element.props.icon) {
            return;
        }
        element.props.class += ` material-symbols-rounded`;
    })
    return (
        <div class="internal-menu" {...props}>
            {children}
        </div>
    );
}