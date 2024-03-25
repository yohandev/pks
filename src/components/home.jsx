import Carousel from "./carousel";
import Card from "./card";

import image_party from "../assets/gallery/party_shark.jpeg";
import image_road_trip from "../assets/gallery/road_trip_2025.jpeg";
import image_rush from "../assets/gallery/steak_n_shake.jpeg";

import "../styles/home.css";

function Home() {
    return (
        <>
            <div class="panorama" />
            <div class="banner-description home-ramble">
                <h1>Skullhouse at a glance...</h1>
                <p>
                    Located just across the river from MIT campus, Skullhouse is home to around thirty brothers.
                    When they're not studying, you'll find the brothers sharing the house's many communal spaces;
                    be it jam sessions, ping pong tournaments or simply lounging, Skullhouse hosts a unique social
                    and creative culture. Our house stands five floors tall and boasts a beautiful view of both the
                    Cambridge and Boston skyline.
                </p>
            </div>
            <div class="flex:row">
                <Banner title="Rush" src={image_rush}>
                    Every fall, Skullhouse invites the MIT freshman class into our home for
                    various fun events!
                </Banner>
                <Banner title="Social Events" src={image_party} bright>
                    We host several parties and charity concerts throughout the semester.
                </Banner>
                <Banner title="Pledge Project" src="">
                    Most of our furniture is custom built by the freshman class over the years!
                </Banner>
                <Banner title="Road Trip" src={image_road_trip}>
                    Our pledges visit the New England area during our annual road trip.
                </Banner>
                <Banner title="Gerry D's" src="">
                    Dinner is served every school night at 6:15 sharp, made by our wonderful chef Gerry!
                </Banner>
            </div>
        </>
    );
}

function Banner({ children, src, title, bright }) {
    return (
        <div class="banner">
            {/* <div class="banner-image">
                <div class="banner-image-inner" style={`background-image: url("${src}"); filter: brightness(${lightness})`} />
            </div> */}
            <div class={`banner-image ${bright ? "banner-image-bright" : ""}`} style={`background-image: url("${src}")`} />
            <div class="bottom-label">
                <div class="banner-description">
                    <h1>{title}</h1>
                    <p>{children}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;