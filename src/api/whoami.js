/**
 * AFAIK, the client can't check whether it has credentials by itself. But, it
 * sends them for every request so this endpoint just ping-pongs the headers.
 */
if (!ATHENA_BUILD) {
    console.log("HTTP/1.1 200 OK");
}
console.log("Content-Type: text/plain\n");
console.log((process.env.HTTP_AUTHORIZATION || !ATHENA_BUILD) ? "brother" : "normy");