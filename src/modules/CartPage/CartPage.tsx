import style from './CartPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { ProductInCart } from '../../components/ProductInCart';
import { useContext } from 'react';
import { CartContext } from '../../store/CartProvider';
import emptyCard from '../../assets/img/cart-is-empty.png';

export const CartPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const getSum = () => {
    return cart.reduce((acc, val) => acc + val.price * (val.inCart || 1), 0);
  };

  const getLengthOfCart = () => {
    return cart.reduce((acc, val) => acc + (val.inCart || 1), 0);
  };

  return (
    <div className={style.cartPage}>
      <div className={style.backButton} onClick={() => navigate(-1)}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </div>

      {!cart.length && (
        <div className={style.emptyCard}>
          <h1 className={style.emptyCard__title}>Your cart is empty</h1>
          <img
            src={emptyCard}
            alt="Empty Cart"
            className={style.emptyCard__img}
          />
        </div>
      )}

      {!!cart.length && (
        <>
          <h1 className={style.title}>Cart</h1>

          <div className={style.main}>
            {cart.map(prod => (
              <div className={style.card} key={prod.id}>
                <ProductInCart prod={prod} />
              </div>
            ))}
          </div>

          <div className={style.checkout}>
            <div className={style.checkout__items}>
              <h2 className={style.checkout__items__price}>${getSum()}</h2>
              <p className={style.checkout__items__total}>
                Total for {getLengthOfCart()} items
              </p>
            </div>
            <div className={style.checkout__divider} />
            <button
              className={style.checkout__button}
              onClick={() => alert('Checkout is not implemented yet =(')}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};
