import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth, useFirebaseApp } from "solid-firebase";
import { Match, Show, Switch, createSignal } from "solid-js";

export function Auth({  }) {
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
    const [showForm, setShowForm] = createSignal(false);
    const [loading, setLoading] = createSignal(false);

    const onFormSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const form = new FormData(e.target);
        const email = form.get("email").split("@")[0] + "@mit.edu";
        const password = form.get("password");

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => setLoading(false))
            .catch((e) => {
                if (e.code !== "auth/email-already-in-use") {
                    console.log(e.message);
                    alert("You must be an active brother to create an account!");

                    setLoading(false);
                    return;
                }
                signInWithEmailAndPassword(auth, email, password)
                    .catch(alert)
                    .finally(() => setLoading(false));
            });
    };

    return (
        <>
            <a onClick={() => setShowForm(true)}><p>Are you a PhiKap?</p></a>
            <Show when={showForm() && !loading()}>
                <form onSubmit={onFormSubmit} method="post" class="flex:column">
                    <input
                        name="email"
                        type="email"
                        placeholder="munch@mit.edu"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required=""
                        minlength="8"
                    />
                    <button type="submit">Submit</button>
                </form>
            </Show>
            <Show when={loading()}>
                Signing you in...
            </Show>
        </>
    );
}

function SignUpLink() {
    return (<p><a href="/login">Are you a PhiKap?</a></p>);
}

export function SignUp() {
    const app = useFirebaseApp();
    const auth = useAuth(getAuth(app));

    const onFormSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        createUserWithEmailAndPassword(getAuth(app), form.get("email"), form.get("password"))
            .then((cred) => {
                console.log(cred);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <form onSubmit={onFormSubmit} method="post">
            <h1>Sign-Up</h1>
            <input
                name="email"
                type="email"
                placeholder="MIT Email"
                required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required=""
              minlength="8"
            />
            <button type="submit">Submit</button>
        </form>
    )
}