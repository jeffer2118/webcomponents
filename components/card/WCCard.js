import { LitElement, html, css, unsafeCSS } from 'lit-element';
import  STYLESKEY from '../../global/global-var';

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}
const CONFIGFILE = await getData('../../config.json');

//Get Theme from config
var theme = '';
if ('theme' in CONFIGFILE['components']['card']){
    var theme = CONFIGFILE['components']['card']['theme'];
} else if ('theme' in CONFIGFILE['global']){
  var theme = CONFIGFILE['global']['theme'];
} else {
    var theme = '';
    console.log('You have not chosen a theme, will revert to default');
}
//Get Default Styles
var styleSheet = null;
if (CONFIGFILE['components']['card'].hasOwnProperty('styleSheet')) {
    styleSheet = Object.assign(await getData(CONFIGFILE['components']['card']['styleSheet']));
} else {
    styleSheet = await getData('../components/card/json/default.json');
}

//Get Custom Styles
var customStyleSheet = null;
if ('customstyles' in CONFIGFILE['components']['card']) {
    customStyleSheet = Object.assign(await getData(CONFIGFILE['components']['card']['customstyles']));
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
function getCardStyles(pageTheme, colorName, defaultColor = "white"){
  if(pageTheme in STYLESKEY['colors'] && colorName in STYLESKEY['colors'][pageTheme]){
      return STYLESKEY['colors'][pageTheme][colorName]["value"];
  } else if(STYLESKEY["colors"]['default'][colorName]) {
      return STYLESKEY["colors"]['default'][colorName]["value"];
  } else {
      return STYLESKEY["colors"]['default'][defaultColor]["value"];
  }
}

export class WCCard extends LitElement {
  static get properties() {
    return {
      cardType: { type: String },
      cardStyle: { type: String },
      fontColor: { type: String },
      styleTheme: { type: String},
      font: { type: String},
      imageSize: { type: String},
      custom: { type: String},
      backgroundColor: { type: String},
      altText: {type: String},
      imgSrc: {type: String},
      altBG: {type: String},
      altTextColor: {type: String},
      cardBG: { type: String},
      cardWidth: { type: String},
    };
  }
  
  constructor() {
    super();
    this.fontColor = "white";
    this.styleTheme = "default";
    this.font = "";
    this.cardStyle = "defaultNoImage";
    this.cardType = "default";
    this.imageSize = "";
    this.custom = "";
    this.backgroundColor = "gray-5";
    this.altBG = "gray-50";
    this.altTextColor = "white";
    this.cardBG = "gray-50";
    this.cardWidth = "100%";
  }

  static get styles() {
    
  }
  firstUpdated() {
    const imgSlot = this.renderRoot.querySelector('slot[name=image]'); // select the slot element
    // if(imgSlot){
    // const card = this.shadowRoot.querySelector('.img');
    // const cardWidth = card.offsetWidth;
    // const cardHeight = card.offsetHeight;
    // console.log(`Card size: ${cardWidth}px x ${cardHeight}px`);
    // }
  }
  updated() {

    const imgSlot = this.renderRoot.querySelector('slot[name=image]'); // select the slot element

    if(imgSlot){

      const img = imgSlot.assignedElements()[0]; // select the first element in the slot
   
      this.altText = img.alt; // get the alt text of the image

      if (img.src) {
        fetch(img.src)
          .then(response => {
            if (!response.ok) {
              console.log(`Image ${img.src} returned a ${response.status} error`);
            }
          }).then(data => {
            if(!response.ok){
              this.imgSrc = false;
  
            }
          }).catch(error => {
            console.log(`Failed to fetch Image ${img.src}: ${error}`);
          });
      }
    }
  }

  render() {

    const imgSlot = this.renderRoot.querySelector('slot[name=image]'); // select the slot element
    
    if(imgSlot){
      const card = this.shadowRoot.querySelector('.card');
      const cardWidth = card.offsetWidth;
      const cardHeight = card.offsetHeight;
      console.log(`Card size: ${cardWidth}px x ${cardHeight}px`);
      var imgSize = {
        "width": cardWidth,
        "height": cardHeight
      }
    }

    let defaultStyles = styleSheet['cardStyle'][this.cardStyle][this.cardType];
    //Iterate through default style
    var styles = ``;
    if (this.imageSize && this.cardStyle == "horizontal") {
      Object.keys(defaultStyles).forEach(key => {
        var cardStyles = '';
        Object.keys(defaultStyles[key]).forEach(keys => {
          if (keys == "margin-left" && key != ".card" || (key != ".img" && keys == "width")) {
            cardStyles += `${unsafeCSS(keys)}: ${unsafeCSS(this.imageSize)};`;
          } else {
            cardStyles += `${unsafeCSS(keys)}: ${unsafeCSS(defaultStyles[key][keys])};`;
          }
        });
        styles += `${unsafeCSS(key)} { ${unsafeCSS(cardStyles)}} `;
      });
    } else if(defaultStyles != null) {
      Object.keys(defaultStyles).forEach(key => {
        var cardStyles = '';
        Object.keys(defaultStyles[key]).forEach(keys => {
          cardStyles += `${unsafeCSS(keys)}: ${unsafeCSS(defaultStyles[key][keys])};`;
        });
        styles += `${unsafeCSS(key)} { ${unsafeCSS(cardStyles)}} `;
      });
    }

    //add colors and fonts
    var altBGColor = getCardStyles(this.styleTheme, this.altBG);
    var altFontColor = getCardStyles(this.styleTheme, this.altTextColor);

    //check to see if bg is image
    const pattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
    if (pattern.test(this.cardBG)) {
      var cardBGStyle = `url(${this.cardBG})`;
    } else {
      var cardBGStyle = getCardStyles(this.styleTheme, this.cardBG);
    }
    //iterate custom styles
    var customStyles = ``;

    if (imgSlot && this.cardStyle == "vertical"){
      var imgHeight = `height: ${(imgSize.width * 3)/4}px;`
    } else {
      var imgHeight = ``
    }
    
    if (this.custom in customStyleSheet) {
      Object.keys(customStyleSheet[this.custom]).forEach(key => {
        var customCardStyles = '';
        Object.keys(customStyleSheet[this.custom][key]).forEach(keys => {
          customCardStyles += `${unsafeCSS(keys)}: ${unsafeCSS(customStyleSheet[this.custom][key][keys])};`;
        });
        customStyles += `${unsafeCSS(key)} { ${unsafeCSS(customCardStyles)}} `;
      });
    }
    const getStyles = `${unsafeCSS(styles)}`
    const getCustomStyles = `${unsafeCSS(customStyles)}`
    
    var defaultImage = html`
      <div class="card" style="width: ${this.cardWidth};">
          <div class="header">
            <h2><slot name="title">Slot name is Title</slot></h2>
          </div>
          <div class="media" style="${imgHeight};">
            <div class="alt-text" style="background-color:${altBGColor}; color: ${altFontColor}; ${imgHeight};">
              ${this.altText} 
            </div>
            <div class="img">
              <slot name="image" >
                <img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg" alt="A placeholder image">
              </slot>
            </div>
          </div>
          <div class="body">
            <slot name="body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum tenetur quo cupiditate, eaque qui officia recusandae.</slot>
          </div>
          <div class="footer">
            <slot name="footer">
              <wc-button>Default</wc-button>
            </slot>
          </div>
      </div>
      `;
    var defaultNoImage = html`
    <div class="card" style="width: ${this.cardWidth}; background: ${cardBGStyle}; color:${this.fontColor}">
      <div class="inner">
        <div class="header">
          <h2><slot name="title">Slot name is Title</slot></h2>
        </div>
        <div class="body">
          <slot name="body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum tenetur quo cupiditate, eaque qui officia recusandae.</slot>
        </div>
        <div class="footer">
          <slot name="footer">
            <wc-button>Default</wc-button>
          </slot>
        </div>
        </div>
    </div>
    `
    
   
   
   
   
   if (this.cardStyle !== "defaultNoImage") {
    var htmlCode = defaultImage;
   } else {
    var htmlCode = defaultNoImage;
   }
   
   return html`
      <style>
        ${getStyles}
        ${getCustomStyles}
      </style>
      
        ${htmlCode}
    `;
  }
}