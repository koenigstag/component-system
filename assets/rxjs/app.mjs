
const Appstate = reactiveObj({
  test: 'test',
});

const sub = (field) => s(Appstate, field);

export default function App() {
  return html`
    <a href="${sub('test')}">${sub('test')}</a>
  `;
}

setInterval(() => Appstate.test = Math.random(), 10);
