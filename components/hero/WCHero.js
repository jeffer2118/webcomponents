import { html, css, LitElement, unsafeCSS } from 'lit';
export class WCHero extends LitElement {
//define properties type
  static get properties() {
    return {
      title: { type: String },
      subtitle: { type: String },
      imgsrc: { type: String },
      verttext: { type: String},
      horizontaltext: { type: String},
      styleType: { type: String }
    };
  }
//define default property value is none
  constructor() {
    super();
    this.title = 'Hey there';
    this.subtitle = 'welcome'
    this.verttext = '';
    this.styleType = '';
    this.styleGuide = '';
  }

  //renders to html
  render() {
    // CSS Defined
    this.standardCSS = css`:host {
      display: block;
      color: var(--sand-box-text-color, #000);
    }
    .hero {
      width: calc(100% - 40px);
      min-height: 50vh;
      display: flex;
      align-items: ${unsafeCSS(this.verttext)};
      justify-content: ${unsafeCSS(this.horizontaltext)};
      padding:20px;
      background-position: center center;
      background-size: cover;

    }
    .text-container {
      color: white;

    }
    h1 {
      font-size: 4rem;
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
      <div class="hero" style="background-image: url(${this.imgsrc})">
        <div class="text-container">
          <h1 class="title">${this.title}</h1>
          <h2> ${this.subtitle}</h2>
        </div>
      </div>   
    `;
  }
}
