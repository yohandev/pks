/**
 * Note: this file is NOT an API endpoint
 */
import "./polyfill";

import { GoogleAuth } from "google-auth-library";
import { drive, drive_v3 } from "@googleapis/drive";

import credentials from "./gdrive-private-key.json";

const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/drive",
    credentials,
});
/** @type {drive_v3.Drive} */
const service = drive({ version: "v3", auth });

export class FileType {
    static Folder = new FileType("mimeType = 'application/vnd.google-apps.folder'");
    static Image = new FileType("mimeType contains 'image/'");
    static Video = new FileType("mimeType contains 'video/'");
    static All = new FileType("");

    constructor(filter) {
        this.filter = filter;
    }
}

/**
 * Get the direct-download link for a gDrive item with `id`
 */
export function downloadLink(id) {
    return `https://drive.google.com/uc?id=${id}&export=download`;
}

/**
 * List files within the folder `parent`
 * 
 * @param {string} parent ID of the parent folder, retrievable from its shared link
 * @param {FileType|FileType[]|undefined} type Filters the type of files
 * @param {drive_v3.Params$Resource$Files$List} params
 */
export async function globFiles(parent, type, params) {
    let q = `parents in "${parent}" `;
    if (type instanceof FileType && type !== FileType.All) {
        // Filter one type
        q += `and ${type.filter}`
    } else if (Array.isArray(type)) {
        // Filter a collection of types
        q += "and " + type.join(" or ")
    }
    return service.files
        .list({ ...params, q })
        .then((res) => res.data.files)
        .then((files) => files.map((f) => ({ name: f.name, id: f.id })));
}