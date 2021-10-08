import React from "react";
import classNames from "classnames";
import {PRESET1, PRESET2, PRESET3, PRESET4, PRESET5} from "../../constants/settings";
import "./Slide.scss";

function Slide({preset, mainHeader, smallHeader, text, buttonText, image}) {
    const textContentClasses = classNames('slide__text_content', {
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
                <button>{buttonText}</button>
            </div>
        </div>
    );
}

export default Slide;