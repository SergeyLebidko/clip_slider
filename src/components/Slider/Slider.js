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
    const getPrevSlideIndex = slideIndex => slideIndex === 0 ? SLIDER_DATA.length - 1 : slideIndex - 1;

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

    const toNext = () => {
        if (pattern !== 0) return;
        clearTimeout(timer.current);
        setNext(getNextSlideIndex(current));
        timer.current = setTimeout(() => switchSlide(current, getNextSlideIndex(current), pattern), 0);
    }

    const toPrev = () => {
        if (pattern !== 0) return;
        clearTimeout(timer.current);
        setNext(getPrevSlideIndex(current));
        timer.current = setTimeout(() => switchSlide(current, getPrevSlideIndex(current), pattern), 0);
    }

    const getSlideWrapperInline = index => {
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
        return wrapperInline;
    }

    return (
        <div className="slider">
            {SLIDER_DATA.map((data, index) =>
                <div key={index} className="slider__slide_wrapper" style={getSlideWrapperInline(index)}>
                    <Slide {...data} number={index + 1} toNext={toNext} toPrev={toPrev}/>
                </div>
            )}
        </div>
    );
}

export default Slider;

