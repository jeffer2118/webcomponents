import { html, css, LitElement, unsafeCSS } from 'lit';
import  STYLESKEY from '../../global/global-var';

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}
const CONFIGFILE = await getData('../../config.json');

//Get Theme from config
var theme = '';
if (CONFIGFILE['components']['button']['theme']){
    var theme = CONFIGFILE['components']['button']['theme'];
} else if (CONFIGFILE['global']['theme']) {
    var theme = CONFIGFILE['global']['theme'];
} else {
    var theme = '';
    console.log('You have not chosen a theme, will revert to default');
}

//Get Default Styles
var styleSheet = null;
if (CONFIGFILE['components']['button']['styleSheet']) {
    styleSheet = Object.assign(await getData(CONFIGFILE['components']['button']['styleSheet']));
} else {
    styleSheet = await getData('../components/button/json/sample.json');
}

//Get Font Family
function getFonts(fontName){
    if(fontName in STYLESKEY['fonts']){
        return STYLESKEY["fonts"][fontName]["value"];
    } else {
        return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
    }
}

//function to get colors
function getStyles(pageTheme, colorName, defaultColor = "white"){
    if(pageTheme in STYLESKEY['colors'] && colorName in STYLESKEY['colors'][pageTheme]){
        return STYLESKEY['colors'][pageTheme][colorName]["value"];
    } else if(STYLESKEY["colors"]['default'][colorName]) {
        return STYLESKEY["colors"]['default'][colorName]["value"];
    } else {
        return STYLESKEY["colors"]['default'][defaultColor]["value"];
    }
}


export class WCButton extends LitElement {
  static get properties() {
    return {
      buttonType: { type: String },
      bgColor: { type: String },
      fontColor: { type: String },
      buttonState: { type: String },
      link: { type: String },
      hoverBGColor: { type: String },
      btnSize: { type: String},
      styleTheme: { type: String},
      font: { type: String},
      htmlType: { type: String },
      functionType: {type: String},
    };
  }
  
  constructor() {
    super();
    this.buttonType = "rectangular";
    this.bgColor = "gray-50";
    this.fontColor = "white";
    this.buttonState = "active";
    this.link = "https://espn.com";
    this.hoverBGColor = "";
    this.btnSize = "md";
    this.styleTheme = theme + "-";
    this.font = "";
    this.htmlType = "button";
    this.functionType = "";
  }
  
  render() {
 
    //Button Style
    if (styleSheet["button-styles"][this.buttonType]) {
        var buttonStyles = styleSheet["button-styles"][this.buttonType];
    }
    else if(styleSheet["button-styles"][this.buttonType]){
        var buttonStyles = styleSheet["button-styles"][this.buttonType];
    } else {
        var buttonStyles = styleSheet["button-styles"]["rectangular"];
    }

    //Button Colors
    var bgStyle = getStyles(this.styleTheme, this.bgColor);
    var textStyle = getStyles(this.styleTheme, this.fontColor);
    
    //Need to work on enabling and disabling hover
    var hoverBG = getStyles(this.styleTheme, this.hoverBGColor);

    if (this.hoverBGColor) {
        var hoverStyle = `a:hover{
            background-color: ${hoverBG};
        }`;
    } else {
        var hoverStyle = ``;
    }

    //Font
    var fontName = getFonts(this.styleTheme, this.font);

    //Font Size (button size)
    if(styleSheet["sizes"][this.btnSize]){
        var fontSize = styleSheet["sizes"][this.btnSize];
    } else if(styleSheet["sizes"][this.btnSize])  {
        var fontSize = styleSheet["sizes"][this.btnSize];
    } else {
        var fontSize = styleSheet["sizes"]["md"];
    }

    //If Button type is unstyled
    if (this.buttonType == "unstyled"){
        textStyle = "blue";
        bgStyle = "none";
    }

    //If Button Type is Outlined
    if (this.buttonType == "outlined") {
        var bgStyle =`transparent; box-shadow: inset 0 0 0 2px ${this.bgColor}`
        var textStyle = this.bgColor;
    }
    //Iterate through button style
    var btnStyles = "";
    Object.keys(buttonStyles).forEach(key => {
        btnStyles += `${key}: ${buttonStyles[key]};`;
    });
 
    styleSheet["button-styles"][this.buttonType]
    //Button Type
    if (this.htmlType == "button") {
        var htmlCode = html`<button type="${this.functionType}"><slot></slot></button>`;
    } else {
      var htmlCode = html`<a class="button" href="${this.link}"><slot></slot></a>`;
      

    }
    let customCSS = css``

    return html`
      <style>
        a {
            ${btnStyles}
            color: ${textStyle};
            background-color: ${bgStyle};
            font-size: ${fontSize};
            font-family: ${fontName};
        }
        button {
            ${btnStyles}
            color: ${textStyle};
            background-color: ${bgStyle};
            font-size: ${fontSize};
            font-family: ${fontName};
        }
        ${hoverStyle}
        ${this.standardCSS} ${this.customCSS}
      </style>
      ${htmlCode}
    `;
  }
}
