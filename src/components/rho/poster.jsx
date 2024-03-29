import { createMemo } from "solid-js";

import poster from "../../assets/rho/poster.jpg";
import "../../styles/poster.css";

const FLUSHED_MESSAGE = [
    "NOT WANTED",
    "I'M GOOD",
    "NO THANKS",
    "UH, YIKES",
    "I'LL PASS",
    "WE GOOD",
    "FLUSHED",
    "NOT HIM",
    "CABRÓN",
]

function Poster({ name, wanted=true, width="200px" }) {
    const wantedMessage = createMemo(() => (
        wanted ? "WANTED" : FLUSHED_MESSAGE[Math.floor(Math.random() * FLUSHED_MESSAGE.length)]
    ));
    return (
        // Adapted from the PSD document found here:
        // https://claystage.com/one-piece-wanted-poster-template
        <svg
            width={width}
            height="100%"
            viewBox="0 0 877 1240"
            preserveAspectRatio="xMinYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <image href={poster} width="100%" height="100%"/>
            <text
                class="wanted-poster-text"
                x="50"
                y="15"
                lengthAdjust="spacingAndGlyphs"
                textLength="790"
                transform="scale(1, 15)"
            >
                WANTED
            </text>
            <text
                class="wanted-poster-text"
                x="3.5%"
                y="190"
                lengthAdjust="spacing"
                textLength="263"
                transform="scale(2.666, 4.5)"
                style="font-weight: 1000"
            >
                DEAD&nbsp;&nbsp;OR&nbsp;&nbsp;ALIVE
            </text>
            <text
                class="wanted-poster-text"
                y="1140"
                transform="scale(0.75, 1)"
                style="font-weight: 1000"
            >
                <tspan x="105" dy="1.2em">KONO SAKUHIN HA FICTION DETHUNODE JITSUZAISURU JINBUTSU DANTAI</tspan>
                <tspan x="105" dy="1.2em">SONOTA NO SOSHIKI TO DOITSU NO MEISHOU GA GEKICHU NI TOUJYOU</tspan>
                <tspan x="105" dy="1.2em">SHITATOSHITEMO JITSUZAI NA MONOTOHA ISSAI MUKANKEIDETH</tspan>
            </text>

            <text
                class="wanted-poster-text"
                x="140"
                y="240"
                transform="scale(4, 5)"
                style="font-weight: 900"
                textAnchor="end"
            >
                MARINE
            </text>
            <text
                class="wanted-poster-text"
                x="80"
                y="100"
                lengthAdjust="spacingAndGlyphs"
                textLength="720"
                transform="scale(1, 10)"
                textAnchor="middle"
            >
                MONKEY D. LUFFY
            </text>
            <text
                class="wanted-poster-bounty"
                x="45"
                y="277.5"
                lengthAdjust="spacing"
                textLength="140"
                transform="scale(4, 4)"
            >
                1,000,000,000-
            </text>
        </svg>
    );
}

export default Poster;