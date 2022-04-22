
const Appstate = reactiveObj({
  test: 'test',
});

function App() {
  return h(
    'div',
    {
      id: "main",
    },
      'test',
      h('p',
      {
        className: s(Appstate, 'test'),
      },
      h('span', null, 'content'),
    ),
  );
}

setInterval(() => Appstate.test = Math.random(), 100);
