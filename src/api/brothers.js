import "./polyfill";

import { GoogleAuth } from "google-auth-library";
import { drive } from "@googleapis/drive";

import credentials from "./gdrive-private-key.json";

const GDRIVE_FOLDER_ID = "1Np0Jw9hibzNLNcaRL5fuJBFSxIlSHYP7";   // ID of the folder on Drive(from share link)
const NUM_YEARS = 4;                                            // Number of class years to display
const FOLDER_MIME = "application/vnd.google-apps.folder";       // MIME type for folders on Drive
const GDRIVE_IMAGE_URL = (id) => (                              // Direct link to an image from its ID
    `https://drive.google.com/uc?id=${id}&export=download`
);

const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/drive",
    credentials,
});
const service = drive({ version: "v3", auth });

(async () => {
    // (1) Search the `Website/Brothers` folder for subfolders, ie. 2025, 2026, etc.
    const years = await service.files
        .list({
            q: `mimeType = "${FOLDER_MIME}" and parents in "${GDRIVE_FOLDER_ID}"`,
            orderBy: "createdTime",
            pageSize: NUM_YEARS,
        })
        .then((res) => res.data.files)
        .then((folders) => folders.map((f) => f.id));
    // (2) Scrape those subfolders for images
    const pictures = await Promise.all(years.map((folder) => service.files
        .list({
            q: `parents in "${folder}"`,
            pageSize: 30, // No way we're exceeding a pledge class of 30...
        })
        .then((res) => res.data.files)
        .then((files) => files.map((f) => ({
            name: f.name,
            picture: GDRIVE_IMAGE_URL(f.id)
        })))
    ));
    
    if (!ATHENA_BUILD) {
        console.log("HTTP/1.1 200 OK");
    }
    console.log("Content-Type: application/json\n");
    console.log(JSON.stringify(pictures.flat()));
})();