use dioxus::prelude::*;

#[component]
pub fn Logo(cx: Scope) -> Element {
    render! {
        div {
            height: "5.5rem",

            div {
                class: "hover:glow",
                background: "url(images/logo_dark.png)",
                background_size: "cover",
                height: "100%",
                "aspect-ratio": "1 /1",
            }
        }
    }
}