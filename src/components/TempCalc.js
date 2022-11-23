import React from 'react';
import BoilingPoint from './BoilingPoint';
import CelsiusConv from './CelsiusConv';
import FahrenheitConv from './FahrenheitConv';

import TempInput from './TempInput';
class TempCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    function RoundingFunc(temperature, convert) {
      const input = parseFloat(temperature);
      if (Number.isNaN(input)) {
        return '';
      }
      const output = convert(input);
      const rounded = Math.round(output * 1000) / 1000;
      return rounded.toString();
    }
    
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === 'c'
        ? RoundingFunc(temperature, <FahrenheitConv />)
        : temperature;
    const fahrenheit =
      scale === 'f' ? RoundingFunc(temperature, <CelsiusConv />) : temperature;

    return (
      <div>
        <TempInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TempInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingPoint celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default TempCalc;
