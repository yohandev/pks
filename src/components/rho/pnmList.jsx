import { getDatabase, ref as refDb } from "firebase/database";
import { getStorage, ref as refStorage } from "firebase/storage";
import { useFirebaseApp, useDatabase, useDownloadURL } from "solid-firebase";
import { For, Match, Show, Switch } from "solid-js";

import { PosterDb } from "./poster";

function PnmList({ year }) {
    year = year ?? (new Date().getFullYear() + 4)

    const app = useFirebaseApp();
    const db = getDatabase(app);
    const pnms = useDatabase(refDb(db, `/rho/years/${year}`));

    return (
        <Switch>
            <Match when={pnms.loading}>
                <p>Loading...</p>
            </Match>
            <Match when={pnms.data}>
                <For each={pnms.data}>{(id) =>
                    <PosterDb id={id} width="150px" />
                }</For>
            </Match>
            <Match when={pnms.error}>
                <p>There was an error fetching PNMs...</p>
                <p>{JSON.stringify(pnms.error)}</p>
            </Match>
        </Switch>
    );
}

export default PnmList;