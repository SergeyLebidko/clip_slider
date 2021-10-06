import React from "react";
import classNames from "classnames";
import {PRESET1, PRESET2, PRESET3, PRESET4, PRESET5} from "../../constants/settings";
import "./Slide.scss";

function Slide({preset, mainHeader, smallHeader, text, buttonText, image, pattern}) {
    const classList = classNames('slide', {
        'preset_1': preset === PRESET1,
        'preset_2': preset === PRESET2,
        'preset_3': preset === PRESET3,
        'preset_4': preset === PRESET4,
        'preset_5': preset === PRESET5
    });

    const inlineStyle = pattern ? {clipPath: `polygon(${pattern.map(([x, y]) => x + "% " + y + "%").join(", ")})`} : {};

    return (
        <div className={classList} style={inlineStyle}>
            <h1>{mainHeader}</h1>
            <h3>{smallHeader}</h3>
            <div>
                {text.map((line, index) => <p key={index}>{line}</p>)}
            </div>
            <button>{buttonText}</button>
            <img src={image}/>
        </div>
    );
}

export default Slide;