import { Fetch } from "../components/fetch";

import "../styles/brothers.css";

/**
 * Component for the view that displays the active brothers and a
 * short blurb about them.
 */
export function Brothers() {
    // Counter object to pass around components and increment each time
    const counter = { i: 0 };
    return (
        <Fetch url="/api/brothers.cgi" json>
            {(brothers) => (
                // "Hard-coded" composites format loosely based on this:
                // https://www.dpcpix.com/file/Composite/Fraternity/Fraternity%20Full%20Size%20Images/Fraternity%20Composite%20Phi%20Gamma%20Delta.jpg
                //
                // Only the bottom row(s) are dynamic, allowing for more pictures to be added. Of course,
                // this won't look right if we somehow have less than ~20 brothers but I'm hoping that won't
                // happen.
                <div class="brothers">
                    <div id="top">
                        <CompositeRow length={6} brothers={brothers} counter={counter}/>
                    </div>
                    <div id="middle">
                        <div id="left">
                            <CompositeRow length={3} brothers={brothers} counter={counter}/>
                            <CompositeRow length={3} brothers={brothers} counter={counter}/>
                        </div>
                        <div id="title">
                            <span id="name">Phi Kappa Sigma</span>
                            <span id="chapter">Alpha Mu Chapter</span>
                            <span id="university">Massachusetts Institute of Technology</span>
                        </div>
                        <div id="right">
                            <CompositeRow length={3} brothers={brothers} counter={counter}/>
                            <CompositeRow length={3} brothers={brothers} counter={counter}/>
                        </div>
                    </div>
                    <div id="bottom">
                        <CompositeRow length={4} brothers={brothers} counter={counter}/>
                        <CompositeRow length={4} brothers={brothers} counter={counter}/>
                    </div>
                    <div id="slums">
                        {/* Populate 0-N rows at the bottom with the remaining brothers */}
                        {Array(Math.ceil((brothers.length - counter.i) / 9)).fill().map((_) => (
                            <CompositeRow length={9} brothers={brothers} counter={counter}/>
                        ))}
                    </div>
                </div>
            )}
        </Fetch>
    );
}

/**
 * Component for the composite of a single person. Displays their picture and name
 * underneath it.
 */
function Composite({ name, picture }) {
    return (
        <div class="composite">
            <img id="picture" src={picture}/>
            <span id="name">{name}</span>
        </div>
    );
}

/**
 * Component for up-to `length` composites side-by-side. It accepts a `counter` prop
 * and accumulates it as it traverses through `brothers`.
 * @param {{
 *  length: number,
 *  brothers: { name: string, picture: string }[],
 *  counter: { i: number }
 * }} props 
 */
function CompositeRow({ length, brothers, counter }) {
    return (
        <div class="composite-row">
            {Array(Math.min(length, brothers.length - counter.i)).fill().map((_) => (
                <Composite {...brothers[counter.i++]}/>
            ))}
        </div>
    );
}