import Header from './components/header.mjs';
import Main from './components/main.mjs';

function App() {
  return [new Header().redraw(), new Main().redraw()];
}

document.body.append(...App());
