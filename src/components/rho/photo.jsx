import { getDatabase, ref as refDb } from "firebase/database";
import { getStorage, ref as refStorage } from "firebase/storage";
import { useDatabase, useDownloadURL, useFirebaseApp } from "solid-firebase";
import { createMemo, Match, Show, Switch } from "solid-js";

import anonymous from "../../assets/rho/anonymous.jpg";

export function PnmPhoto({ uuid, size="50px" }) {
    const app = useFirebaseApp();

    const db = getDatabase(app);
    const path = useDatabase(refDb(db, `/rho/i/${uuid}/photo`));
    const flushed = useDatabase(refDb(db, `/rho/i/${uuid}/flushed`));

    function Fallback() {
        return (
            <img src={anonymous} />
        );
    }

    // Can't destructure props here
    // https://github.com/solidjs/solid/discussions/287#discussioncomment-240864
    function Inner(props) {
        const storage = getStorage(app);
        const path = createMemo(() => refStorage(storage, `rho/${props.path}_300x300`));
        const image = useDownloadURL(path);

        return (
            <Show
                when={!image.error && image()}
                fallback={<Fallback />}
            >
                <img class={props.flushed ? "rho-pnm-flushed" : ""} src={image()} />
            </Show>
        );
    }

    return (
        <div class="rho-pnm-photo" style={`width: ${size}; height: ${size};`}>
            <Switch>
                <Match when={path.loading}>
                    <Fallback />
                </Match>
                <Match when={path.data}>
                    <Inner path={path.data} flushed={flushed.data} />
                </Match>
                <Match when={path.error}>
                    <Fallback />
                </Match>
            </Switch>
        </div>
    );
}