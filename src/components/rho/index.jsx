import { Match, Switch } from "solid-js";
import { useParams } from "@solidjs/router";

import { PnmEdit } from "./edit";
import { PnmList } from "./list";

import "../../styles/rho.css";

function Rho() {
    const params = useParams();

    return (
        <div class="content">
            <Switch>
                <Match when={params.uuid}>
                    <PnmEdit uuid={params.uuid} />
                </Match>
                <Match when={!params.uuid}>
                    <PnmList />
                </Match>
            </Switch>
        </div>
    );
}

export default Rho;