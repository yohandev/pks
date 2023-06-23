import "../styles/logo.css";

/**
 * Component for the homepage's logo
 */
export function Logo(props) {
    return (
        <div class="logo" {...props}>
            <div id="picture"/>
            <div id="text" class="no-select">
                <span id="subtitle">MIT Alpha Mu Chapter</span>
                <span id="title">Phi Kappa Sigma</span>
            </div>
        </div>
    );
}