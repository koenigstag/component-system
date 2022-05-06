// bind createElement to reactiveHTML h function
window.html = htm.bind(h);

import App from './app.mjs';
loadStylesheet('/assets/css/index.css');

const container = document.querySelector("#app-root");

container.append(App());
