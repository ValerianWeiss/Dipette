/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import copyImage from '../images/copyToClipboard.svg';
import './Color.css';

export default class Color extends Component {

  componentWillReceiveProps(newProps) {
    this.fillPreviewWindow(newProps.color);
  }

  componentDidMount() {
    this.fillPreviewWindow(this.props.color);
    
  }

  render() {
    return(
      <div className="Color">
        <div id="color-container">
          <div id="preview-window-container" className="content-wrapper">
            <div id="preview-window"></div>
          </div>
          <div id="representation-container" className="content-wrapper">
            <div id="representation-wrapper">
              <div className="representation-content-container">
                <div id="representation-hex">
                  <h3 className="format-description">HEX:</h3>
                  <h3 id="hex-color-string" className="color-data">{this.getHexColorString()}</h3>
                  <button className="copy-btn hex" onClick={this.onCopyColorToClipboard} >
                    <img 
                      id="hex-copy-btn"
                      className="copy-image hex"
                      src={copyImage} alt="copy image"                      
                    />
                  </button>
                </div>
              </div>
              <div className="representation-content-container">
                <div id="representation-rgb">
                  <h3 className="format-description">RGB:</h3>
                  <h3 id="rgb-color-string" className="color-data">{this.getRGBColorString()}</h3>
                  <button className="copy-btn rgb"  onClick={this.onCopyColorToClipboard}>
                    <img
                      id="rgb-copy-btn"
                      className="copy-image rgb"
                      src={copyImage}
                      alt="copy image"
                    />
                  </button>
                </div>
              </div>
              <div className="representation-content-container">
                <div id="representation-cmyk">
                  <h3 className="format-description">CMYK:</h3>
                  <h3 id="cmyk-color-string" className="color-data">{this.getCMYKColorString()}</h3>
                  <button className="copy-btn cmyk" onClick={this.onCopyColorToClipboard}>
                    <img
                      id="cmyk-copy-btn"
                      className="copy-image cmyk"
                      src={copyImage}
                      alt="copy image"                      
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getRGBColorString() {
    let color = this.props.color;
    return `${color.r}, ${color.g}, ${color.b}`;
  }

  getHexColorString() {
    let color = this.props.color;

    let completeZero = str => {
      if(str.length === 1) str = `0${str}`;
      return str;
    }

    let hexR = completeZero(color.r.toString(16));
    let hexG = completeZero(color.g.toString(16));
    let hexB = completeZero(color.b.toString(16));
    let hex = hexR + hexG + hexB;
    return '#' + hex.toUpperCase();
  }

  getCMYKColorString() {
    let color = this.props.color;
    let c = 0, m = 0, y = 0, k = 0;
  
    if (color.r === 0 && color.g === 0 && color.b === 0) {
      return "0, 0, 0, 1";
    }
    
    c = 1 - (color.r / 255);
    m = 1 - (color.g / 255);
    y = 1 - (color.b / 255);
    
    let minCMY = Math.min(c, Math.min(m, y));
    c = Math.round((c - minCMY) / (1 - minCMY) * 100);
    m = Math.round((m - minCMY) / (1 - minCMY) * 100);
    y = Math.round((y - minCMY) / (1 - minCMY) * 100);
    k = Math.round(minCMY * 100);
    
    return `${c}, ${m}, ${y}, ${k}`;
  }

  onCopyColorToClipboard = event => {
    let className = event.target.className;
    let stringToCopy = '';

    if(className.includes('rgb')) stringToCopy = this.getRGBColorString();
    if(className.includes('hex')) stringToCopy = this.getHexColorString();
    if(className.includes('cmyk')) stringToCopy = this.getCMYKColorString();

    navigator.clipboard.writeText(stringToCopy);
  }

  fillPreviewWindow(color) {
    let colorPreview = document.getElementById('preview-window');
    let colorString = `rgb(${color.r},${color.g},${color.b})`;
    colorPreview.style.backgroundColor = colorString;
  }
}