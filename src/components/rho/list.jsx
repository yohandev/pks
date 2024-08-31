import { useDatabase, useFirebaseApp } from "solid-firebase";
import { getDatabase, ref as refDb } from "firebase/database";

import { PnmPhoto } from "./photo";
import { createMemo, For, Match, Show, Switch } from "solid-js";

export function PnmList({ year }) {
    const app = useFirebaseApp();

    const db = getDatabase(app);
    const uuids = useDatabase(refDb(db, `/rho/years/${year ?? (new Date().getFullYear() + 4)}`));

    return (
        <Switch>
            <Match when={uuids.loading}>
                <div>
                    🔄
                </div>
            </Match>
            <Match when={uuids.data}>
                <div class="flex:column">
                    <For each={Object.values(uuids.data)}>{(uuid) => (
                        <PnmListItem uuid={uuid} />
                    )}</For>
                </div>
            </Match>
            <Match when={uuids.error}>
                <div>
                    There was an error fetching PNMs!
                    <br/>
                    {JSON.stringify(uuids.error)}
                </div>
            </Match>
        </Switch>
    );
}

function PnmListItem({ uuid }) {
    const app = useFirebaseApp();

    const db = getDatabase(app);
    const name = useDatabase(refDb(db, `/rho/people/${uuid}/fullName`));
    const flushed = useDatabase(refDb(db, `/rho/people/${uuid}/flushed`));
    const lastContacted = useDatabase(refDb(db, `/rho/people/${uuid}/lastContacted`));
    const invitedToBoatCruise = useDatabase(refDb(db, `/rho/people/${uuid}/inv0`));
    const invitedToSteakLobster = useDatabase(refDb(db, `/rho/people/${uuid}/inv1`));
    const invitedToBidDinner = useDatabase(refDb(db, `/rho/people/${uuid}/inv2`));

    const contactedDaysAgo = createMemo(() => {
        if (lastContacted.loading || lastContacted.error) {
            return null;
        }
        const dt = new Date().getTime() - new Date(lastContacted.data).getTime();
        const days = dt / (24 * 60 * 60 * 1000);

        return days >= 0 && days < 100 ? Math.floor(days) : null;
    });

    return (
        <a href={`/rho/${uuid}`} class={`rho-pnm-list-item hover:glow ${flushed.data ? "rho-pnm-flushed" : ""}`}>
            <PnmPhoto uuid={uuid} size="50px" />
            <div class="rho-pnm-name">
                {(!name.loading && !name.error) ? name.data : "🔄"}
            </div>
            <div class="rho-pnm-status">
                <div class="flex:row">
                    <Show when={invitedToBoatCruise.data}>🚢</Show>
                    <Show when={invitedToSteakLobster.data}>🦞</Show>
                    <Show when={invitedToBidDinner.data}>☠️</Show>
                </div>
                <div class="rho-pnm-contacted">
                    <Show when={!flushed.data && contactedDaysAgo()}>
                        {contactedDaysAgo()} ⏰
                    </Show>
                </div>
            </div>
        </a>
    );
}