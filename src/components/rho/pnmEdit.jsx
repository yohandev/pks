import { useFirebaseApp, useDatabase, useAuth } from "solid-firebase";
import { getDatabase, push as pushDb, ref as refDb, set as setDb } from "firebase/database";
import { getAuth } from "firebase/auth";

import { PosterDb } from "./poster";
import { activesKerbs } from "../auth";
import { createEffect, createMemo, createResource, For, Switch } from "solid-js";

function PnmEdit({ uuid }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const info = useDatabase(refDb(db, `/rho/people/${uuid}`));

    return (
        <div class="flex:column content">
            <div class="flex:prefer-row flex:space-around">
                <div class="margin:10px">
                    <PosterDb uuid={uuid} width="250px" />
                </div>
                <Switch fallback={<p>PNM not found!</p>}>
                    <Match when={info.loading}>
                        <p>Loading...</p>
                    </Match>
                    <Match when={info.data}>
                        <PnmEditForm uuid={uuid} info={info.data} />
                    </Match>
                    <Match when={info.error}>
                        <p>There was an error fetching this PNM...</p>
                        <p>{JSON.stringify(info.error)}</p>
                    </Match>
                </Switch>
            </div>
            <Comments uuid={uuid} />
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
                <textarea id="notes" name="notes" placeholder="Summary/notes for this PNM" value={info.notes ?? ""} rows={5}></textarea>
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

const COMMENT_PLACEHOLDERS = [
    "I like him because...",
    "I hate him because...",
    "He didn't say bye to me, so...",
    "Pretty good head, so...",
    "Chill may he be, he....",
    "The following is a dissertation of why I will meatride this man until the end of time; first and foremost, he...",
    "I have nothing to say but I will say something anyways, he...",
    "Chat, is this real?",
];

function Comments({ uuid }) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const auth = useAuth(getAuth(app));

    const commentsRef = refDb(db, `/rho/comments/${uuid}`);
    const comments = useDatabase(commentsRef);

    const placeholder = createMemo(() => (
        COMMENT_PLACEHOLDERS[Math.floor(Math.random() * COMMENT_PLACEHOLDERS.length)]
    ));

    function submitComment(e) {
        e.preventDefault();

        const comment = e.target?.comment?.value;
        if (!comment) {
            return;
        }

        const kerb = auth.data?.email?.split("@")[0];
        if (!kerb) {
            alert("Not signed in! (how did you even get this far??)");
            return;
        }

        const newCommentRef = pushDb(commentsRef);
        setDb(newCommentRef, {
            content: comment,
            from: kerb,
            date: (new Date()).toISOString(),
        });

        e.target?.reset();

        console.log(`Posting a comment as ${kerb}: "${comment}"`);
    }

    return (
        <div>
            <form onSubmit={submitComment}>
                <div class="form-item">
                    <label for="comment">Add a new comment</label>
                    <textarea id="comment" name="comment" placeholder={placeholder()}></textarea>

                    <input type="submit" value="Post" />
                </div>
            </form>
            <Switch>
                <Match when={comments.loading}>
                    <p>Loading comments...</p>
                </Match>
                <Match when={comments.data}>
                    <For each={Object.values(comments.data).reverse()}>{({ content, date, from }) =>
                        <div>
                            On {new Date(date).toDateString()}, {from} posted: {content}
                        </div>
                    }</For>
                </Match>
                <Match when={comments.error}>
                    <p>There was an error fetching comments for this PNM...</p>
                    <p>{JSON.stringify(comments.error)}</p>
                </Match>
            </Switch>
        </div>
    );
}

export default PnmEdit;