import { Fetch } from "../components/fetch";
import "../styles/home.css";

/**
 * Component for the front-page view of the website
 */
export function Home() {
    function login() {
        fetch("/api/login.cgi")
            .then((res) => {
                if (res.ok) {
                    window.location.reload();
                }
            });
    }
    return (
        <div class="home">
            <div id="banner"/>
            <Fetch url="/api/whoami.cgi" text options={{ credentials: "include" }}>
                {(res) => (
                    res.trim() == "brother" ? <>Brother!</> : <>Who is u?</>
                )}
            </Fetch>
            <span onClick={login}>
                Are you a PhiKap?
            </span>
        </div>
    );
}