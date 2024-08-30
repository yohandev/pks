import { Show } from "solid-js";
import { useNavigate, useParams, useSearchParams } from "@solidjs/router";
import PnmEdit from "./pnmEdit";
import PnmList from "./pnmList";

import "../../styles/rho.css";

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
            <PnmList />
            <Show when={params.uuid}>
                <div class="rho-edit-container" onClick={closeEditPage}>
                    <PnmEdit uuid={params.uuid} />
                </div>
            </Show>
        </>
    )
}

export default Rho;