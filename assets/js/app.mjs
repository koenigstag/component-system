import ComponentLabel from './componentLabel.mjs';
import Footer from './footer.mjs';
import Header from './header.mjs';
import Main from './main.mjs';

loadStylesheet('/assets/css/app.css');

export const [AppState, sub] = newState({
  path: window.location.pathname,
  test: 'test',
});

const onClickHandler = (e) => {
  e.preventDefault();
  // history.replaceState('', null, e.target.href);
  AppState.path = new URL(e.target.href).pathname;
};

const changeHandler = (e) => {
  AppState.path = e.target.value;
}

export default function App() {
  clearInterval(App.timer);
  App.timer = setInterval(() => AppState.test = Math.round(Math.random() * 1000000), 100);

  return html`
    <div style="padding: 20px 30px; border: 1px solid green">

      <!-- component -->
      <!-- simple prop -->
      <${ComponentLabel} label="app" />

      <!-- children prop -->
      <${Header}>children<//>

      <!-- onclick event -->
      <!-- subscribe for notification: two variants -->
      <div>
        Link => 
        <a className="test-link" onclick="${onClickHandler}" href="${sub('test')}">
          ${sub((state) => "'" + state.test + "'")}
        </a>
      </div>
      <label>
        <span>Link click href:</span>
        <!-- controlled input -->
        <input style="${{ 'margin-left': '20px', }}" value=${sub('path')} oninput=${changeHandler} />
      </label>

      <!-- subscribe prop for notification -->
      <${Main} testProp="${sub('path')}">test<//>

      <!-- context example - see Footer component -->
      <${Footer} />
    </div>
  `;
}
