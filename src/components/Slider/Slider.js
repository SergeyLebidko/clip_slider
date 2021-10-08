import React, {useEffect, useRef, useState} from "react";
import Slide from "../Slide/Slide";
import {SLIDER_DATA} from "../../constants/settings";
import PATTERN_DATA from '../../content/pattern.json';
import "./Slider.scss";

const BIG_INTERVAL = 3000;
const SMALL_INTERVAL = 25;

function Slider() {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);
    const [pattern, setPattern] = useState(0);

    const timer = useRef(null);

    const getNextSlideIndex = slideIndex => slideIndex === (SLIDER_DATA.length - 1) ? 0 : slideIndex + 1;

    function switchSlide(currentIndex, nextIndex, patternIndex) {
        if (patternIndex === (PATTERN_DATA.length - 1)) {
            setCurrent(nextIndex);
            setNext(getNextSlideIndex(nextIndex));
            setPattern(0);
            timer.current = setTimeout(() => switchSlide(nextIndex, getNextSlideIndex(nextIndex), 0), BIG_INTERVAL);
        } else {
            setPattern(patternIndex + 1);
            timer.current = setTimeout(() => switchSlide(currentIndex, nextIndex, patternIndex + 1), SMALL_INTERVAL);
        }
    }

    useEffect(() => {
        timer.current = setTimeout(() => switchSlide(current, next, pattern), BIG_INTERVAL);
        return () => clearTimeout(timer.current);
    }, []);

    return (
        <div className="slider">
            {SLIDER_DATA.map((data, index) => {
                let wrapperInline = {display: 'none'};

                if (index === next) wrapperInline = {
                    ...wrapperInline,
                    display: 'block',
                    zIndex: 0
                }

                if (index === current) wrapperInline = {
                    ...wrapperInline,
                    display: 'block',
                    zIndex: 1000,
                    clipPath: `polygon(${PATTERN_DATA[pattern].map(([x, y]) => x + "% " + y + "%").join(", ")})`
                }

                return (
                    <div key={index} className="slider__slide_wrapper" style={wrapperInline}>
                        <Slide {...data}/>
                    </div>
                );
            })}
        </div>
    );
}

export default Slider;

