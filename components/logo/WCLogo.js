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
if ('theme' in CONFIGFILE['components']['logo']){
    var theme = CONFIGFILE['components']['logo']['theme'];
} else if ('theme' in CONFIGFILE['global']){
  var theme = CONFIGFILE['global']['theme'];
} else {
    var theme = '';
    console.log('You have not chosen a theme, will revert to default');
}
//Get Default Styles
var styleSheet = null;
if (CONFIGFILE['components']['logo'].hasOwnProperty('styleSheet')) {
    styleSheet = Object.assign(await getData(CONFIGFILE['components']['logo']['styleSheet']));
} else {
    styleSheet = await getData('../components/logo/json/default.json');
}

//Get Custom Styles
var customStyleSheet = null;
if ('customstyles' in CONFIGFILE['components']['logo']) {
    customStyleSheet = Object.assign(await getData(CONFIGFILE['components']['logo']['customstyles']));
} else {
    customStyleSheet = null;
}

//Get logos
var getlogos = null;
if (CONFIGFILE['components']['logo'].hasOwnProperty('logos')) {
    getlogos =  Object.assign(await getData(CONFIGFILE['components']['logo']['logos']));
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

export class WCLogo extends LitElement {
    static get properties() {
        return {
            logoURL: { type: String },
            logoWidth: { type: String },
            logoHeight: { type: String},
            titleColor: { type: String},
            taglineColor: { type: String},
            logoType: { type: String},
        };
    }

    constructor() {
        super();
        this.logoURL = '/';
        this.logoWidth = '';
        this.logoHeight = '';
        this.titleColor = "black";
        this.taglineColor = "gray-30";
        this.logoType = "header";
    }

    render() {
        console.log(STYLESKEY);
        let defaultLogo = `<svg width="75" height="75" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M460 160C428 160 400 188 400 220C400 252 428 280 460 280C492 280 520 252 520 220C520 188 492 160 460 160ZM680 0H120C52 0 0 52 0 120V680C0 748 52 800 120 800H680C748 800 800 748 800 680V120C800 52 748 0 680 0ZM720 476L644 400C596 356 520 356 476 400L440 436L324 320C276 276 200 276 156 320L80 396V120C80 96 96 80 120 80H680C704 80 720 96 720 120V476Z" fill="#D9D9D9"/>
        </svg>`;
        if (this.logoType == "footer") {
            return html`

            <style>
                .logo {
                    display: flex;
                    align-items: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

                    
                }
                .logoImg {
                    margin-right: 10px;
                }
                h3 {
                    font-size: 1.75rem;
                    margin:0 0;
                    color: ${STYLESKEY['colors']['default'][this.titleColor]['value']};
                }
                span {
                    font-size: .85rem;
                    color: ${STYLESKEY['colors']['default'][this.taglineColor]['value']};

                }
                a {
                    text-decoration:none;
                }
            </style>
            <div class="logo">
                <div class="logoImg">
                    <slot name="image"><svg width="50" height="50" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M460 160C428 160 400 188 400 220C400 252 428 280 460 280C492 280 520 252 520 220C520 188 492 160 460 160ZM680 0H120C52 0 0 52 0 120V680C0 748 52 800 120 800H680C748 800 800 748 800 680V120C800 52 748 0 680 0ZM720 476L644 400C596 356 520 356 476 400L440 436L324 320C276 276 200 276 156 320L80 396V120C80 96 96 80 120 80H680C704 80 720 96 720 120V476Z" fill="#D9D9D9"/>
                    </svg></slot>
                </div>
                <div class="title">
                    <a href="/">
                    <slot name="title">
                    <h3>Company Title</h3>
                    </slot>
                    <slot name="tagline">
                    <span>TAGLINE OR SUBTITLE</span>
                    </slot>
                    </a>
                </div>
            </div>
            `;
        } else {
            return html`

                    <style>
                        .logo {
                            display: flex;
                            align-items: center;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

                            
                        }
                        .logoImg {
                            margin-right: 10px;
                        }
                        h3 {
                            font-size: 2rem;
                            margin:0 0 5px;
                            color: ${STYLESKEY['colors']['default'][this.titleColor]['value']};
                        }
                        span {
                            font-size: 1.25rem;
                            color: ${STYLESKEY['colors']['default'][this.taglineColor]['value']};

                        }
                        a {
                            text-decoration:none;
                        }
                    </style>
                    <div class="logo">
                        <div class="logoImg">
                            <slot name="image"><svg width="75" height="75" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M460 160C428 160 400 188 400 220C400 252 428 280 460 280C492 280 520 252 520 220C520 188 492 160 460 160ZM680 0H120C52 0 0 52 0 120V680C0 748 52 800 120 800H680C748 800 800 748 800 680V120C800 52 748 0 680 0ZM720 476L644 400C596 356 520 356 476 400L440 436L324 320C276 276 200 276 156 320L80 396V120C80 96 96 80 120 80H680C704 80 720 96 720 120V476Z" fill="#D9D9D9"/>
                            </svg></slot>
                        </div>
                        <div class="title">
                            <a href="/">
                            <slot name="title">
                            <h3>Company Title</h3>
                            </slot>
                            <slot name="tagline">
                            <span>TAGLINE OR SUBTITLE</span>
                            </slot>
                            </a>
                        </div>
                    </div>
                    `;
        }

        
    }

}
    
