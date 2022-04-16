import { Component, Fragment } from '../Component.mjs';
import ProductsList from './productsList.mjs';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
    };
    this.generateReactiveTree();
  }

  componentDidMount() {
    // setInterval(this.handleMainTimer, 1000);
    // this.registerReactiveHandler('timer', '&', 'innerText');
  }

  handleMainTimer = () => {
    this.setState(state => { state.timer += 1; return state; });
  };

  render () {
    const mainElem = new Fragment('main', {
      children: [new ProductsList()],
    }).rootElement;

    return mainElem;
  }
}

export default Main;
