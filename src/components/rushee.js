import "../styles/rushee.css";

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
export function RusheeCard({ name, level, photo, ...props }) {
    // Rarity goes from common (no bid) to legendary (bid)
    // Elixir is more for aesthetics, but higher is better
    const [rarity, elixir] = (() => { switch (Math.max(Math.min(level, 10), 1)) {
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
    return (
        <div class="rushee-card" rarity={rarity}>
            <div id="glow"/>
            <div id="photo" style={`background-image: url("${photo}")`}/>
            <div id="overlay"/>
            <div id="elixir">
                {elixir}
            </div>
            <div id="name">
                {name}
            </div>
        </div>
    );
}