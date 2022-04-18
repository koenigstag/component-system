import { Component } from "../../Component.mjs";
import ProductsList from "../ProductList/index.mjs";

class Main extends Component {
  get defaultState() {
    return { timer: 0, children: [] };
  }

  componentDidMount() {
    // saving instance to class field
    this.setState((state) => ({
      ...state,
      children: [...state.children, new ProductsList()],
    }));
  }

  render() {
    const { timer, children } = this.state;

    return this.html`
      <div class="container">
        <main class="content-box main-content">
          ${children}
        </main>
      </div>
    `;
  }
}

export default Main;
