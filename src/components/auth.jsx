import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth, useFirebaseApp } from "solid-firebase";
import { Match, Switch } from "solid-js";

export function Auth({  }) {
    const app = useFirebaseApp();
    const auth = useAuth(getAuth(app));

    return (
        <Switch fallback={<SignUpLink />}>
            <Match when={auth.loading}>
                <p>Loading...</p>
            </Match>
            <Match when={auth.error}>
                <SignUpLink />
            </Match>
            <Match when={auth.data}>
                <p>{auth.data?.displayName} ({auth.data?.email})</p>
            </Match>
        </Switch>
    );
}

function SignUpLink() {
    reutrn (<p><a href="/login">Are you a PhiKap?</a></p>);
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
                placeholder="Email"
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