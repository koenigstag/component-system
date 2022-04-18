import { Component } from "../../Component.mjs";
import ProductCard from "../ProductCard/index.mjs";
import { loadProducts } from "../../api/api.mjs";

class ProductsList extends Component {
  get defaultState() {
    return {
      products: [],
    };
  }

  componentDidMount() {
    loadProducts().then(({ data: products }) => {
      this.setState((state) => ({ ...state, products }));
    });
  }

  render() {
    const { products } = this.state;

    return this.html`
      <div class="d-flex flex-wrap align-items-stretch">
        ${products.map(
          // wiring list element to object will save it for next renders until object change
          (prod) => hyperHTML.wire(prod)`${new ProductCard({ product: prod })}`
        )}
      </div>
    `;
  }
}

export default ProductsList;
