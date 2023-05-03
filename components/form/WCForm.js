import { LitElement, html, css, unsafeCSS} from 'lit-element';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { WCButton } from '../../components/button/WCButton.js';
import  STYLESKEY from '../../global/global-var';


async function getData(url) {
    const response = await fetch(url);
    return response.json();
}
const CONFIGFILE = await getData('../../config.json');

//Get Theme from config
var theme = '';
if ('theme' in CONFIGFILE['components']['form']){
    var theme = CONFIGFILE['components']['form']['theme'];
} else if ('theme' in CONFIGFILE['global']){
  var theme = CONFIGFILE['global']['theme'];
} else {
    var theme = '';
    console.log('You have not chosen a theme, will revert to default');
}
//Get Default Styles
var styleSheet = null;
if (CONFIGFILE['components']['form'].hasOwnProperty('styleSheet')) {
    styleSheet = Object.assign(await getData(CONFIGFILE['components']['form']['styleSheet']));
} else {
    styleSheet = await getData('../components/form/json/default.json');
}

//Get Custom Styles
var customStyleSheet = null;
if ('customstyles' in CONFIGFILE['components']['form']) {
    customStyleSheet = Object.assign(await getData(CONFIGFILE['components']['form']['customstyles']));
} else {
    customStyleSheet = null;
}

//Get Forms
var getForms = null;
if (CONFIGFILE['components']['form'].hasOwnProperty('forms')) {
    getForms =  Object.assign(await getData(CONFIGFILE['components']['form']['forms']));
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

export class WCForm extends LitElement {
    static get properties() {
        return {
            name: { type: String },
            email: { type: String },
            styleType: { type: String},
            formInfo: { type: String}
        };
    }

    constructor() {
        super();
        this.name = '';
        this.email = '';
        this.styleType = 'default';
        this.formInfo = 'newsletter';
    }

    render() {
        var formStyles = "";
        console.log(styleSheet[this.styleType]);
    
        Object.keys(styleSheet[this.styleType]).forEach(selector => {
            var properties = styleSheet[this.styleType][selector];
            Object.keys(properties).forEach(property => {
                formStyles += `${selector} { ${property}: ${properties[property]}; }\n`;
            });
        });
        var formHTML = '';
        Object.keys(getForms[this.formInfo]).forEach(selector => {
            console.log(getForms[this.formInfo][selector]["type"]);

            var properties = getForms[this.formInfo][selector];

            if (properties["type"] === "checkbox"){
                formHTML += `<div class="form-item">
                                <label class="form-control">
                                    <input type="checkbox" name="checkbox" ${properties['required'] ? 'required' : ''} checked=${properties['name']} />
                                    ${selector}
                                </label>
                            </div>
                            </br>`;

            } else {
                formHTML += `<div class="form-item">
                                <label>
                                    ${selector}
                                </label>
                                </br>
                                <input type="${properties['type']}" ${properties['required'] ? 'required' : ''} autocapitalize="${properties['autocapitalize']}" autocorrect="${properties['autocorrect']}" .value=${properties['name']}>
                </div>`;
            }
          
        });
        return html`
            <style>${formStyles}</style>
            <form @submit=${this._handleSubmit}>
           ${unsafeHTML(formHTML)}
            <wc-button bgColor="blue" type="submit" @click=${this._handleSubmit}>Submit</wc-button>
            </form>

        `;
    }

    _handleInputChange(e) {
        const inputField = e.target;
        const propertyName = inputField.getAttribute('type') === 'text' ? 'name' : 'email';
        this[propertyName] = inputField.value;
    }

    _handleCheckboxChange(e) {
        this.agree = e.target.checked;
    }

    _handleSubmit(e) {
        e.preventDefault();
        const form = this.shadowRoot.querySelector("form");
        if (form.reportValidity()) {
            alert(`Hello, ${this.name}! Your Email is ${this.email} and you agree to the terms and conditions.`);
        } else {
            const invalidFields = form.querySelectorAll(':invalid');
            invalidFields.forEach((field) => {
                field.reportValidity();
            });
        }
    }
}
    
