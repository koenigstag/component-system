function App() {
  const hClass = new HeaderClass();
  return [hClass.redraw(), Header(), Main()];
}

document.body.append(...App());
