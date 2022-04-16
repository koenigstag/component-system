import { Component } from '../Component.mjs';
import ProductsList from './productsList.mjs';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timer: 0,
    };
  }

  componentDidMount() {
    setInterval(this.handleMainTimer, 1000);
  }

  handleMainTimer = () => {
    this.setState(state => ({ ...state, timer: state.timer + 1 }));
  };

  render () {
    const mainElem = Component.createFragment('main', {
      children: [this.state.timer, new ProductsList()],
    });

    return mainElem;
  }
}

export default Main;
