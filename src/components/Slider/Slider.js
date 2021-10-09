import React, {useEffect, useRef, useState} from "react";
import Slide from "../Slide/Slide";
import PATTERN_DATA from '../../content/pattern.json';
import "./Slider.scss";

const BIG_INTERVAL = 3000;
const SMALL_INTERVAL = 30;

const TO_LEFT = 'to_left';
const TO_RIGHT = 'to_right';

function Slider({data}) {
    const [current, setCurrent] = useState(0);              // Индекс текущего слайда
    const [next, setNext] = useState(1);                    // Индекс следующего слайда
    const [line, setLine] = useState(0);                    // Индекс набора координат в текущем паттерне
    const [pattern, setPattern] = useState(PATTERN_DATA[TO_RIGHT]);  // Текущий паттерн

    const timer = useRef(null);

    const getNextSlideIndex = index => index === (data.length - 1) ? 0 : index + 1;
    const getPrevSlideIndex = index => index === 0 ? data.length - 1 : index - 1;

    function switchSlide(currentIndex, nextIndex, lineIndex, currentPattern) {
        if (lineIndex === (currentPattern.length - 1)) {
            setCurrent(nextIndex);
            setNext(getNextSlideIndex(nextIndex));
            setLine(0);
            setPattern(PATTERN_DATA[TO_RIGHT])
            timer.current = setTimeout(() => switchSlide(nextIndex, getNextSlideIndex(nextIndex), 0, PATTERN_DATA[TO_RIGHT]), BIG_INTERVAL);
        } else {
            setLine(lineIndex + 1);
            timer.current = setTimeout(() => switchSlide(currentIndex, nextIndex, lineIndex + 1, currentPattern), SMALL_INTERVAL);
        }
    }

    useEffect(() => {
        timer.current = setTimeout(() => switchSlide(current, next, line, pattern), BIG_INTERVAL);
        return () => clearTimeout(timer.current);
    }, []);

    const toNext = () => {
        if (line !== 0) return;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => switchSlide(current, getNextSlideIndex(current), 0, pattern), 0);
    }

    const toPrev = () => {
        if (line !== 0) return;
        clearTimeout(timer.current);
        setNext(getPrevSlideIndex(current));
        setPattern(PATTERN_DATA[TO_LEFT]);
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

