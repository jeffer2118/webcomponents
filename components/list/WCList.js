import { LitElement, html, css, unsafeCSS} from 'lit-element';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

import  STYLESKEY from '../../global/global-var';

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}
const CONFIGFILE = await getData('../../config.json');

//Get Theme from config
var theme = '';
if ('theme' in CONFIGFILE['components']['list']){
    var theme = CONFIGFILE['components']['list']['theme'];
} else if ('theme' in CONFIGFILE['global']){
  var theme = CONFIGFILE['global']['theme'];
} else {
    var theme = '';
    console.log('You have not chosen a theme, will revert to default');
}
//Get Default Styles
var styleSheet = null;
if (CONFIGFILE['components']['card'].hasOwnProperty('styleSheet')) {
    styleSheet = Object.assign(await getData(CONFIGFILE['components']['list']['styleSheet']));
} else {
    styleSheet = await getData('../components/list/json/default.json');
}

//Get Custom Styles
var customStyleSheet = null;
if ('customstyles' in CONFIGFILE['components']['list']) {
    customStyleSheet = Object.assign(await getData(CONFIGFILE['components']['list']['customstyles']));
} else {
    customStyleSheet = null;
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
// function getCardStyles(pageTheme, colorName, defaultColor = "white"){
//   if(pageTheme in STYLESKEY['colors'] && colorName in STYLESKEY['colors'][pageTheme]){
//       return STYLESKEY['colors'][pageTheme][colorName]["value"];
//   } else if(STYLESKEY["colors"]['default'][colorName]) {
//       return STYLESKEY["colors"]['default'][colorName]["value"];
//   } else {
//       return STYLESKEY["colors"]['default'][defaultColor]["value"];
//   }
// }

export class WCList extends LitElement {
  static get properties() {
    return {
      listStyle: { type: String },
      numberInList: { type: Number},
      imageList: { type: String},
    };
  }
  
  constructor() {
    super();
    this.listStyle = "num-list-outlined";
    this.numberInList = 2;
    this.imageList = "";
  }

  static get styles() {
    
  }
  
  render() {
    const numberOfSlots = this.numberOfSlots;

    console.log(styleSheet);
    var listStyles = "";
    
    Object.keys(styleSheet[this.listStyle]).forEach(selector => {
        var properties = styleSheet[this.listStyle][selector];
        Object.keys(properties).forEach(property => {
            listStyles += `${selector} { ${property}: ${properties[property]}; }\n`;
        });
    });
    console.log(listStyles);
    console.log(this.numberInList)
    var slots =``;
    var listCustomCSS = ``;
    for (let i = 0; i < this.numberInList; i++) {
        if (this.listStyle == "num-list-outlined" || "num-list-solid"){
            slots += `<li><slot name="item${(i+1)}"></slot></li>`;
            listCustomCSS += `li:nth-child(${i+1})::before {
                content: "${i+1}";
              }`
        } else {
            slots += `<li><slot name="item${(i+1)}"></slot></li>`;
        }
    }
    if (this.listStyle == "num-list"){
        listCustomCSS += ``;
    }
    if (this.listStyle == "num-list"){
    
    } else {

    }

    console.log(listCustomCSS)
    return html`
      <style>
        ${listStyles}
        ${unsafeCSS(listCustomCSS)}
        </style>
      <ol>
      ${unsafeHTML(slots)}
      </ol>
    `;
  }
}