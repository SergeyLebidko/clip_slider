import React, {useEffect, useRef, useState} from "react";
import Slide from "../Slide/Slide";
import PATTERN_DATA from '../../content/pattern.json';
import "./Slider.scss";

const BIG_INTERVAL = 3000;
const SMALL_INTERVAL = 30;

const TO_LEFT = 'to_left';
const TO_RIGHT = 'to_right';

function Slider({data}) {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);
    const [line, setLine] = useState(0);
    const [pattern, setPattern] = useState(PATTERN_DATA[TO_RIGHT]);

    const timer = useRef(null);

    const getNextSlideIndex = slideIndex => slideIndex === (data.length - 1) ? 0 : slideIndex + 1;
    const getPrevSlideIndex = slideIndex => slideIndex === 0 ? data.length - 1 : slideIndex - 1;

    const setLeftPattern = () => setPattern(PATTERN_DATA[TO_LEFT]);
    const setRightPattern = () => setPattern(PATTERN_DATA[TO_RIGHT]);

    function switchSlide(currentIndex, nextIndex, lineIndex, pattern) {
        if (lineIndex === (pattern.length - 1)) {
            setCurrent(nextIndex);
            setNext(getNextSlideIndex(nextIndex));
            setLine(0);
            setRightPattern();
            timer.current = setTimeout(() => switchSlide(nextIndex, getNextSlideIndex(nextIndex), 0, PATTERN_DATA[TO_RIGHT]), BIG_INTERVAL);
        } else {
            setLine(lineIndex + 1);
            timer.current = setTimeout(() => switchSlide(currentIndex, nextIndex, lineIndex + 1, pattern), SMALL_INTERVAL);
        }
    }

    useEffect(() => {
        timer.current = setTimeout(() => switchSlide(current, next, line, pattern), BIG_INTERVAL);
        return () => clearTimeout(timer.current);
    }, []);

    const toNext = () => {
        if (line !== 0) return;
        clearTimeout(timer.current);
        setNext(getNextSlideIndex(current));
        timer.current = setTimeout(() => switchSlide(current, getNextSlideIndex(current), 0, pattern), 0);
    }

    const toPrev = () => {
        if (line !== 0) return;
        clearTimeout(timer.current);
        setNext(getPrevSlideIndex(current));
        setLeftPattern();
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
            clipPath: `polygon(${pattern[line].map(([x, y]) => x + "% " + y + "%").join(", ")})`
        }
        return {display: 'none'};
    }

    return (
        <div className="slider">
            {data.map((data, index) =>
                <div key={index} className="slider__slide_wrapper" style={getSlideWrapperInline(index)}>
                    <Slide {...data} number={index + 1} toNext={toNext} toPrev={toPrev}/>
                </div>
            )}
        </div>
    );
}

export default Slider;

