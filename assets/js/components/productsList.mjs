import { loadProducts } from "../api.mjs";

class ProductsList extends hyperHTML.hyper.Component {
  get defaultState() {
    return {
      products: [],
    };
  }

  constructor(props) {
    super(props);

    setTimeout(() => this.componentDidMount());
  }

  componentDidMount() {
    loadProducts().then(({ data: products }) => {
      this.setState((state) => ({ ...state, products }));
    });
  }

  render() {

    const { products } = this.state;

    return this.html`
      <section>
        ${products.map(
          // wiring list element to object will save it for next renders until object change
          (prod) => hyperHTML.wire(prod)`
            <article>
              ${JSON.stringify(prod)}
            </article>
          `
        )}
      </section>
    `;
  }
}

export default ProductsList;
