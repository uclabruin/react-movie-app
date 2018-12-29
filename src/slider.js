import React from "react";
import InputRange from "react-input-range";

import 'react-input-range/lib/css/index.css';


class Slider extends React.Component {

 render() {
    // InputRange callback function, which takes "range"
    // then we need otu pdate acller
    // Note:We must use arrow-style function here
    const handleSliderChange = range =>  {
        const data = { 
             type: this.props.data.label,
              value: range
        };
        this.props.onChange(data);
      };

    const { min, max, step, value, label } = this.props.data;
    return (
      <div className="slider">
        <label>{label}</label>
        <InputRange
          minValue={min}
          maxValue={max}
          step={step}
          onChange={handleSliderChange}
          value={value} >
        </InputRange>
      </div>
    )
    return  (<div></div>);
  }
 }
export default Slider;