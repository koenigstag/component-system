import htm from 'https://unpkg.com/htm?module';
import App from './app.mjs';

window.html = htm.bind(h);

const container = document.querySelector("#app-root");

container.append(App());
