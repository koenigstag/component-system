import { makeStyles } from '../../../libs/module.css.mjs';

export const useProductCardStyles = makeStyles((props) => (`
  .productCard {
    background-color: rgba(var(--body-bg), 0.3);
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
    flex: 1 1 20%;
    overflow: hidden;
    min-height: 350px;
  }

  .productCard img {
    height: 150px;
    width: 100%;
    margin: 20px 0;
    object-fit: cover;
    object-position: center;
  }

  .productCard h6 {
    font-size: 0.8rem;
  }

  .productCard p {
    font-size: 1rem;
  }

  .productCard p span:first-of-type {
    color: grey;
    text-decoration: solid line-through grey;
  }

  .productCard p span:last-of-type {
    font-size: 1.4rem;
    ${props?.product?.price.current <= 14000 ? 'color: red;' : ''}
  }

  .productCard > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .productCard > div > button:first-of-type {
    text-transform: uppercase;
    padding: 10px 40px;
    background-color: dodgerblue;
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 3px;
  }

  .productCard > div  button:last-of-type {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
  }
`));
