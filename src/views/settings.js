import { ACTIVES } from "../data/actives";

import "../styles/settings.css";

Settings.Kerb = Property("kerb");   // User's Kerberos

/**
 * Component for the settings view, visible to internal users.
 */
export function Settings() {
    return (
        <div class="settings">
            <h2>User Preferences</h2>
            <label for="kerb" id="kerb-label">
                I, the undersigned, do solemnly and unequivocally declare, affirm, and certify, with absolute
                honesty and complete sincerity, that I am, without any shadow of doubt or reservation, exactly
                and truly&nbsp;&nbsp;
            </label>
            <select name="kerb" id="kerb" onChange={(e) => Settings.Kerb(e.target.value)}>
                {ACTIVES.map((kerb) => (
                    <option value={kerb} selected={kerb === Settings.Kerb()}>{kerb}</option>
                ))}
                {!Settings.Kerb() && (
                    <option value="" selected disabled hidden>???</option>
                )}
            </select>
        </div>
    );
}

function Get(key) {
    // https://stackoverflow.com/a/25490531
    return document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")?.pop() || '';
}

function Set(key, val) {
    document.cookie = `${key}=${val};expires=Fri, 31 Dec 2099 23:59:59 GMT;path=/`;
}

function Property(key) {
    return function(val=undefined) {
        if (val) {
            Set(key, val);
        }
        return Get(key);
    }
}