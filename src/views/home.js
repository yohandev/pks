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
            <span onClick={login}>
                Are you a PhiKap?
            </span>
        </div>
    );
}