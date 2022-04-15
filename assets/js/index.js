function App() {
  const hClass = new HeaderClass();
  return [hClass.redraw(), Main()];
}

document.body.append(...App());
