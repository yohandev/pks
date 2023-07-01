/**
 * Note: this file is NOT an API endpoint
 */
import "./polyfill";

import { GoogleAuth } from "google-auth-library";
import { drive } from "@googleapis/drive";

import credentials from "./gdrive-private-key.json";

/**
 * ID for the "Website" Google Drive folder, which can be obtained from
 * its share link. Ensure that the folder is shared with the service account
 * in "gdrive-private-key.json", or publicly available.
 */
const GDRIVE_FOLDER_ID = "1Np0Jw9hibzNLNcaRL5fuJBFSxIlSHYP7";

const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/drive",
    credentials,
});
const service = drive({ version: "v3", auth });

export const FileType = {
    Any: "",
    Folder: "application/vnd.google-apps.folder",
};

/**
 * Get the direct-download link for a gDrive item with `id`
 */
export function downloadLink(id) {
    return `https://drive.google.com/uc?id=${id}&export=download`;
}

export async function globFiles(parent, type) {
    let query = `parents in "${parent}"`;
    if (type) {
        query += `and mimeType = "${type}"`
    }

}