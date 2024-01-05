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

## This Branch
Reimplement everything in [Dioxus](https://dioxuslabs.com), which should make mobile compatibility easier. Also, MIT's Athena network (which I used before) really sucks.

# Running
1. Install Rust
2. Install Dioxus CLI (`cargo install dioxus-cli`)
3. Build Dioxus project (`dx build --features web --release`)
4. Run project (`cargo run --features ssr --release`)

Alternative, with hot-reload:
3. Build debug version of Dioxus project `dx build --features web`
4. Run project (`dx serve --features ssr --hot-reload --platform desktop`)