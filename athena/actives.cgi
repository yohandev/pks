#!/usr/bin/env node

/**
 * This file is an API endpoint that, unlike the rest of this web application,
 * must live on Athena. It uses Moira mailing lists to determine whether a given
 * kerb is an active brother of Skullhouse.
 * 
 * In the unlikely event that this needs to be modified, here is how to do so:
 * ssh <your, the chi, kerb>@athena.dialup.mit.edu
 * ssh phikaps-web@scripts
 * ssh scripts-f30.mit.edu
 * cd skullhouse3/api/      # Path where this file should live
 * nano actives.cgi         # Now you can edit, copy/paste, etc.
 * 
 * This script requires an updated version of nodejs, make sure the Scripts locker
 * is running on Fedora 30 here: https://pony.scripts.mit.edu:444/index/phikaps-web
 */
const { execSync } = require("child_process");

// Adapted from:
// https://github.com/sipb/MediaWikiMITAuth/blob/cb9c6d266e05447ac62874a4afc6c23b999b6b9e/MITAuth.class.php#L183
const kerbs = execSync("pts membership -noauth system:phikaps-active")
    .toString()
    .split("\n")
    .slice(1)
    .map((kerb) => kerb.trim())

console.log("Content-Type: text/plain\n");
console.log(JSON.stringify(kerbs));