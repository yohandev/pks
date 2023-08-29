import { useEffect, useState } from "preact/hooks";
import { RusheeCard } from "./card";
import { Settings } from "../../views/settings";

// // Dummy rushees list
// export const RUSHEES = [
//     { photo: "https://i.imgur.com/VShn15G.jpg", level: 10, name: "Matt S." },
//     { photo: "https://i.imgur.com/fcsaEgz.jpg", level: 10, name: "Nick D." },
//     { photo: "https://imgur.com/3SChj5E.jpg", level: 8, name: "Will R." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://imgur.com/AfcMZU0.jpg", level: 4, name: "Chris H." },
//     { photo: "https://i.imgur.com/gC6QAle.jpg", level: 3, name: "Ellington Hemphill" },
//     { photo: "https://i.imgur.com/rbE3Nmb.png", level: 1, name: "Rushil" },
// ];

/**
 * Component for detailed information about a single rushee.
 */
export function RusheeInfo({ id }) {
    // TODO: fetch this from server
    const [info, setInfo] = useState({});
    const [comments, setComments] = useState([]);

    // Get information and comments about this rushee
    useEffect(() => {
        fetch(`/api/rushee.cgi?id=${id}`)
            .then((res) => res.json())
            .then((res) => {
                setInfo(res.info);
                setComments(res.comments
                    .map((c) => ({ ...c, timestamp: new Date(c.timestamp) }))
                    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                );
            });
    }, [id]);

    // Edit information about this rushee
    function edit(e) {
        e.preventDefault();
        
        const changed = {};
        for (const [key, val] of new FormData(e.target).entries()) {
            if (info[key] === val) {
                continue;
            }
            info[key] = changed[key] = val;
        }
        fetch("/api/rushee.cgi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "edit",
                id,
                changed,
            }),
        });
    }

    // Post a new comment on this rushee's page
    function comment(e) {
        e.preventDefault();

        const whoami = Settings.Kerb();
        const value = new FormData(e.target).get("comment");

        fetch("/api/rushee.cgi", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                op: "comment",
                id,
                whoami,
                value,
            }),
        });
        e.target.reset();
        setComments([{ whoami, value, timestamp: new Date() }, ...comments]);
    }

    return (
        <div class="rushee-info">
            <div id="container">
                <form method="post" action="/api/rushee.cgi" onsubmit={edit}>
                    <div id="top-bar">
                        <div id="name">
                            {info.name ?? "Loading..."}
                        </div>
                        <a href="/rho" class="cr-button red" id="close">X</a>
                    </div>
                    <div id="overview">
                        <RusheeCard id="card" name="" level={2} picture={info.picture}/>
                        <textarea id="description" name="description" placeholder={`Notes about ${info.name}...`}>
                            {info.description ?? ""}
                        </textarea>
                    </div>
                    <div id="statistics">
                        <input id="hometown" type="text" name="hometown" placeholder="Hometown" value={info.hometown}/>
                        <input id="major" type="text" name="major" placeholder="Major" value={info.major}/>
                        <input id="phone" type="text" name="phone" placeholder="Phone Number" value={info.phone}/>
                        <input type="submit" value="Save Changes"/>
                    </div>
                </form>
                <form method="post" action="/api/rushee.cgi" onsubmit={comment}>
                    <div id="comments">
                        <textarea id="new-comment" name="comment" placeholder={`Say something about ${info.name}...`}/>
                        <input type="submit" value="Post"/>
                        {comments.map(({ value, whoami, timestamp }) => (
                            <div>
                                {value} | {whoami}, {timestamp.toString()}
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    );
}