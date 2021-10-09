import Slider from "../Slider/Slider";
import {SLIDER_DATA} from "../../constants/settings";
import "./App.scss";

function App() {
    return (
        <div className="app">
            <Slider data={SLIDER_DATA}/>
        </div>
    );
}

export default App;
