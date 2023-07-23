/**
 * Note: this file is NOT an API endpoint
 */
import "./polyfill";

import { GoogleAuth } from "google-auth-library";
import { drive, drive_v3 } from "@googleapis/drive";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { join, relative } from "node:path";

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
 * List files within the folder `parent`
 * 
 * @param {string} parent ID of the parent folder, retrievable from its shared link
 * @param {FileType|FileType[]|undefined} type Filters the type of files
 * @param {drive_v3.Params$Resource$Files$List} params
 * @returns {Promise<{ name: string, id: string }>}
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

// TODO: memoize this
/**
 * Download a file from Google Drive, then return its path served on the server
 * @param {string} id ID of the file to download, retrievable from its shared link
 * @returns {Promise<string>} Path to an image publicly visible on the server
 */
export async function downloadFile(id) {
    const DOWNLOAD_DIRECTORY = join(__dirname, "../assets/drive/");
    const EXTENSIONS = {
        "image/jpeg": ".jpeg",
        "image/png": ".png",
        "image/svg+xml": ".svg",
        "text/plain": ".txt",
        "text/csv": ".csv",
        "text/tab-separated-values": ".tsv",
        "application/vnd.google-apps.script+json": ".json",
        "application/json": ".json",
        "application/zip": ".zip",
    };

    // Create directory
    await mkdir(DOWNLOAD_DIRECTORY, { recursive: true });

    // Start download stream from gDrive
    const res = await service.files.get(
        { fileId: id, alt: "media", fields: "lastModified" },
        { responseType: "stream" }
    );
    // Save file by its ID
    const name = id + (EXTENSIONS[res.headers["content-type"]] ?? "");
    const path = join(DOWNLOAD_DIRECTORY, name);

    if (!existsSync(path)) {
        const file = createWriteStream(path);

        // Download file
        await new Promise((resolve) => {
            res.data.pipe(file).on("finish", resolve);
        });
    }
    
    // Un-resolve absolute path
    return relative(join(__dirname, ".."), path);
}