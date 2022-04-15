import { Component } from '../Component.mjs';
import ProductsList from './productsList.mjs';

class Main extends Component {
  render () {
    const mainElem = document.createElement('main');

    mainElem.appendChild(ProductsList());

    return mainElem;
  }
}

export default Main;
