import { Router } from "preact-router";
import { RusheeCard } from "../components/rho/card";
import { RusheeInfo, RUSHEES } from "../components/rho/rushee";
import { Fetch } from "../components/fetch";

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
            <RusheeGrid/>
            <Router>
                <div path="/rho" default/>
                <RusheeInfo path="/rho/i/:id"/>
            </Router>
        </div>
    );
}

/**
 * Component for a list of rushees
 */
function RusheeGrid() {

    return (
        <div id="cards-container">
            <Fetch url="/api/rushee.cgi" json>
                {(rushees) => rushees.map((rushee) => (
                    <a href={`/rho/i/${rushee.id}`}>
                        <RusheeCard {...rushee}/>
                    </a>
                ))}
            </Fetch>
        </div>
    );
}