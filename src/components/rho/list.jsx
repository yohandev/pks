import { useDatabase, useFirebaseApp } from "solid-firebase";
import { getDatabase, ref as refDb, push as pushDb, set as setDb, orderByChild, query, equalTo } from "firebase/database";

import { PnmPhoto } from "./photo";
import { createEffect, createMemo, For, Match, Show, Switch } from "solid-js";
import { useNavigate } from "@solidjs/router";

export function PnmList({ year }) {
    const app = useFirebaseApp();

    const db = getDatabase(app);
    const pnms = useDatabase(query(refDb(db, "/rho/i"), orderByChild("year"), equalTo(year)));

    return (
        <Switch>
            <Match when={pnms.loading}>
                <div>
                    🔄
                </div>
            </Match>
            <Match when={pnms.data}>
                <div class="flex:column">
                    <For each={Object.entries(pnms.data)}>
                        {([uuid, info]) => (
                            <PnmListItem uuid={uuid} info={info} />
                        )}
                    </For>
                </div>
            </Match>
            <Match when={pnms.error}>
                <div>
                    There was an error fetching PNMs!
                    <br/>
                    {JSON.stringify(pnms.error)}
                </div>
            </Match>
        </Switch>
    );
}

function PnmListItem({ uuid, info }) {
    const contactedDaysAgo = createMemo(() => {
        const dt = new Date().getTime() - new Date(info.lastContacted).getTime();
        const days = dt / (24 * 60 * 60 * 1000);

        return days >= 0 && days < 100 ? Math.floor(days) : null;
    });

    return (
        <a href={`/rho/${uuid}`} class={`rho-pnm-list-item hover:glow ${info.flushed ? "rho-pnm-flushed" : ""}`}>
            <PnmPhoto uuid={uuid} size="50px" />
            <div class="rho-pnm-name">
                {info.fullName}
            </div>
            <div class="rho-pnm-status">
                <div class="flex:row">
                    <Show when={info.inv0}>🚢</Show>
                    <Show when={info.inv1}>🦞</Show>
                    <Show when={info.inv2}>☠️</Show>
                </div>
                <div class="rho-pnm-contacted">
                    <Show when={!info.flushed && contactedDaysAgo()}>
                        {contactedDaysAgo()} ⏰
                    </Show>
                </div>
            </div>
        </a>
    );
}


export function AddPnmButton({ year }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const navigate = useNavigate();

    function addPnm(e) {
        e.preventDefault();

        pushDb(refDb(db, `/rho/i`), { year, fullName: "PNM" }).then((val) => {
            navigate(`/rho/${val.key}`);
        });
    }

    return (
        <form onSubmit={addPnm} class="margin:10px" style="margin-top: -20px;">
            <input type="submit" value="Add a new PNM"></input>
        </form>
    );
}