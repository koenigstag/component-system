import Main from './main.mjs';

loadStylesheet('/assets/css/app.css');

const [AppState, sub] = newState({
  test: 'test',
});

export default function App() {
  clearInterval(App.timer);
  App.timer = setInterval(() => AppState.test = Math.round(Math.random() * 1000000), 10);

  return html`
    <div>
      <a className="test-link" href="${sub('test')}">${sub((state) => state.test)}</a>
      <${Main} testProp="123">test<//>
    </div>
  `;
}
