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

//Get socialmedias
var getsocialmedias = null;
if (CONFIGFILE['components']['socialmedia'].hasOwnProperty('socialmedias')) {
    getsocialmedias =  Object.assign(await getData(CONFIGFILE['components']['socialmedia']['socialmedias']));
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

export class WCSocialMedia extends LitElement {
    static get properties() {
        return {
            direction: { type: String},
            mediaList: { type: String},
            size: { type: Number},
            iconColor: { type: String},
            containerDirection: { type: String},
        };
    }

    constructor() {
        super();
        this.socialmediaType = "header";
        this.mediaList = 'sample';
        this.size = 40;
        this.iconColor = 'black';
        this.containerDirection = 'horizontal';
    }
    static get styles() {
    }

    render() {
        console.log(STYLESKEY);
        console.log(getsocialmedias);
        var socialMediaHTML = '<div class="container">';
        Object.keys(getsocialmedias[this.mediaList]).forEach(selector => {
            socialMediaHTML += `<div class="icon"><a href="${getsocialmedias[this.mediaList][selector]['linkURL']}">${getsocialmedias[this.mediaList][selector]["icon"]}</a></div>`;
        });
        socialMediaHTML += `</div>`;


        if(this.iconColor in STYLESKEY['colors']['default']){
            var colorIcon = STYLESKEY['colors']['default'][this.iconColor]['value'];
        } else {
            var colorIcon = 'black';
        }
        if (this.containerDirection !== 'vertical') {
            var direction = `.container {
                display:flex;
                align-items: center;
            }
            .icon {
                margin-right: 5px;
            }
            `
        } else {
            var direction = ''
        }
        console.log(direction)

        console.log(socialMediaHTML);
        return html`
            <link href="../global/fontawesome/css/fontawesome.css" rel="stylesheet">
            <link href="../global/fontawesome/css/brands.css" rel="stylesheet">
            <link href="../global/fontawesome/css/solid.css" rel="stylesheet">
                     <style>

                        a {
                            text-decoration:none;
                        }
                        ${direction} 
                        i {
                            font-size: ${this.size}px;
                            color: ${colorIcon};
                        }
                        
                        img {
                            height: ${this.size - 5.5}px;
                            width: 100%;
                            margin-top: 3px;
                        }
                    </style>
                    ${unsafeHTML(socialMediaHTML)}

                    `;

        
    }

}
    
