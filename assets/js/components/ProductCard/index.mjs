import { Component } from "../../Component.mjs";
import { useProductCardStyles } from './ProductCard.styles.js';

const imageSrc = (code) => `https://github.com/fd-freshjs/serve-json/raw/main/assets/images/mebel/${code}.png`;

export const IProduct = Yup.object({
  name: Yup.string().required(),
  code: Yup.string().required(),
  price: Yup.object(({
    old: Yup.number().positive(),
    current: Yup.number().positive().required(),
  })),
});

export const IProductCard = Yup.object({
  product: IProduct,
});

class ProductCard extends Component {
  static propTypes = IProductCard;

  heartHTML = `<svg fill="purple" width="24" height="24" viewBox="0 0 24 24"><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>`;

  buyBtnHandler() {
    
  }

  favBtnHandler() {
    
  }

  render() {
    const { product: { name, code, price } } = this.props;

    const classNames = useProductCardStyles(this.props);

    return this.html`
      <card class="${classNames.productCard} d-flex flex-column">
        <a href="${`/product/?code=${code}`}">
          <img src="${imageSrc(code)}" />
        </a>
        <h6>
            ${name}
          </a>
        </h6>
        <p>
          <span>${price.old} руб.</span>
          <span>${price.current} руб.</span>
        </p>
        <div>
          <button onclick="${this.buyBtnHandler}">купить</button>
          <button onclick="${this.favBtnHandler}">
            ${{ html: this.heartHTML }}
          </button>
        </div>
      </card>
    `;
  }
}

export default ProductCard;
