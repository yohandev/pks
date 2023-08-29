import "../../styles/rho/rushee.css";

/**
 * Component for a card about a rushee. Level is a number from 1..=10 where 1 is unlikely to
 * receive a bid and 10 is bid.
 * 
 * @param {{
 *  name: string;
 *  level: number;
 *  photo: string;
 * }} props
 */
export function RusheeCard({ name, level, picture, ...props }) {
    // Rarity goes from common (no bid) to legendary (bid)
    // Elixir is more for aesthetics, but higher is better
    const [rarity, elixir] = (() => { switch (Math.max(Math.min(level ?? 0, 10), 1)) {
        case 1:
        case 2:
        case 3:
            return ["common", level];
        case 4:
        case 5:
        case 6:
            return ["rare", level - 2];
        case 7:
        case 8:
        case 9:
            return ["epic", level - 2];
        case 10:
            return ["legendary", 9];
    }})();
    // Modify name to first name + last initial
    const [firstName, lastName] = (name ?? "").split(" ");

    return (
        <div class="rushee-card-container" {...props}>
            <div class="rushee-card" rarity={rarity ?? "common"}>
                <div id="glow"/>
                <div id="photo" style={`background-image: url("${picture ?? "/assets/rho/unknown2.png"}")`}/>
                <div id="overlay"/>
                <div id="elixir">
                    {elixir ?? 0}
                </div>
                <div id="name" style={`font-size: ${6 / Math.max(firstName.length, 6)}em`}>
                    {firstName} {lastName ? `${lastName[0]}.` : ""}
                </div>
            </div>
        </div>
    );
}