import { Router } from "preact-router";
import { RusheeCard } from "../components/rho/card";
import { RusheeInfo } from "../components/rho/rushee";

import "../styles/rho/rho.css";

/**
 * Component for the rho (rush chair)'s internal website. This is its "main"
 * page and this subsection is used for rush jobs and adding rushee's contact
 * information (i.e. what the old rush website used to do).
 */
export function Rho() {
    return (
        <div class="rho-container">
            <button class="cr-button">Add Rushee</button>
            <button class="cr-button green">Invite to S&L</button>
            <Router>
                <RusheeGrid path="/rho"/>
                <RusheeInfo path="/rho/i/:id"/>
            </Router>
        </div>
    );
}

/**
 * Component for a list of rushees
 */
function RusheeGrid() {
    const RUSHEES = [
        { photo: "https://i.imgur.com/VShn15G.jpg", level: 10, name: "Matt S." },
        { photo: "https://i.imgur.com/fcsaEgz.jpg", level: 10, name: "Nick D." },
        { photo: "https://imgur.com/3SChj5E.jpg", level: 8, name: "Will R." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
        { photo: "https://i.imgur.com/gC6QAle.jpg", level: 3, name: "Ellington Hemphill" },
        { photo: "https://i.imgur.com/rbE3Nmb.png", level: 1, name: "Rushil" },
    ];
    return (
        <div id="cards-container">
            {RUSHEES.map((rushee, i) => (
                <a href={`/rho/i/${i}`}>
                    <RusheeCard {...rushee}/>
                </a>
            ))}
        </div>
    );
}