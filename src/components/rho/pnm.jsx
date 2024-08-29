import { Show, createSignal } from "solid-js";
import { useFirebaseApp, useDatabase } from "solid-firebase";
import { getDatabase, ref as refDb } from "firebase/database";

import Poster from "./poster";

function Pnm({ year, id }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const pathDb = refDb(db, `/rho/${year}/overview/${id}`);
    const overview = useDatabase(pathDb);

    const [editing, setEditing] = createSignal(false);

    return (
        <div class="pnm-container flex:row">
            <Poster width="400px" />
            <div class="flex:column">
                <form>

                </form>
            </div>
        </div>
    );
}

export default Pnm;