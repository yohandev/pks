import { decode } from "querystring";
import { createConnection } from "mysql2/promise";

import password from "../data/sql-private-key.txt";

class Rushee {
    constructor(name, picture, ) {
        this.id = "{generate guid}";
        this.name = name ?? "???";
        this.picture = picture ?? "";
        this.hometown = hometown ?? "???";
        this.major = major ?? "???";
    }
}

// This portion of the website is organized into two SQL tables:
//  -> rushees: has all the PNM information, and a GUID for each
//  -> comments: aggregation of all the comments, each point back to their page's GUID

// GET /api/rushee?i=3hra9Z --> all of rushee's info and comments
// POST /api/rushee { op: "edit", id: "3hra9Z", key: "name", value: "Go D. Usopp" } --> OK
// POST /api/rushee { op: "create", whoami: "yohang" } --> { id: "3hra9Z" }
// POST /api/rushee { op: "comment", whoami: "yohang", id: "3hra9Z", value: "I hate that guy" } --> OK

async function parseArgs() {
    if (process.env.REQUEST_METHOD == "GET") {
        return {
            op: "GET",
            ...decode(process.env.QUERY_STRING),
        };
    }
    let args = "";
    process.stdin.on("data", (data) => {
        args += data.toString();
    });
    await new Promise((res) => process.stdin.on("end", res));

    return JSON.parse(args);
}

/**
 * List information about all rushees
 */
async function list(sql) {
    const [res, _] = await sql.query("SELECT `id`, `name`, `picture` FROM `rushees`");

    console.log(JSON.stringify(res));
}

/**
 * Get info about a single rushee
 */
async function get(sql, id) {
    const [[[info], _], [comments, __]] = await Promise.all([
        sql.query("SELECT * FROM `rushees` WHERE `id` = ?", [id]),
        sql.query("SELECT `value`, `timestamp`, `whoami` FROM `comments` WHERE `id` = ?", [id]),
    ]);

    console.log(JSON.stringify({ info, comments }));
}

async function edit(sql, id, changed) {
    await sql.query("UPDATE `rushees` SET ? WHERE `id` = ?", [changed, id]);
}

async function comment(sql, id, whoami, value) {
    // TODO: maybe add some sort of validation in the future
    await sql.query("INSERT INTO `comments` SET ?, `timestamp` = NOW()", {
        id,
        whoami,
        value,
    });
}

(async () => {
    const [args, sql] = await Promise.all([parseArgs(), createConnection({
        host: "sql.mit.edu",
        user: "phikaps-web",
        database: "phikaps-web+website",
        password,
    })]);

    if (!ATHENA_BUILD) {
        console.log("HTTP/1.1 200 OK");
    }
    console.log("Content-Type: text/plain\n");

    switch (args.op.toLowerCase()) {
        case "get":
            if (args.id) {
                await get(sql, args.id);
            } else {
                await list(sql);
            }
            break;
        case "edit":
            await edit(sql, args.id, args.changed);
            break;
        case "comment":
            await comment(sql, args.id, args.whoami, args.value);
            break;
    }
    sql.destroy();
})();