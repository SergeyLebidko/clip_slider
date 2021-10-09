import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
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

    useEffect(() => {
        if (line === 0) timer.current = setTimeout(() => setLine(1), BIG_INTERVAL);
        if (line > 0 && line < (pattern.length - 1)) timer.current = setTimeout(() => setLine(oldLine => oldLine + 1), SMALL_INTERVAL);
        if (line === (pattern.length - 1)) timer.current = setTimeout(() => {
            setLine(0);
            setCurrent(next);
            setNext(getNextSlideIndex(next));
            setPattern(PATTERN_DATA[TO_RIGHT]);
        }, SMALL_INTERVAL);
    }, [line]);

    useEffect(() =>  () => clearTimeout(timer.current), []);

    const toNext = () => {
        if (line !== 0) return;
        clearTimeout(timer.current);
        setLine(1);
    }

    const toPrev = () => {
        if (line !== 0) return;
        clearTimeout(timer.current);
        setNext(getPrevSlideIndex(current));
        setPattern(PATTERN_DATA[TO_LEFT]);
        setLine(1);
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

Slider.propTypes = {
    data: PropTypes.array
}

export default Slider;