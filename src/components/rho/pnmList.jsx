import { getDatabase, ref as refDb } from "firebase/database";
import { getStorage, ref as refStorage } from "firebase/storage";
import { useFirebaseApp, useDatabase, useDownloadURL } from "solid-firebase";
import { For, Match, Show, Switch } from "solid-js";

import Poster from "./poster";

function PnmList({ year }) {
    year = year ?? (new Date().getFullYear() + 4)

    const app = useFirebaseApp();
    const db = getDatabase(app);
    const pnms = useDatabase(refDb(db, `/rho/${year}/overview`));

    return (
        <Switch >
            <Match when={pnms.loading}>
                <p>Loading...</p>
            </Match>
            <Match when={pnms.data}>
                <For each={Object.entries(pnms.data)}>{([id,  overview]) =>
                    <PosterDb id={id} overview={overview} />
                }</For>
            </Match>
            <Match when={pnms.error}>
                <p>There was an error fetching PNMs...</p>
                <p>{JSON.stringify(pnms.error)}</p>
            </Match>
        </Switch>
    );
}

function PosterDb({ id, overview: { name, flushed, bounty } }) {
    const app = useFirebaseApp();
    const storage = getStorage(app);
    const image = useDownloadURL(refStorage(storage, `rho/${id}.jpg`));

    return (
        <Show when={image()}>
            <Poster
                name={name}
                image={image()}
                bounty={bounty}
                wanted={!flushed}
                width="200px"
            />
        </Show>
    );
}

export default PnmList;