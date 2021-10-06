import React from "react";
import Slide from "../Slide/Slide";
import {PATTERN_DATA, SLIDER_DATA} from "../../constants/settings";
import "./Slider.scss";

function Slider() {
    return (
        <div>
            {SLIDER_DATA.map((data, index) => <Slide key={index} {...data} pattern={PATTERN_DATA[0]}/>)}
        </div>
    );
}

export default Slider;

