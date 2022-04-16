import { Component, rootDOM } from './Component.mjs';
import Header from './components/header.mjs';
import Main from './components/main.mjs';

class App extends Component {
  render() {
    const div = Component.createFragment('app', { children: [new Header(), new Main()] })
    return div;
  }
}

rootDOM("app-root", new App());
