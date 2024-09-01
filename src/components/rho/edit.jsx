import { createMemo, createResource, Match, Show, Switch } from "solid-js";
import { useAuth, useDatabase, useFirebaseApp } from "solid-firebase";
import { getDatabase, ref as refDb, set as setDb, push as pushDb } from "firebase/database";
import { deleteObject, getStorage, ref as refStorage, uploadBytes } from "firebase/storage";

import { PnmPhoto } from "./photo";
import { activesKerbs } from "../auth";
import { getAuth } from "firebase/auth";

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
            <PnmComments uuid={uuid} />
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


function PnmEditFormItemOptions(props) {
    return (
        <div class="form-item flex:40%">
            <label for={props.name}>{props.children}</label>
            <select id={props.name} name={props.name}>
                <For each={props.options}>{(opt) =>
                    <option value={opt} selected={opt == props.info[props.name]}>{opt}</option>
                }</For>
                <option value="" selected={!props.info[props.name]} disabled hidden>???</option>
            </select>
        </div>
    );
}

function PnmEditFormItemPerUser(props) {
    const app = useFirebaseApp();
    const db = getDatabase(app);
    const auth = useAuth(getAuth(app));

    const currentUser = createMemo(() => {
        return auth.data?.email?.split("@")[0];
    });
    const score = createMemo(() => props.info.score?.[currentUser()]);
    const name = createMemo(() => props.info.fullName?.split(" ")?.[0]);

    // This one is special
    function onChange(e) {
        e.stopPropagation();

        setDb(refDb(db, `/rho/people/${props.uuid}/score/${currentUser()}`), e.target.value);
    }

    return (
        <div class="form-item flex:40%">
            <label for="score">How I feel</label>
            <select id="score" name="score" onChange={onChange}>
                <option value={-1} selected={score() == -1}>I dislike {name()}</option>
                <option value={0} selected={!score() || score() == 0}>I haven't met {name()}</option>
                <option value={1} selected={score() == 1}>I lack strong feelings about {name()}</option>
                <option value={2} selected={score() == 2}>I like {name()}</option>
            </select>
        </div>
    );
}

function PnmEditFormFeelsStatus(props) {
    const hasMet = createMemo(() => {
        return Object
            .entries(props.info.score ?? {})
            .filter(([_, score]) => score != 0)
            .map(([kerb, _]) => kerb);
    });
    const likes = createMemo(() => {
        return Object
            .entries(props.info.score ?? {})
            .filter(([_, score]) => score == 2)
            .map(([kerb, _]) => kerb);
    });
    const dislikes = createMemo(() => {
        return Object
            .entries(props.info.score ?? {})
            .filter(([_, score]) => score == -1)
            .map(([kerb, _]) => kerb);
    });

    return (
        <div class="form-item flex:40%">
            <label for="houseScore">How the house feels</label>
            <fieldset name="houseScore" class="flex:row flex:space-around">
                <div onClick={() => alert(`Has been met by: ${hasMet()}`)}>
                    {hasMet().length} 🤝
                </div>
                <div onClick={() => alert(`Is liked by: ${likes()}`)}>
                    {likes().length} 👍
                </div>
                <div onClick={() => alert(`Is disliked by: ${dislikes()}`)}>
                    {dislikes().length} 👎
                </div>
            </fieldset>
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
                <PnmEditFormItem name="phone" type="tel" info={info}>Phone number</PnmEditFormItem>
                <PnmEditFormItem name="hometown" type="text" info={info}>Hometown</PnmEditFormItem>
                <PnmEditFormItem name="major" type="text" info={info}>Major</PnmEditFormItem>
                <PnmEditFormItemOptions name="contact" options={actives()} info={info}>Primary contact</PnmEditFormItemOptions>
                <PnmEditFormItem name="lastContacted" type="date" info={info}>Last contacted</PnmEditFormItem>
                <PnmEditFormItemPerUser uuid={uuid} info={info} />
                <PnmEditFormFeelsStatus info={info} actives={actives} />
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

function PnmComments({ uuid }) {
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

                    <input type="submit" value="Post Comment" />
                </div>
            </form>
            <div class="rho-pnm-comments-container">
                <Switch>
                    <Match when={comments.loading}>
                        <p>Loading comments...</p>
                    </Match>
                    <Match when={comments.data}>
                        <For each={Object.values(comments.data).reverse()}>{({ content, date, from }) =>
                            <div class="rho-pnm-comment">
                                <b>{from}</b> ({new Date(date).toLocaleDateString().split("/").slice(0, 2).join("/")}): {content}
                            </div>
                        }</For>
                    </Match>
                    <Match when={comments.error}>
                        <p>There was an error fetching comments for this PNM...</p>
                        <p>{JSON.stringify(comments.error)}</p>
                    </Match>
                </Switch>
            </div>
        </div>
    );
}