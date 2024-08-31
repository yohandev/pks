import { useFirebaseApp, useDatabase } from "solid-firebase";
import { getDatabase, ref as refDb, set as setDb, update } from "firebase/database";

import { PosterDb } from "./poster";
import { activesKerbs } from "../auth";
import { createEffect, createResource, For } from "solid-js";

function PnmEdit({ uuid }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const pathDb = refDb(db, `/rho/people/${uuid}`);
    const info = useDatabase(pathDb);

    return (
        <div class="flex:prefer-row flex:space-around content">
            <div class="margin:10px">
                <PosterDb uuid={uuid} width="250px" />
            </div>
            <Switch>
                <Match when={info.loading}>
                    <p>Loading...</p>
                </Match>
                <Match when={info.data}>
                    <PnmEditForm uuid={uuid} info={info.data} />
                </Match>
                <Match when={pnms.error}>
                    <p>There was an error fetching this PNM...</p>
                    <p>{JSON.stringify(pnms.error)}</p>
                </Match>
            </Switch>
        </div>
    );
}

function PnmEditForm({ uuid, info }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);

    const [actives] = createResource(activesKerbs);

    function saveChanges(e) {
        e.preventDefault();

        const updatedField = e.target?.name;
        if (updatedField) {
            const updatedValue = e.target.value;
            
            console.log(`setting ${updatedField} to \"${updatedValue}\"`);
            setDb(refDb(db, `/rho/people/${uuid}/${updatedField}`), updatedValue);
        } else {
            const updatedPnm = Object.fromEntries(new FormData(e.target).entries());
            
            console.log(`updating PNM ${uuid} to "${JSON.stringify(updatedPnm)}"`);
            setDb(refDb(db, `/rho/people/${uuid}`), updatedPnm);
        }
    }

    return (
        <form class="flex:column" onChange={saveChanges} onSubmit={saveChanges}>
            <div class="form-item">
                <label for="notes">Notes</label>
                <textarea id="notes" name="notes" placeholder="Summary/notes for this PNM" value={info.notes ?? ""}></textarea>
            </div>
            <div class="flex:prefer-row flex:wrap">
                <div class="form-item flex:40%">
                    <label for="fullName">Name</label>
                    <input id="fullName" name="fullName" type="text" placeholder="???" value={info.fullName ?? ""}></input>
                </div>
                <div class="form-item flex:40%">
                    <label for="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="???" value={info.phone ?? ""}></input>
                </div>
                <div class="form-item flex:40%">
                    <label for="hometown">Hometown</label>
                    <input id="hometown" name="hometown" type="text" placeholder="???" value={info.hometown ?? ""}></input>
                </div>
                <div class="form-item flex:40%">
                    <label for="major">Major</label>
                    <input id="major" name="major" type="text" placeholder="???" value={info.major ?? ""}></input>
                </div>
                <div class="form-item flex:40%">
                    <label for="contact">Primary Contact</label>
                    <select id="contact" name="contact">
                        <For each={actives()}>{(kerb) =>
                            <option value={kerb} selected={kerb == info.contact}>{kerb}</option>
                        }</For>
                        <option value="" selected={!info.contact} disabled hidden>???</option>
                    </select>
                </div>
                <div class="form-item flex:40%">
                    <label for="lastContacted">Last Contacted</label>
                    <input id="lastContacted" name="lastContacted" type="date" value={info.lastContacted ?? ""}></input>
                </div>
            </div>
        </form>
    );
}

export default PnmEdit;