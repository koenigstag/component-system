import { Component, Fragment, rootDOM } from './Component.mjs';
import Header from './components/header.mjs';
import Main from './components/main.mjs';

class App extends Component {
  render() {
    const div = new Fragment('app', { children: [new Header(), new Main()] }).rootElement;
    return div;
  }
}

rootDOM("app-root", new App());
