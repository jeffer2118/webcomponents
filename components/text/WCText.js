import { html, css, LitElement, unsafeCSS,} from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';

//Get Json Files Function
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

//Call JSON Files
const DEFAULTSTYLES = await getData('../components/text/json/sample.json');
const USFSDEFAULT = await getData('../components/text/json/usfs_figma.json');

export class WCText extends LitElement {

//define properties type
  static get properties() {
    return {
      header: {type: String },
      title: { type: String },
      styleType: { type: String },
      fontColor: { type: String },
      fontFamily: { type: String},
      lineHeight: { type: String},
      fontWeight: { type: String},
      fontSize: { type: String},
      letterSpacing: { type: String},
      paragraphSpacing: { type: String },
      textTypes: { type: String }
    };
  }
  
//define default property value is none
  constructor() {
    super();
    this.header = '1';
    this.styleType = '';
    this.usfsStyles = '';
    this.styleGuide = '';
    this.fontColor = 'USFS Off Black';
    this.fontFamily = 'public-sans';
    this.lineHeight = '0';
    this.fontWeight = 'public-sans-1';
    this.fontSize = '0';
    this.letterSpacing = '0';
    this.paragraphSpacing = '0';
    this.textTypes = 'h1';
  }

  //renders to html
  render() {
    this.stylesDefault = DEFAULTSTYLES.styles.hero;
    this.colorsUSFS = USFSDEFAULT['USFS Colors'];
    this.fontFamilies = USFSDEFAULT.fontFamilies;
    this.lineHeights = USFSDEFAULT.lineHeights;
    this.fontWeights = USFSDEFAULT.fontWeights;
    this.fontSizes = USFSDEFAULT.fontSize;
    this.letterSpacings = USFSDEFAULT.letterSpacing;
    this.paragraphSpacings = USFSDEFAULT.paragraphSpacing
    var cssStyle = '';
    var customStyle = '';
    Object.keys(this.colorsUSFS).forEach( key => {
      console.log(key);
    });


    this.stylesDefault.forEach(function(element) {
      Object.keys(element).forEach(function(key) {
        cssStyle = cssStyle + `${key}: ${unsafeCSS(element[key])};`;
      });
    });
    

    // Text Type extract
    let textOpeningTag = '<' + this.textTypes + '>';
    let textClosingTag = '</' + this.textTypes + '>';
    let htmlText = html`${unsafeHTML(textOpeningTag + '<slot></slot>' + textClosingTag)}`;

    // CSS Defined
    this.standardCSS = css`
      slot {
        ${unsafeCSS(this.colorsUSFS[this.fontColor].type)}: ${unsafeCSS(this.colorsUSFS[this.fontColor].value)};
        font-family: ${unsafeCSS(this.fontFamilies[this.fontFamily].value)};
        line-height: ${unsafeCSS(this.lineHeights[this.lineHeight].value)};
        font-weight: ${unsafeCSS(this.fontWeights[this.fontWeight].value)};
        letter-spacing: ${unsafeCSS(this.letterSpacings[this.letterSpacing].value)};
        font-size: ${unsafeCSS(this.fontSizes[this.fontSize].value)}px;
        line-height: ${unsafeCSS(this.lineHeights[this.lineHeight].value)};
      }`;
    
    // returns html
    return html`
    <style>${this.standardCSS}</style>
    ${htmlText}
    `;
  }
}
