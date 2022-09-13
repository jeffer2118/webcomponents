import { SandBox } from './src/SandBox.js';
import { WCHero } from './components/hero/WCHero.js';
import { WCContentContainer } from './components/contentcontainer/WCContentContainer.js';
import { WCCard } from './components/card/WCCard.js';

window.customElements.define('sand-box', SandBox);
window.customElements.define('wc-hero', WCHero);
window.customElements.define('wc-container', WCContentContainer);
window.customElements.define('wc-card', WCCard);


