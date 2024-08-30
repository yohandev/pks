import { createMemo } from "solid-js";
import { getDatabase, ref as refDb } from "firebase/database";
import { getStorage, ref as refStorage } from "firebase/storage";
import { useFirebaseApp, useDatabase, useDownloadURL } from "solid-firebase";

import poster from "../../assets/rho/poster.png";
import paper from "../../assets/rho/paper.jpg";

import "../../styles/poster.css";

const FLUSHED_MESSAGE = [
    "FLUSHED",
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

export function PosterDb({ uuid, ...props }) {
    const app = useFirebaseApp();

    const storage = getStorage(app);
    const image = useDownloadURL(refStorage(storage, `rho/${uuid}.jpg`));
    
    const db = getDatabase(app);
    const info = useDatabase(refDb(db, `/rho/people/${uuid}`));

    return (
        <Show when={info.data}>
            <Poster info={info.data} image={image} {...props} />
        </Show>
    );
}

function Poster({ info, image, width="200px" }) {
    const {
        fullName,
        flushed,
        invitedToBoat,
        invitedToSteakLobster,
        invitedToBid,
        notes,
        phone,
    } = info;

    const wantedMessage = createMemo(() => (
        !flushed ? "WANTED" : FLUSHED_MESSAGE[Math.floor(Math.random() * FLUSHED_MESSAGE.length)]
    ));
    const bounty = createMemo(() => (
        1000000000
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
            <image href={image.error ? null : image()} x="80" y="265" width="720" height="520" preserveAspectRatio="xMinYMid slice"/>
            <image href={paper} width="100%" height="100%" style="mix-blend-mode: lighten"/>
            <image href={poster} width="100%" height="100%"/>
            <text
                class="wanted-poster-text"
                x="50"
                y="15"
                lengthAdjust="spacingAndGlyphs"
                textLength="790"
                transform="scale(1, 15)"
            >
                {wantedMessage()}
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
                x="140"
                y="240"
                transform="scale(4, 5)"
                style="font-weight: 900"
                textAnchor="end"
            >
                SKULLS
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
                {fullName.toUpperCase()}
            </text>
            <text
                class="wanted-poster-bounty"
                x="45"
                y="277.5"
                lengthAdjust="spacing"
                textLength="140"
                transform="scale(4, 4)"
            >
                {bounty().toLocaleString() + "-"}
            </text>
        </svg>
    );
}

export default Poster;