import { createResource, createUniqueId, Match, Show, Switch } from "solid-js";
import { useDatabase, useFirebaseApp } from "solid-firebase";
import { getDatabase, ref as refDb, set as setDb } from "firebase/database";
import { deleteObject, getStorage, ref as refStorage, uploadBytes } from "firebase/storage";

import { PnmPhoto } from "./photo";
import { activesKerbs } from "../auth";

export function PnmEdit({ uuid }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const info = useDatabase(refDb(db, `/rho/people/${uuid}`));

    return (
        <div class="flex:column">
            <div class="flex:prefer-row flex:space-around">
                <div class="flex:column margin:10px">
                    <PnmPhoto uuid={uuid} size="250px" />
                    <PnmUploadPhotoButton uuid={uuid} />
                </div>
                <Switch>
                    <Match when={info.loading}>
                        <div>🔄</div>
                    </Match>
                    <Match when={info.data}>
                        <PnmEditForm uuid={uuid} info={info.data} />
                    </Match>
                    <Match when={info.error}>
                        <div>⚠️ There was an error loading this PNM.</div>
                    </Match>
                </Switch>
            </div>
        </div>
    );
}

function PnmEditFormItem({ info, name, type, children }) {
    return (
        <div class="form-item flex:40%">
            <label for={name}>{children}</label>
            <input id={name} name={name} type={type} placeholder="???" value={info[name] ?? ""}></input>
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
            // Make a small update if possible
            setDb(refDb(db, `/rho/people/${uuid}/${updatedField}`), e.target.type === "checkbox" ? e.target.checked : e.target.value);
        } else {
            // Or just update the entire document
            console.log(`update whole PNM`)
            setDb(refDb(db, `/rho/people/${uuid}`), Object.fromEntries(new FormData(e.target).entries()));
        }
    }

    return (
        <form class="flex:column" onChange={saveChanges} onSubmit={saveChanges}>
            <div class="form-item">
                <label for="notes">Notes</label>
                <textarea id="notes" name="notes" placeholder="Summary/notes for this PNM" value={info.notes ?? ""} rows={5}></textarea>
            </div>
            <div class="flex:prefer-row flex:wrap">
                <PnmEditFormItem name="fullName" type="text" info={info}>Name</PnmEditFormItem>
                <PnmEditFormItem name="phone" type="tel" info={info}>Phone Number</PnmEditFormItem>
                <PnmEditFormItem name="hometown" type="text" info={info}>Hometown</PnmEditFormItem>
                <PnmEditFormItem name="major" type="text" info={info}>Major</PnmEditFormItem>
                <div class="form-item flex:40%">
                    <label for="contact">Primary Contact</label>
                    <select id="contact" name="contact">
                        <For each={actives()}>{(kerb) =>
                            <option value={kerb} selected={kerb == info.contact}>{kerb}</option>
                        }</For>
                        <option value="" selected={!info.contact} disabled hidden>???</option>
                    </select>
                </div>
                <PnmEditFormItem name="lastContacted" type="date" info={info}>Last Contacted</PnmEditFormItem>
                <div class="form-item flex:100%">
                    <label for="invitedTo">Invited to</label>
                    <fieldset name="invitedTo" class="flex:prefer-row flex:space-around">
                        <div class="flex:row flex:justify-center">
                            <input type="checkbox" id="inv0" name="inv0" checked={info.inv0}></input>
                            <label for="inv0">Boat Cruise 🚢</label>
                        </div>
                        <div class="flex:row flex:justify-center">
                            <input type="checkbox" id="inv1" name="inv1" checked={info.inv1}></input>
                            <label for="inv1">Steak & Lobster 🦞</label>
                        </div>
                        <div class="flex:row flex:justify-center">
                            <input type="checkbox" id="inv2" name="inv2" checked={info.inv2}></input>
                            <label for="inv2">Bid Dinner ☠️</label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </form>
    );
}

function PnmUploadPhotoButton({ uuid }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const current = useDatabase(refDb(db, `/rho/people/${uuid}/photo`));

    // Can't destructure props here
    // https://github.com/solidjs/solid/discussions/287#discussioncomment-240864
    function Inner(props) {
        const storage = getStorage(app);

        function uploadedFileChanged(e) {
            const file = e.target?.files?.[0];
            if (!file) {
                return;
            }

            const fileUuid = Math.random().toString(16).slice(2);

            uploadBytes(refStorage(storage, `rho/${fileUuid}`), file).then(() => {
                if (props.current) {
                    deleteObject(refStorage(storage, `rho/${props.current}_300x300`));
                }
                setDb(refDb(db, `/rho/people/${uuid}/photo`), fileUuid);

                // Done, reload the page to see effects
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
        }

        return (
            <form>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    onChange={uploadedFileChanged}
                ></input>
                <label for="photo">{props.current ? "Change Photo" : "Upload Photo"}</label>
            </form>
        );
    }

    return (
        <Show when={!current.loading && !current.error}>
            <Inner current={current.data} />
        </Show>
    );
}

function PnmComments({ uuid }) {

}