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
 */
export function Fetch({ url, json, children, ...props }) {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        setResponse(null);
        fetch(url)
            .then((res) => json ? res.json() : res)
            .then((res) => setResponse(res));
    }, [url]);

    return response ? children(response) : (
        <p>🕰️ Loading...</p>
    );
}