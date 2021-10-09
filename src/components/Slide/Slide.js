import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import {AiFillLeftCircle, AiFillRightCircle} from 'react-icons/ai';
import {PRESET1, PRESET2, PRESET3, PRESET4, PRESET5} from "../../constants/settings";
import "./Slide.scss";

function Slide({number, preset, mainHeader, smallHeader, text, image, toNext, toPrev}) {
    const textContentClasses = classNames('slide__content', {
        'preset_1': preset === PRESET1,
        'preset_2': preset === PRESET2,
        'preset_3': preset === PRESET3,
        'preset_4': preset === PRESET4,
        'preset_5': preset === PRESET5
    });

    return (
        <div className="slide">
            <img src={image} className="slide__photo"/>
            <div className="slide__cap"/>
            <div className={textContentClasses}>
                <h1>{mainHeader}</h1>
                <h3>{smallHeader}</h3>
                <div>
                    {text.map((line, index) => <p key={index}>{line}</p>)}
                </div>
                <div className="slide__control">
                    <AiFillLeftCircle color="white" onClick={toPrev}/>
                    <span className="slide__number">{number}</span>
                    <AiFillRightCircle color="white" onClick={toNext}/>
                </div>
            </div>
        </div>
    );
}

Slide.propTypes = {
    number: PropTypes.number,
    preset: PropTypes.string,
    mainHeader: PropTypes.string,
    smallHeader: PropTypes.string,
    text: PropTypes.array,
    image: PropTypes.string,
    toNext: PropTypes.func,
    toPrev: PropTypes.func
}

export default Slide;