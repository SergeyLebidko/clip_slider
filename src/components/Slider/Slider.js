import React, {useEffect, useRef, useState} from "react";
import Slide from "../Slide/Slide";
import {SLIDER_DATA} from "../../constants/settings";
import PATTERN_DATA from '../../content/pattern.json';
import "./Slider.scss";

const BIG_INTERVAL = 3000;
const SMALL_INTERVAL = 30;

const TO_LEFT = 'to_left';
const TO_RIGHT = 'to_right';

function Slider() {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);
    const [pattern, setPattern] = useState(0);
    const [patternDirection, setPatternDirection] = useState(PATTERN_DATA[TO_RIGHT]);

    const timer = useRef(null);

    const getNextSlideIndex = slideIndex => slideIndex === (SLIDER_DATA.length - 1) ? 0 : slideIndex + 1;
    const getPrevSlideIndex = slideIndex => slideIndex === 0 ? SLIDER_DATA.length - 1 : slideIndex - 1;

    function switchSlide(currentIndex, nextIndex, patternIndex, direction) {
        if (patternIndex === (direction.length - 1)) {
            setCurrent(nextIndex);
            setNext(getNextSlideIndex(nextIndex));
            setPattern(0);
            setPatternDirection(PATTERN_DATA[TO_RIGHT]);
            timer.current = setTimeout(() => switchSlide(nextIndex, getNextSlideIndex(nextIndex), 0, PATTERN_DATA[TO_RIGHT]), BIG_INTERVAL);
        } else {
            setPattern(patternIndex + 1);
            timer.current = setTimeout(() => switchSlide(currentIndex, nextIndex, patternIndex + 1, direction), SMALL_INTERVAL);
        }
    }

    useEffect(() => {
        timer.current = setTimeout(() => switchSlide(current, next, pattern, patternDirection), BIG_INTERVAL);
        return () => clearTimeout(timer.current);
    }, []);

    const toNext = () => {
        if (pattern !== 0) return;
        clearTimeout(timer.current);
        setNext(getNextSlideIndex(current));
        timer.current = setTimeout(() => switchSlide(current, getNextSlideIndex(current), 0, patternDirection), 0);
    }

    const toPrev = () => {
        if (pattern !== 0) return;
        clearTimeout(timer.current);
        setNext(getPrevSlideIndex(current));
        setPatternDirection(PATTERN_DATA[TO_LEFT]);
        timer.current = setTimeout(() => switchSlide(current, getPrevSlideIndex(current), 0, PATTERN_DATA[TO_LEFT]), 0);
    }

    const getSlideWrapperInline = index => {
        if (index === next) return {
            display: 'block',
            zIndex: 0
        }
        if (index === current) return {
            display: 'block',
            zIndex: 1000,
            clipPath: `polygon(${patternDirection[pattern].map(([x, y]) => x + "% " + y + "%").join(", ")})`
        }
        return {display: 'none'};
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

