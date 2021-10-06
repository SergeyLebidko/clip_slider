import React, {useEffect, useRef, useState} from "react";
import Slide from "../Slide/Slide";
import {PATTERN_DATA, SLIDER_DATA} from "../../constants/settings";
import "./Slider.scss";

const BIG_INTERVAL = 6000;
const SMALL_INTERVAL = 500;

function Slider() {
    const [slide, setSlide] = useState(0);
    const [pattern, setPattern] = useState(0);

    const timer = useRef(null);

    const getNextSlideIndex = slideIndex => slideIndex === (SLIDER_DATA.length - 1) ? 0 : slideIndex + 1;

    function switchSlide(slideIndex, patternIndex) {
        if (patternIndex === (PATTERN_DATA.length - 1)) {
            setSlide(getNextSlideIndex(slideIndex));
            setPattern(0);
            timer.current = setTimeout(() => switchSlide(getNextSlideIndex(slideIndex), 0), BIG_INTERVAL);
        } else {
            setPattern(patternIndex + 1);
            timer.current = setTimeout(() => switchSlide(slideIndex, patternIndex + 1), SMALL_INTERVAL);
        }
    }

    useEffect(() => {
        timer.current = setTimeout(() => switchSlide(slide, pattern), BIG_INTERVAL);
        return () => clearTimeout(timer.current);
    }, []);

    return (
        <div className="slider">
            <Slide key="next" {...SLIDER_DATA[getNextSlideIndex(slide)]}/>
            <Slide key="current" {...SLIDER_DATA[slide]} pattern={PATTERN_DATA[pattern]}/>
        </div>
    );
}

export default Slider;

