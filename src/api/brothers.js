import "./polyfill";

import { globFiles, downloadLink, FileType, downloadFile } from "./utils";

/**
 * ID for the "Website/Brothers" Google Drive folder, which can be obtained from
 * its share link. Ensure that the folder is shared with the service account
 * in "gdrive-private-key.json", and publicly available.
 */
const GDRIVE_FOLDER_ID = "1Np0Jw9hibzNLNcaRL5fuJBFSxIlSHYP7";

(async function() {
    // (1) Get the four latest folders in "Website/Brothers/", e.g. ["2025", "2024", "2023", "2022"]
    const years = await globFiles(GDRIVE_FOLDER_ID, FileType.Folder, { orderBy: "name desc", pageSize: 4 });

    // (2) Get the image files within those folders
    const pictures = await Promise.all(years.map((folder) => globFiles(folder.id, FileType.Image)));

    // (3) Reverse the years(ie. seniors first, freshmen last), flatten the result, and compute image links
    const pictureLinks = await Promise.all(pictures
        .reverse()
        .flat()
        .map(async (file) => ({
            name: file.name,                        // Name of the file corresponds to the person's name
            picture: await downloadFile(file.id),   // Put the image files on the server
        })));
    
    // (4) Output the HTTP packet
    if (!ATHENA_BUILD) {
        console.log("HTTP/1.1 200 OK");
    }
    console.log("Content-Type: application/json\n");
    console.log(JSON.stringify(pictureLinks));
})();