import { RusheeCard } from "../components/rushee";

/**
 * Component for the rho (rush chair)'s internal website. This is its "main"
 * page and this subsection is used for rush jobs and adding rushee's contact
 * information (i.e. what the old rush website used to do).
 */
export function Rho() {
    return (
        <div style="display: flex; flex-direction: row; gap: 30px;">
            <RusheeCard photo="https://i.imgur.com/VShn15G.jpg" level={10} name="Matt S."/>
            <RusheeCard photo="https://i.imgur.com/fcsaEgz.jpg" level={10} name="Nick D."/>
            <RusheeCard photo="https://imgur.com/3SChj5E.jpg" level={8} name="Will R."/>
            <RusheeCard photo="https://imgur.com/AfcMZU0.jpg" level={4} name="Chris H."/>
            <RusheeCard photo="https://i.imgur.com/rbE3Nmb.png" level={1} name="Rushil"/>
        </div>
    );
}

/**
 * Component for the view about a single rushee. It looks like a clash royale
 * page because... LMFAO
 */
export function Rushee() {
    
}