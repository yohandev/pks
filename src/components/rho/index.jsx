import { createMemo, createSignal, Match, Switch } from "solid-js";
import { useParams } from "@solidjs/router";

import { PnmEdit } from "./edit";
import { AddPnmButton, PnmList } from "./list";

import "../../styles/rho.css";

function Rho() {
    const params = useParams();
    const year = createMemo(() => new Date().getFullYear() + 4);
    const [sort, setSort] = createSignal("score");

    function changeSortMethod(e) {
        e.preventDefault();

        setSort(e.target.value);
    }

    return (
        <div class="content">
            <Switch>
                <Match when={params.uuid}>
                    <PnmEdit uuid={params.uuid} />
                </Match>
                <Match when={!params.uuid}>
                    <div class="flex:row flex:align-center" style="margin-top: -40px;">
                        <AddPnmButton year={year()} />
                        <select onChange={changeSortMethod}>
                            <option value="score">Sort by brothers who like</option>
                            <option value="inv0">Sort by invited to boat cruise</option>
                            <option value="inv1">Sort by invited to steak & lobster</option>
                            <option value="inv2">Sort by invited to bid dinner</option>
                            <option value="chronological">Sort by date added</option>
                        </select>
                    </div>
                    <PnmList year={year()} sort={sort()} />
                </Match>
            </Switch>
        </div>
    );
}

export default Rho;