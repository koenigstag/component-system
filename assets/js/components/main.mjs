import ProductsList from "./productsList.mjs";

class Main extends hyperHTML.hyper.Component {
  get defaultState() {
    return { timer: 0, children: [] };
  }

  constructor(props) {
    super(props);
    setTimeout(() => this.componentDidMount());
  }

  componentDidMount() {
    setInterval(this.handleMainTimer, 1000);
    // saving instance to class field
    this.setState((state) => ({
      ...state,
      children: [...state.children, new ProductsList()],
    }));
  }

  handleMainTimer = () => {
    this.setState((state) => ({ ...state, timer: state.timer + 1 }));
  };

  render() {

    const { timer, children } = this.state;

    return this.html`
      <main>
        ${timer}
        ${children}
      </main>
    `;
  }
}

export default Main;
