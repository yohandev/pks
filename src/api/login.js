/**
 * This API call doesn't do anything, but is password-protected. When called,
 * the browser prompts the user for credentials and stores them, so future internal
 * API calls will have authorization.
 */
if (!ATHENA_BUILD) {
    console.log("HTTP/1.1 200 OK");
}
console.log("Content-Type: text/plain\n\nOK");