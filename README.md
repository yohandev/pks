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

## Usage

```bash
$ yarn install
```

### `yarn run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `yarn run build`

Builds the app for production to the `dist` folder. The build is minified and the filenames include the hashes.

## Deployment

Make a PR to this repository and its changes should automatically be published once approved!

It will be live at the usual URL in addition to its "native" URL on Google Firebase's domain:
[https://pks-website.web.app/](https://pks-website.web.app/)

Alternatively...
```bash
yarn global add firebase-tools
firebase login # Use phikaps.am.mit@gmail.com
firebase deploy
```