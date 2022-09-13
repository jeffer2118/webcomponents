import { html, css, LitElement, unsafeCSS } from 'lit';
export class WCContentContainer extends LitElement {
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

  constructor() {
    super();
    this.title = 'Hey there';
    this.verttext = '';
    this.styleType = '';
    this.styleGuide = '';
    
  }

  render() {
    this.standardCSS = css`
    :host {
      display: flex;

    }
    wc-container {
      display: flex;
    }
    slot {
      display:flex;
    }
    `;

    return html`
    <style>${this.standardCSS}</style>

    <div class="container">
    <slot></slot>
    </div>
    `;
  }
}
