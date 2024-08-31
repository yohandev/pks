import { Show } from "solid-js";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import PnmEdit from "./pnmEdit";

import "../../styles/rho.css";
import { PnmList } from "./list";

function Rho() {
    const navigate = useNavigate();
    const params = useParams();

    function closeEditPage(e) {
        if (e.target != e.currentTarget) {
            return;
        }
        navigate("/rho");
    }

    return (
        <>
            <div class="content">
                <PnmList />
            </div>
            <Show when={params.uuid}>
                <div class="rho-edit-container" onClick={closeEditPage}>
                    <PnmEdit uuid={params.uuid} />
                </div>
            </Show>
        </>
    )
}

export default Rho;