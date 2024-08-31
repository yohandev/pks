import { getDatabase, ref as refDb } from "firebase/database";
import { getStorage, ref as refStorage } from "firebase/storage";
import { useDatabase, useDownloadURL, useFirebaseApp } from "solid-firebase";
import { Match, Show, Switch } from "solid-js";

import anonymous from "../../assets/rho/anonymous.jpg";

export function PnmPhoto({ uuid, size="50px" }) {
    const app = useFirebaseApp();

    const db = getDatabase(app);
    const path = useDatabase(refDb(db, `/rho/people/${uuid}/photo`));

    function Fallback() {
        return (
            <img src={anonymous} />
        );
    }

    function Inner({ path }) {
        const storage = getStorage(app);
        const image = useDownloadURL(refStorage(storage, `rho/${path}`));

        return (
            <Show
                when={!image.error && image()}
                fallback={<Fallback />}
            >
                <img src={image()} />
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
                    <Inner path={path.data} />
                </Match>
                <Match when={path.error}>
                    <Fallback />
                </Match>
            </Switch>
        </div>
    );
}