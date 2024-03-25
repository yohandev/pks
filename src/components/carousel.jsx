import { Index, createEffect } from "solid-js";
import Flickity from "flickity";

import "flickity/dist/flickity.css";
import "../styles/carousel.css";

/**
 * A horizontal carousel of images
 * 
 * @param {{ images: string[] }} props
 */
function Carousel_old({ images, width = "50%", height = "400px" }) {
    return (
        <div class="carousel flex:row" style={`width: ${width}; height: ${height};`}>
            {images.map((image) => (
                <div class="carousel-item" style={`background-image: url(${image})`} />
            ))}
        </div>
    );
}

/**
 * @param {{ children: string[], width: string, height: string }} props
 */
function Carousel({ children, width="300px", height="150px" }) {
    let root;
    
    createEffect(() => {
        if (root) {
            new Flickity(root, {
                cellAlign: "center",
                wrapAround: true,
                prevNextButtons: false,
                autoPlay: true,
            });
        }
    });

    return (
        <div style={`width: ${width}; height: ${height};`} ref={root}>
            <Index each={children}>
                {(image) => (
                    <img src={image()} class="carousel-item" />
                )}
            </Index>
        </div>
    );
}

export default Carousel;