import { createSignal } from "solid-js";
import { useFirebaseApp, useDatabase } from "solid-firebase";
import { getDatabase, ref as refDb, set as setDb, update } from "firebase/database";

import { PosterDb } from "./poster";

function PnmEdit({ uuid }) {
    // const app = useFirebaseApp();
    // const db = getDatabase(app);
    // const pathDb = refDb(db, `/rho/people/${uuid}`);
    // const overview = useDatabase(pathDb);
    const {
        fullName,
        notes,
        flushed,
        invitedToBoat,
        invitedToSteakLobster,
        invitedToBid,
        phone,
    } = {
        fullName: "Test Person",
        notes: "This is a summary or notes or something",
        flushed: false,
    };

    const [editing, setEditing] = createSignal(false);

    function saveChanges(e) {
        e.preventDefault();

        const updatedField = e.target?.name;
        if (updatedField) {
            const updatedValue = e.target.value;
            
            console.log(`setting ${updatedField} to \"${updatedValue}\"`)
            // setDb(refDb(db, `/rho/people/${uuid}/${changedField}`, updatedValue))
        } else {
            const updatedPnm = Object.fromEntries(new FormData(e.target).entries());
            
            console.log(`updating PNM ${uuid} to "${JSON.stringify(updatedPnm)}"`);
            // setDb(refDb(db, `/rho/people/${uuid}`, updatedPnm));
        }
    }

    return (
        <div class="pnm-container flex:prefer-row content">
            <PosterDb uuid={uuid} width="250px" />
            <form class="flex:column" onChange={saveChanges} onSubmit={saveChanges}>
                <div class="form-item">
                    <label for="notes">Notes</label>
                    <textarea id="notes" name="notes" placeholder="Summary/notes for this PNM" value={notes ?? ""}></textarea>
                </div>
                <div class="flex:prefer-row flex:wrap">
                    <div class="form-item">
                        <label for="fullName">Name</label>
                        <input id="fullName" name="fullName" type="text" placeholder="Name" value={fullName ?? ""}></input>
                    </div>
                    <div class="form-item">
                        <label for="phone">Phone Number</label>
                        <input id="phone" name="phone" type="tel" placeholder="(617) 253-1212" value={phone ?? ""}></input>
                    </div>
                    <div class="form-item">
                        <label for="contact">Primary Contact</label>
                        <input id="contact" name="contact" type="text"></input>
                    </div>
                    <div class="form-item">
                        <label for="lastContacted">Last Contacted</label>
                        <input id="lastContacted" name="lastContacted" type="date"></input>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PnmEdit;