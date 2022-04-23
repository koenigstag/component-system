import Main from './main.mjs';

loadStylesheet('/assets/css/app.css');

const [AppState, sub] = newState({
  path: window.location.pathname,
  test: 'test',
});

const onClickHandler = (e) => {
  e.preventDefault();
  history.replaceState('', null, e.target.href);
  AppState.path = new URL(e.target.href).pathname;
};

export default function App() {
  clearInterval(App.timer);
  App.timer = setInterval(() => AppState.test = Math.round(Math.random() * 1000000), 10);

  return html`
    <div>
      <input value=${sub('path')} />
      <a className="test-link" onclick="${onClickHandler}" href="${sub('test')}">${sub((state) => state.test)}</a>
      <${Main} testProp="123">test<//>
    </div>
  `;
}
