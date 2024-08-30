import { createSignal } from "solid-js";
import { useFirebaseApp, useDatabase } from "solid-firebase";
import { getDatabase, ref as refDb } from "firebase/database";

import { PosterDb } from "./poster";

function PnmEdit({ uuid }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const pathDb = refDb(db, `/rho/people/${uuid}`);
    const overview = useDatabase(pathDb);

    const [editing, setEditing] = createSignal(false);

    return (
        <div class="pnm-container flex:row">
            <PosterDb uuid={uuid} width="250px" />
            <form class="flex:column">
                <input id="name" type="text" placeholder="Name"></input>
                <textarea id="description" placeholder="Summary/notes for this PNM"></textarea>
            </form>
        </div>
    );
}

export default PnmEdit;