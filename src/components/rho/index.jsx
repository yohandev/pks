import { createMemo, Match, Switch } from "solid-js";
import { useParams } from "@solidjs/router";

import { PnmEdit } from "./edit";
import { AddPnmButton, PnmList } from "./list";

import "../../styles/rho.css";

function Rho() {
    const params = useParams();
    const year = createMemo(() => new Date().getFullYear() + 4);

    return (
        <div class="content">
            <Switch>
                <Match when={params.uuid}>
                    <PnmEdit uuid={params.uuid} />
                </Match>
                <Match when={!params.uuid}>
                    <AddPnmButton year={year()} />
                    <PnmList year={year()} />
                </Match>
            </Switch>
        </div>
    );
}

export default Rho;