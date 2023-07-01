import { Fetch } from "../components/fetch";

import "../styles/brothers.css";

/**
 * Component for the view that displays the active brothers and a
 * short blurb about them.
 */
export function Brothers() {
    return (
        <Fetch url="/api/brothers.cgi" json>
            {(brothers) => (
                <div class="brothers">
                    {brothers.map(({ name, picture }) => (
                        <div class="brother">
                            <img src={picture}/>
                            <p>{name}</p>
                        </div>
                    ))}
                </div>
            )}
        </Fetch>
    );
}