import { Component } from '../Component.mjs';
import { loadProducts } from '../api.mjs';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    loadProducts().then(({ data: products }) => {
      this.setState(state => ({ ...state, products }));
    });
  }

  render() {
    const sectionElem = document.createElement('section');
    const articles = []
    for (const prod of this.state.products) {
      const articleElem = document.createElement('article');

      const card = JSON.stringify(prod);

      articleElem.append(card);
      articles.push(articleElem);
    }
    sectionElem.append(...articles);

    return sectionElem;
  }
}

export default ProductsList;
