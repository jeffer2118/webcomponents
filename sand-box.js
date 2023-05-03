import { SandBox } from './src/SandBox.js';
import { WCHero } from './components/hero/WCHero.js';
import { WCContentContainer } from './components/contentcontainer/WCContentContainer.js';
import { WCCard } from './components/card/WCCard.js';
import { WCButton } from './components/button/WCButton.js';
import { WCList } from './components/list/WCList.js';
import { WCForm} from './components/form/WCForm.js';
import { WCLogo} from './components/logo/WCLogo.js';
import { WCSocialMedia} from './components/socialmedia/WCSocialMedia.js';



window.customElements.define('sand-box', SandBox);
window.customElements.define('wc-container', WCContentContainer);
window.customElements.define('wc-card', WCCard);
window.customElements.define('wc-button', WCButton);
window.customElements.define('wc-hero', WCHero);
window.customElements.define('wc-list', WCList);
window.customElements.define('wc-form', WCForm);
window.customElements.define('wc-logo', WCLogo);
window.customElements.define('wc-social-media', WCSocialMedia);


