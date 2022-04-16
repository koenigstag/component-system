import { h, render } from 'https://unpkg.com/preact?module';
import htm from 'https://unpkg.com/htm?module';

// Initialize htm with Preact
const html = htm.bind(h);

// component
function Header (props) {
  return html`<header>
    <h1>
      Hello World! Test ${props.test}
    </h1>
  </h1>`;
}

// component
function App (props) {
  return html`
  <div id="app">
    <${Header}
        test="1" // component props
    />
  </div>`;
}

render(html`<${App} />`, document.querySelector('h-with-htm'));