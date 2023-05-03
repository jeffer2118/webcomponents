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
function getStyles(pageTheme, colorName, defaultColor = "white") {
  let colorSheet = pageTheme + "colors";
  if (customStyleSheet && customStyleSheet[colorSheet][colorName]) {
    console.log('custom');
    return customStyleSheet[colorSheet][colorName]["value"];
  } else if (styleSheet["colors"][colorName]) {
    console.log('defaul color');

    return styleSheet["colors"][colorName]["value"];
  } else {
    console.log('default');

    return styleSheet["colors"][defaultColor]["value"];
  }
}

export class WCHero extends LitElement {
  static get properties() {
    return {
      heroType: { type: String },
      heroHeight: { type: String},
      vAlign: { type: String},
      hAlign: { type: String},
      bgImage: { type: String},
    };
  }

  constructor() {
    super();
    this.heroStyle = "vertical";
    this.heroType = "fixedHero";
    this.imageSize = "";
    this.custom = "";
    this.bgImage = "url('https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg')";
    this.heroHeight = "100vh";
    this.vAlign = "center";
    this.hAlign = "left";
    this.fixed = "t=20"
  }

  static get styles() {

  }

  render() {
    var verticalAlignment;
    var horizontalAlignment;
    switch (this.vAlign) {
      case "bottom":
        verticalAlignment = "flex-end"
        break;
      case "top":
        verticalAlignment = "flex-start"
        break;
      default:
        verticalAlignment = "center"

    }

    switch (this.hAlign) {
      case "right":
        horizontalAlignment = "flex-end"
        break;
      case "left":
        horizontalAlignment = "flex-start"
        break;
      case "corners":
        horizontalAlignment = "space-between"
        break;
      case "evenly":
        horizontalAlignment = "space-around"
        break;
      default:
        horizontalAlignment = "center"

    }

    // let defaultStyles = styleSheet['heroStyle'][this.heroStyle][this.heroType];
    //Iterate through default style
    var styles = ``;
    // Object.keys(defaultStyles).forEach(key => {
    //   var heroStyles = '';
    //   Object.keys(defaultStyles[key]).forEach(keys => {
    //     heroStyles += `${unsafeCSS(keys)}: ${unsafeCSS(defaultStyles[key][keys])};`;
    //   });
    //   styles += `${unsafeCSS(key)} { ${unsafeCSS(heroStyles)}} `;
    // });

    //iterate custom styles
    var customStyles = ``;

    // if (this.custom in customStyleSheet) {
    //   Object.keys(customStyleSheet[this.custom]).forEach(key => {
    //     var customheroStyles = '';
    //     Object.keys(customStyleSheet[this.custom][key]).forEach(keys => {
    //       customheroStyles += `${unsafeCSS(keys)}: ${unsafeCSS(customStyleSheet[this.custom][key][keys])};`;
    //     });
    //     customStyles += `${unsafeCSS(key)} { ${unsafeCSS(customheroStyles)}} `;
    //   });
    // }

    console.log(customStyles);

    const getStyles = `${unsafeCSS(styles)}`
    const getCustomStyles = `${unsafeCSS(customStyles)}`

     var flexHero =  html`
                      <style>
                        .hero {
                          background: ${this.bgImage} no-repeat center center fixed; ;
                          height: calc(${this.heroHeight});
                          min-height: 600px;
                          -webkit-background-size: cover;
                          -moz-background-size: cover;
                          -o-background-size: cover;
                          background-size: cover;
                        }
                        .inner {
                          width: calc(100% - 4rem);
                          max-width: 1200px;
                          margin: 0 auto;
                          height: calc(100%);
                          position:relative;
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                          border: 1px solid black;

                        }
                        .body{
                          width: 100%;
                          height: 100%;
                        }
                        .header {
                          width: 100%;
                          border: 1px solid black;
                          text-align: center;
                          top: 0;
                          left: 0;
                        }
                        ::slotted([slot="body"]) {
                          display:flex;
                          width: 100%;
                          flex-wrap: wrap;
                          height: 100%;
                          align-items: ${verticalAlignment};
                          justify-content: ${horizontalAlignment};
                        }
                        slot["body"] {
                          display:flex;
                        }
                        .footer {
                          width: 100%;
                          border: 1px solid black;
                          text-align: center;
                          bottom: 0;
                          left: 0;
                        }

                        ${getStyles}
                        ${getCustomStyles}
                        </style>
                      <div class="hero">
                        <div class="inner">
                          <div class="header">
                            <slot name="header">
                              <h2> Header </h2>
                            </slot>
                          </div>
                          <div class="body">
                            <slot name="body">
                              <wc-card cardWidth="50%"></card>
                            </slot>
                          </div>
                          <div class="footer">
                            <slot name="footer">
                            <h2> Footer </h2>
                            </slot>
                          </div>
                        </div>

                    </div>
                    `;

  var heroFixed = html`
                    <style>
                      .hero {
                        background: ${this.bgImage} no-repeat center center fixed; ;
                        height: calc(${this.heroHeight});
                        min-height: 600px;
                        -webkit-background-size: cover;
                        -moz-background-size: cover;
                        -o-background-size: cover;
                        background-size: cover;
                      }
                      .inner {
                        width: calc(100% - 4rem);
                        max-width: 1200px;
                        margin: 0 auto;
                        height: calc(100%);
                        position:relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        border: 1px solid black;

                      }
                      .body{
                        width: 100%;
                        height: 100%;
                      }
                      .header {
                        width: 100%;
                        border: 1px solid black;
                        text-align: center;
                        top: 0;
                        left: 0;
                        position:absolute;
                      }
                      ::slotted([slot="body"]) {
                        align-items: ${verticalAlignment};
                        justify-content: ${horizontalAlignment};
                        position: absolute;
                        top: 50%;
                        left: 0;
                        right: 0;
                        margin: auto;
                        transform: translateY(-50%);        }
                      slot["body"] {
                        display:flex;
                      }
                      .footer {
                        width: 100%;
                        border: 1px solid black;
                        text-align: center;
                        position:absolute;
                        bottom: 0;
                        left: 0;
                      }

                      ${getStyles}
                      ${getCustomStyles}
                      </style>
                    <div class="hero">
                      <div class="inner">
                        <div class="header">
                          <slot name="header">
                            <h2> Header </h2>
                          </slot>
                        </div>
                        <div class="body">
                          <slot name="body">
                            <wc-card cardWidth="50%"></card>
                          </slot>
                        </div>
                        <div class="footer">
                          <slot name="footer">
                          <h2> Footer </h2>
                          </slot>
                        </div>
                      </div>

                    </div>
                    `;               
    switch (this.heroStyle) {
      case "fixedHero":
        var heroDesign = heroFixed;
        break;
      default:
        var heroDesign = flexHero;
    }
    return heroDesign;
  }
}