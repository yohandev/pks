import { render } from "preact";
import { Home } from "./views/home";

// Hot-reloading
if (!PROD) {
    new EventSource('/esbuild')
        .addEventListener('change', () => location.reload());
}

render(<Home/>, document.body);