<div align="center">
    <h1><code>ΦΚΣ</code></h1>
</div>

## Overview
This is the public + internal website for MIT's Alpha Mu chapter of Phi Kappa Sigma(Skullhouse). It is a complete overhaul of any prior systems, authored in 2023 by Yohan Guyomard(yohang@mit.edu). Features include:
- Front-page with most relevant hyperlink(rush, summer housing, etc)
- Active brothers gallery
- Random house picture gallery
- Rush schedule
- Summer housing form(+ virtual tour)
- List of officers(+ contact form)
- House cleaning jobs/schedule*
- House waiting jobs/schedule*
- Party jobs/schedule*
- Menu for the week*
- House Google Drive*
- SMAPP form*
- Rush PNM list*

*visible only to logged-in brothers

## Running locally
1. Make sure you have `node` and `yarn`(or `npm`) installed
2. Clone this repository
3. Run `yarn run serve`(or the `npm` equivalent)

## Updating the Website
The website automatically displays the data stored on [Google Drive](https://drive.google.com/drive/folders/1Ii4pBOw8l2jdVzGyGnBEyjXS7iMiTF-h?usp=sharing). Otherwise...
1. Clone this repository and make whatever edits you need.
2. Send a pull-request for your changes to the [remote](https://github.com/yohandev/pks). If you need to make urgent changes, you could just change the repo directly on Athena(see below) but it's easier to just wait.
3. Accessing Athena: `ssh <your kerb>@athena.dialup.mit.edu`
4. Locating the website: `cd /afs/athena.mit.edu/org/p/phikaps-web/website`
    - Note: The locker is a mess. See "Athena Locker" section for details.
5. Pull your changes(`git pull`) and rebuild(+ run some commands to setup other stuff) the website(`npm run install`)
    - You may need to run `npm i` if you added dependencies
6. The website should update instantly once you reload!

## Mobile App
The website also comes with a mobile app for brothers. It sends push notifications for jobs and is otherwise more practical than the website. That being said, the app *is* the website, so any changes made there will be reflected without needing an update. If it does need to be updated, here are the instructions:


For Android: use the Chi gmail(phikaps.am.mit@gmail.com) to publish on Google Play.

For iOS: TODO(yohang).

## Technical Overview
- Frontend: `Preact`
- Backend: `Google Sheets`(yes, really) and very simple `python3`(see "Athena Locker")

## Athena Locker
What happens when the same server is used for decades to host several revisions of the same website, amongst other random stuff, is truly wondrous... Basically the whole thing works via [Scripts](https://scripts.mit.edu) which provides a `PHP` interpreter over a file system. In other words:
- Files in `phikaps-web/web_scripts/` are accessible at [phikaps-web.scripts.mit.edu](phikaps-web.scripts.mit.edu)
- Some files are interpreted instead of served as-is, e.g. `.php`, `.py` files

But how comes...
- I can access the website at [skullhouse.mit.edu](skullhouse.mit.edu)?
    - [Scripts hostnames](https://scripts.mit.edu/faq/14)
- The repository, and consequently its build folder(`phikaps-web/website/www/`) isn't in `phikaps-web/web_scripts/`?
    - I have a symlink in `phikaps-web/web_scripts/skullhouse2`
    - Hopefully this separates legacy stuff from what is being used now. As for when this website inevitably becomes obsolete, well...