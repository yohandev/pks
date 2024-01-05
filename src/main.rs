use dioxus::prelude::*;
use dioxus_fullstack::prelude::*;

mod components;

pub use components::*;

fn main() {
    LaunchBuilder::new(App).launch();
}

#[component]
fn App(cx: Scope) -> Element {
    let mut count = use_state(cx, || 0);

    render! {
        Logo { }
        h1 { "Mid-Five counter: {count}" }
        button { onclick: move |_| count += 1, "Up high!" }
        button { onclick: move |_| count -= 1, "Down low!" }
    }
}

