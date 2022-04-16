import Header from "./components/header.mjs";
import Main from "./components/main.mjs";

class App extends hyperHTML.hyper.Component {
  get defaultState() {
    return { children: [] };
  }

  constructor(props) {
    super(props);
    setTimeout(() => this.componentDidMount());
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      children: [...state.children, new Header(), new Main()],
    }));
  }

  render() {

    const { children } = this.state;

    return this.html`<app>
      ${children}
    </app>`;
  }
}

hyperHTML.hyper(document.querySelector("#app-root"))`${new App()}`;
