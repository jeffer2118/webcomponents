import { html, css, LitElement, unsafeCSS } from 'lit';


export class WCCard extends LitElement {
  static get properties() {
    return {
      cardType: { type: String },
      cardWidth: { type: String },
    };
  }
  constructor() {
    super();
    this.cardWidth = '25%';
  }
  render() {
    if (this.cardType === 'overlay'){
      this.standardCSS = css`
      :host {
          position: relative;
          width: ${unsafeCSS(this.cardWidth)};
          height: fit-content;

      }

      #media {
        height: 100%;
      }
      #media ::slotted(*) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 1;
      }

      /* Default styles for content */
      #content {
        top: 0;
        left: 0;
        position: absolute;
        padding: 48px;
        font-family: sans-serif;
        color: black;
        font-size: 24px;
        z-index:9999;
      }
      .content {
          position:absolute;
      }
      #content > slot::slotted(*) {
        margin: 0;
      }
      h1 {
        font-size: 15px;
      }
    `;
    } else {
      this.standardCSS = css`
      :host {
          position: relative;
          width: ${unsafeCSS(this.cardWidth)};
          height: fit-content;
      }

      #media {
        height: 100%;
      }
      #media ::slotted(*) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 1;
      }

      /* Default styles for content */
      #content {
        padding: 48px;
        font-family: sans-serif;
        color: black;
        font-size: 24px;
        z-index:9999;
      }
      .content {
      }
      #content > slot::slotted(*) {
        margin: 0;
      }
      h1 {
        font-size: 15px;
      }
    `;
    }


  // Custom addition to CSS
    // this.standardCSS += css`
    //   #content {
    //     color: red;
    //   }
    // `;
    return html`
      <style>${this.standardCSS}</style>
      <div id="media">
        <slot name="media"></slot>
      </div>
      <div id="content">
        <slot></slot>
      </div>
    `;
  }
}