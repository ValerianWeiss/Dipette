import React, { Component } from 'react';
import Color from './Color';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.getPixelInterval = null;
    this.defaultBtnText = 'Select a color (Ctrl)';

    this.state = {
      btnText: this.defaultBtnText, 
      color: {
        r: 255,
        g: 255,
        b: 255,
      }
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    this.props.screenChecker.stdout.on('data', this.handleScreenCheckerResponse);
  }

  render() {
    return (
      <div className="App">
        <Color color={this.state.color}/>
        <div id="color-picker-btn" onClick={this.onColorPickerClick}>
          <h3 id="color-picker-btn-txt">{this.state.btnText}</h3>
        </div>
      </div>
    );
  }

  handleKeyDown = event => {
    if(event.key === 'Control' && this.getPixelInterval == null) {
      this.setBtnText('Release Ctrl to pick a color');
      this.getPixelColor();
    } else if(event.key === ' ' && this.getPixelInterval != null) { // the empty string is representing the space key
      this.clearInterval();
    }
  }

  handleKeyUp = event => {
    if(event.key === 'Control' && this.getPixelInterval == null) {
      this.setBtnText(this.defaultBtnText);
    } 
  }

  getPixelColor = () => {
    let cmd = `${JSON.stringify({ Type: 0 })}\n`;
    this.props.screenChecker.stdin.write(cmd);
  }

  handleScreenCheckerResponse = data => {  
    this.setState({ 
      ...this.state.btnText, 
      color: JSON.parse(data)
    });
  }

  clearInterval() {
    clearInterval(this.getPixelInterval);
    this.setBtnText(this.defaultBtnText);
    this.getPixelInterval = null;
  }

  onColorPickerClick = () => {
    if(this.getPixelInterval == null) {
      this.setBtnText('Hit space to pick a color');
      this.getPixelInterval = setInterval(this.getPixelColor, 100);
    } else {
      this.clearInterval();
    }
  }

  setBtnText(text) {
    this.setState({
      btnText: text,
      ...this.state.color,
    });
  }
}