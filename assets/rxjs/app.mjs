import Main from './main.mjs';

loadStylesheet('/assets/css/app.css');

const [AppState, sub] = newState({
  test: 'test',
});

export default function App() {
  return html`
    <div>
      <a className="test-link" href="${sub('test')}">${sub((state) => state.test)}</a>
      <${Main} testProp="value">test<//>
    </div>
  `;
}

setInterval(() => AppState.test = Math.round(Math.random() * 1000000), 10);
