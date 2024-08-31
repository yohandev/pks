import { getAuth, signInWithEmailLink, sendSignInLinkToEmail, isSignInWithEmailLink } from "firebase/auth";
import { useAuth, useFirebaseApp } from "solid-firebase";
import { Match, Show, Switch, createEffect, createSignal } from "solid-js";

export async function activesKerbs() {
    if (document.cachedActivesKerbs) {
        return document.cachedActivesKerbs;
    }

    const res = await fetch("https://us-east1-pks-website.cloudfunctions.net/actives");
    if (!res.ok) {
        console.error(`Unable to fetch list of actives! ${res.status}`);
        return [];
    }

    return (document.cachedActivesKerbs = await res.json());
}

export function Auth() {
    const app = useFirebaseApp();
    const auth = useAuth(getAuth(app));

    return (
        <Switch fallback={<SignIn />}>
            <Match when={auth.loading}>
                <p>Loading...</p>
            </Match>
            <Match when={auth.error}>
                <SignIn />
            </Match>
            <Match when={auth.data}>
                <p>{auth.data?.displayName} ({auth.data?.email})</p>
            </Match>
        </Switch>
    );
}

function SignIn() {
    const app = useFirebaseApp();
    const [loading, setLoading] = createSignal(false);

    function askForKerb() {
        return window.prompt("Enter your kerb or MIT email").split("@")[0] + "@mit.edu";
    }

    // Send a sign-in email
    function requestSignIn() {
        const auth = getAuth(app);
        const email = askForKerb();
        const settings = {
            url: window.location.href,
            handleCodeInApp: true,
        };

        setLoading(true);
        sendSignInLinkToEmail(auth, email, settings)
            .then(() => {
                // Save email to avoid asking again
                window.localStorage.setItem("emailForSignIn", email);

                alert(`Sent a sign-in email to ${email}!\nGive it a second and check your spam.`);
            })
            .catch((e) => {
                alert(`An error occured: ${e.message}`);
            })
            .finally(() => setLoading(false));
    }

    // Actual sign-in logic
    createEffect(() => {
        const auth = getAuth(app);

        if (!isSignInWithEmailLink(auth, window.location.href)) {
            return;
        }
        
        const email = window.localStorage.getItem("emailForSignIn") ?? askForKerb();
        setLoading(true);
        signInWithEmailLink(auth, email, window.location.href)
            .then(() => {
                window.localStorage.removeItem('emailForSignIn');
            })
            .catch((e) => {
                alert(e.message);
            })
            .finally(() => setLoading(false));
    });

    return (
        <>
            <Show when={!loading()}>
                <a onClick={() => requestSignIn()}><p>Are you a PhiKap?</p></a>
            </Show>
            <Show when={loading()}>
                Signing you in...
            </Show>
        </>
    );
}