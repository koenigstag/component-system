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


// import and run less compiler
const lessCompiler =  document.createElement('script');
lessCompiler.src = 'https://cdn.jsdelivr.net/npm/less@4';
document.body.append(lessCompiler);
