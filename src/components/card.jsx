import { createEffect } from "solid-js";
import VanillaTilt from "vanilla-tilt";

import "../styles/card.css";

function Card({ children }) {
    let root;

    createEffect(() => {
        if (!root) {
            return;
        }
        VanillaTilt.init(root, {
            "full-page-listening": true,
            "glare": false,
            "max-glare": 0.05,
            "full-page-listening": true,
            "startX": -30,
            "startY": -5,
        });
    })

    return (
        <div class="card" ref={root}>
            {children}
        </div>
    )
}

export default Card;