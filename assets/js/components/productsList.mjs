import { Component, Fragment } from '../Component.mjs';
import { loadProducts } from '../api.mjs';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      test: [],
    };
    this.generateReactiveTree();
  }

  componentDidMount() {
    this.registerReactiveHandler('products', '&', (elem, value, state) => {
      elem.replaceWith(this._diffElement);
    });

    loadProducts().then(({ data: products }) => {
      this.setState(state => { state.products = products; return state; });
    });

    setTimeout(() => this.setState((state) => {
      state.test = ['1'];
      return state;
    }));
  }

  render() {
    const articles = this.state.products.map(prod => {
      const articleElem = new Fragment('article', { children: [JSON.stringify(prod)] }).rootElement;
      
      return articleElem;
    });
    
    const sectionElem = new Fragment('section', { children: [...articles] }).rootElement;
    return sectionElem;
    // return 'test';
  }
}

export default ProductsList;
