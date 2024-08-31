import { getDatabase, push as pushDb, ref as refDb, set as setDb } from "firebase/database";
import { useFirebaseApp, useDatabase, useDownloadURL } from "solid-firebase";
import { For, Match, Switch } from "solid-js";

import { useNavigate } from "@solidjs/router";
import { PnmPhoto } from "./photo";

function PnmList({ year }) {
    year = year ?? (new Date().getFullYear() + 4)

    const app = useFirebaseApp();
    const db = getDatabase(app);
    const pnms = useDatabase(refDb(db, `/rho/years/${year}`));
    const navigate = useNavigate();

    function addPnm(e) {
        e.preventDefault();

        const newPnmRef = pushDb(refDb(db, `/rho/people`));

        newPnmRef.then((val) => {
            const inYearRef = pushDb(refDb(db, `/rho/years/${year}`));
            setDb(inYearRef, val.key);

            navigate(`/rho/${val.key}`);
        })

        setDb(newPnmRef, { fullName: "new PNM!" });
    }

    return (
        <div class="flex:column">
            <form onSubmit={addPnm}>
                <input type="submit" value="Add a new PNM"></input>
            </form>
            <div class="flex:column flex:justify-center">
                <Switch>
                    <Match when={pnms.loading}>
                        <p>Loading...</p>
                    </Match>
                    <Match when={pnms.data}>
                        <For each={Object.values(pnms.data)}>{(uuid) =>
                            <PnmListItem uuid={uuid} />
                        }</For>
                    </Match>
                    <Match when={pnms.error}>
                        <p>There was an error fetching PNMs...</p>
                        <p>{JSON.stringify(pnms.error)}</p>
                    </Match>
                </Switch>
            </div>
        </div>
    );
}

function PnmListItem({ uuid }) {
    const app = useFirebaseApp();

    const db = getDatabase(app);
    const name = useDatabase(refDb(db, `/rho/people/${uuid}/fullName`));
    
    return (
        <a href={`/rho/${uuid}`} class="flex:row margin:5px">
            <div class="hover:glow">
                <PnmPhoto uuid={uuid} size="70px" />
            </div>
            {name.loading ? "🔄" : name.data}
        </a>
    );
}

export default PnmList;