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
if ('theme' in CONFIGFILE['components']['socialmedia']){
    var theme = CONFIGFILE['components']['socialmedia']['theme'];
} else if ('theme' in CONFIGFILE['global']){
  var theme = CONFIGFILE['global']['theme'];
} else {
    var theme = '';
    console.log('You have not chosen a theme, will revert to default');
}
//Get Default Styles
var styleSheet = null;
if (CONFIGFILE['components']['socialmedia'].hasOwnProperty('styleSheet')) {
    styleSheet = Object.assign(await getData(CONFIGFILE['components']['socialmedia']['styleSheet']));
} else {
    styleSheet = await getData('../components/socialmedia/json/default.json');
}

//Get Custom Styles
var customStyleSheet = null;
if ('customstyles' in CONFIGFILE['components']['socialmedia']) {
    customStyleSheet = Object.assign(await getData(CONFIGFILE['components']['socialmedia']['customstyles']));
} else {
    customStyleSheet = null;
}

//Get contentcontainer
var getcontentcontainer = null;
if (CONFIGFILE['components']['socialmedia'].hasOwnProperty('contentcontainer')) {
    getcontentcontainer =  Object.assign(await getData(CONFIGFILE['components']['socialmedia']['contentcontainer']));
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

export class WCContentContainer extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      subtitle: { type: String },
      imgsrc: { type: String },
      verttext: { type: String},
      horizontaltext: { type: String},
      styleType: { type: String },
      justifyContent: { type: String},
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.verttext = '';
    this.styleType = '';
    this.styleGuide = '';
    this.justifyContent = 'space-between'
    
  }

  render() {
    this.standardCSS = css`
    :host {
      display: flex;
      margin-bottom: 10px;
      justify-content: ${unsafeCSS(this.justifyContent)};

    }
    wc-container {
      display: flex;
      justify-content: ${unsafeCSS(this.justifyContent)};
      margin-bottom: 10px;
    }
    div {
      display:flex;
      justify-content: ${unsafeCSS(this.justifyContent)};
      width:100%;
      max-width: 1300px;
      margin: auto;
    }
    slot > wc-card {
      width: calc(100px)
    }
    `;

    return html`
    <style>${this.standardCSS}</style>

    <div class="container">
    <slot>
    </slot>
    
    </div>
    `;
  }
}
