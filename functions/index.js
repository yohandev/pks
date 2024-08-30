/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import { onRequest } from "firebase-functions/v2/https";
import { beforeUserCreated, HttpsError } from "firebase-functions/v2/identity";
import https from "https";

// Adapted from:
// https://gist.github.com/ktheory/df3440b01d4b9d3197180d5254d7fb65
const get = (url, data='') => new Promise((resolve, reject) => {
    const req = https.request(url, res => {
        const chunks = [];

        res.on("data", chunk => chunks.push(chunk));
        res.on("error", reject);
        res.on("end", () => {
            const { statusCode, headers } = res;
            const body = chunks.join('');

            if (statusCode >= 200 && statusCode <= 299) {
                resolve({ statusCode, headers, body });
            } else {
                reject(new Error(`[${statusCode}] Request failed: ${body}`));
            }
        });
    });
    req.on("error", reject);
    req.write(data, "binary");
    req.end();
});

export const beforecreated = beforeUserCreated(async (event) => {
    const [kerb, domain] = event.data.email.split("@");
    const { body: kerbs } = await get("https://phikaps-web.scripts.mit.edu/skullhouse3/api/actives.cgi");

    if (domain != "mit.edu" || !JSON.parse(kerbs).includes(kerb)) {
        throw new HttpsError('invalid-argument', "Only active brothers can sign up!");
    }
});

export const actives = onRequest(async (req, res) => {
    const { body: kerbs } = await get("https://phikaps-web.scripts.mit.edu/skullhouse3/api/actives.cgi");

    res.json(JSON.parse(kerbs));
});