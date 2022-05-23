import React from "react";
import Svg, { Path } from "react-native-svg";

/**
 * Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj
 */
export default () => {
    return (
        <Svg viewBox="0 -0.5 4 4" shapeRendering="crispEdges">
            <Path stroke="#00a800" d="M1 0h1M0 1h3M0 2h1" />
            <Path stroke="#15230b" d="M2 0h1" />
            <Path stroke="#000000" d="M3 1h1M2 2h2" />
            <Path stroke="#6abe30" d="M1 2h1" />
            <Path stroke="#524b24" d="M1 3h2" />
        </Svg>
    );
};
