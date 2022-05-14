import { Component } from "./Component.mjs";
import Header from "./components/Header/index.mjs";
import Main from "./components/Main/index.mjs";

class App extends Component {
  get defaultState() {
    return { children: [] };
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      children: [...state.children, new Header(), new Main()],
    }));
  }

  render() {
    const { children } = this.state;

    return this.html`<app class="d-flex flex-col flex-grow-1">
      ${children}
    </app>`;
  }
}

hyperHTML.hyper(document.querySelector("#app-root"))`${new App()}`;
