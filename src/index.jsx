/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { FirebaseProvider } from "solid-firebase"
import { initializeApp } from "firebase/app";

import Home from "./components/home";
import NavigationBar from "./components/navigation";
import Rho from "./components/rho";

import "./styles/index.css";

function App({ children }) {
    return (
        <>
            <NavigationBar>
                <a href="brothers">brothers</a>
                <a href="rush">rush</a>
                <a href="housing">summer housing</a>
                <a href="contact">contact</a>
            </NavigationBar>
            {children}
        </>
    )
}

const app = initializeApp({
    apiKey: "AIzaSyBCow_1sozeY0H2JDOR6JY-Cki6t4Q9oGM",
    authDomain: "pks-website.firebaseapp.com",
    projectId: "pks-website",
    storageBucket: "pks-website.appspot.com",
    messagingSenderId: "368171466916",
    appId: "1:368171466916:web:81227e8d2c0dc79d70a631"
});

render(
    () => (
        <FirebaseProvider app={app}>
            <Router root={App}>
                <Route path="/" component={Home} />
                <Route path="/rho" component={Rho} />
            </Router>
        </FirebaseProvider>
    ),
    document.getElementById('root')
);