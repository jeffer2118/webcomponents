import { html, css, LitElement, unsafeCSS } from 'lit';
async function getData(url) {
  const response = await fetch(url);

  return response.json();
}

const DEFAULTSTYLES = await getData('../components/hero/json/sample.json');
const USFSDEFAULT = await getData('../components/hero/json/usfs_figma.json');
export class WCParagraph extends LitElement {

//define properties type
  static get properties() {
    return {
      title: { type: String },
      styleType: { type: String },
      fontColor: { type: String },
      fontFamily: { type: String},
      lineHeight: { type: String},
      fontWeight: { type: String},
      fontSize: { type: String},
      letterSpacing: { type: String},
      paragraphSpacing: { type: String }
    };
  }
  
//define default property value is none
  constructor() {
    super();
    this.styleType = '';
    this.usfsStyles = '';
    this.styleGuide = '';
    this.fontColor = 'USFS Off White';
    this.fontFamily = 'public-sans';
    this.lineHeight = '0';
    this.fontWeight = 'public-sans-1';
    this.fontSize = '0';
    this.letterSpacing = '0';
    this.paragraphSpacing = '0';
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

    console.log(this.fontFamilies)
    console.log(this.colorsUSFS);
    var defaultStyle = '';
    var customStyle = '';
    Object.keys(this.colorsUSFS).forEach( key => {
      console.log(key);
    }
    );

    this.stylesDefault.forEach(function(element) {
      Object.keys(element).forEach(function(key) {
        cssStyle = cssStyle + `${key}: ${unsafeCSS(element[key])};`;
      });
    });
    
    // CSS Defined
    this.standardCSS = css`
    .hero{
      ${unsafeCSS(cssStyle)}
    }
    :host {
      display: block;
      color: var(--sand-box-text-color, #000);

    }
    
    ::slotted(h1) {
      ${unsafeCSS(this.colorsUSFS[this.fontColor].type)}: ${unsafeCSS(this.colorsUSFS[this.fontColor].value)};
      font-family: ${unsafeCSS(this.fontFamilies[this.fontFamily].value)};
      line-height: ${unsafeCSS(this.lineHeights[this.lineHeight].value)};
      font-weight: ${unsafeCSS(this.fontWeights[this.fontWeight].value)};
      letter-spacing: ${unsafeCSS(this.letterSpacings[this.letterSpacing].value)};
    }
    h1 {
      font-size: ${unsafeCSS(this.fontSizes[this.fontSize].value)}px;
      line-height: ${unsafeCSS(this.lineHeights[this.lineHeight].value)};
      margin-bottom: 0;

    }
    h2 {
      margin-top:0px;
      font-size: 2.5rem;
    }
    `;
    
    // returns html
    return html`
    <style>${this.standardCSS}</style>
        <div class="text-container">
         <slot></slot>
        </div>
    `;
  }
}
