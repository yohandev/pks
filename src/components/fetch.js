import { useState, useEffect } from "preact/hooks";

/**
 * Component that fetches the resource at `url`, displaying a loading animation
 * while its pending. When loaded, it calls the function provided as its child
 * and passes the result, ie:
 * ```
 * <Fetch url="/api/weather" json>
 *  {(res) => (
 *      <Weather data={res}/>
 *  )}
 * </Fetch>
 * ```
 * @param {{
 *  url: string;
 *  json: boolean;
 *  text: boolean;
 *  retry: boolean;
 *  options: RequestInit;
 * }} props
 */
export function Fetch({ url, json, text, retry, options, children, ...props }) {
    const [response, setResponse] = useState(null);

    useEffect(function retry() {
        setResponse(null);

        fetch(url, options)
            .then((res) => {
                if (!res.ok) {
                    throw "retry";
                }
                return res;
            })
            .then((res) => json ? res.json() : text ? res.text() : res)
            .then((res) => setResponse(res))
            .catch(() => (retry && retry()))
    }, [url]);

    return response ? children(response) : (
        <p {...props}>🕰️ Loading...</p>
    );
}