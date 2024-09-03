import { useDatabase, useFirebaseApp } from "solid-firebase";
import { getDatabase, ref as refDb, push as pushDb, set as setDb, orderByChild, query, equalTo } from "firebase/database";

import { PnmPhoto } from "./photo";
import { createMemo, For, Match, Show, Switch } from "solid-js";
import { useNavigate } from "@solidjs/router";

export function PnmList(props) {
    const app = useFirebaseApp();

    const db = getDatabase(app);
    const pnms = useDatabase(query(refDb(db, "/rho/i"), orderByChild("year"), equalTo(props.year)));
    const sortedPnms = createMemo(() => {
        if (!pnms.data) {
            return [];
        }
        return Object
            .entries(pnms.data)
            .map(([uuid, info]) => ([uuid, {
                fullName: info.fullName,
                inv0: info.inv0,
                inv1: info.inv1,
                inv2: info.inv2,
                flushed: info.flushed,
                lastContacted: info.lastContacted,
            }]))
            .toSorted(([_ua, a], [_ub, b]) => {
                if (a.flushed) {
                    return 1;
                }
                if (b.flushed) {
                    return -1;
                }
                switch (props.sort) {
                    case "score":
                        function score(i) {
                            if (!i) {
                                return 0;
                            }
                            return Object.values(i).reduce((sum, s) => sum + (Number(s) == 2 ? 1 : 0), 0);
                        }
                        return score(b.score) - score(a.score);
                    case "inv0":
                    case "inv1":
                    case "inv2":
                        return (b[props.sort] ? 1 : 0) - (a[props.sort] ? 1 : 0);
                    default:
                        return 0;
                }
            });
    });

    return (
        <Switch>
            <Match when={pnms.loading}>
                <div>
                    🔄
                </div>
            </Match>
            <Match when={pnms.data}>
                <div class="flex:column">
                    <For each={sortedPnms()}>
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
        <form onSubmit={addPnm} class="margin:10px">
            <input type="submit" value="Add a new PNM"></input>
        </form>
    );
}