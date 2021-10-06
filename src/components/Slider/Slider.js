import React, {useEffect, useRef, useState} from "react";
import Slide from "../Slide/Slide";
import {PATTERN_DATA, SLIDER_DATA} from "../../constants/settings";
import "./Slider.scss";

function Slider() {
    const [slide, setSlide] = useState(0);
    const [pattern, setPattern] = useState(0);

    const timer = useRef(null);

    const getNextSlide = slide => slide === (SLIDER_DATA.length - 1) ? 0 : slide + 1;

    function switchSlide(slideIndex, patternIndex) {
        if (patternIndex === (PATTERN_DATA.length - 1)) {
            setSlide(getNextSlide(slideIndex));
            setPattern(0);
            timer.current = setTimeout(() => switchSlide(getNextSlide(slideIndex), 0), 3000);
        } else {
            setPattern(patternIndex + 1)
            timer.current = setTimeout(() => switchSlide(slideIndex, patternIndex + 1), 500);
        }
    }

    useEffect(() => {
        timer.current = setTimeout(() => switchSlide(slide, pattern), 3000);
        return () => clearTimeout(timer.current);
    }, []);

    return (
        <div className="slider">
            <Slide {...SLIDER_DATA[getNextSlide(slide)]}/>
            <Slide {...SLIDER_DATA[slide]} pattern={PATTERN_DATA[pattern]}/>
        </div>
    );
}

export default Slider;

