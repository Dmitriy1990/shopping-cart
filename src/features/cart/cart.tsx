import React from "react";
import styles from "./cart.module.scss";
import clsx from "clsx";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getTotalPrice,
  removeFromCart,
  updateQuantity,
  checkoutCart,
} from "./cartSlice";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  const errorMessage = useAppSelector((state) => state.cart.errorMessage);

  function onQuantityChanged(
    e: React.FocusEvent<HTMLInputElement>,
    id: string
  ) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ id, quantity }));
  }

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
  }

  const tableClasses = clsx({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === "ERROR",
    [styles.checkoutLoading]: checkoutState === "LOADING",
  });

  return (
    <div className="container">
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([id, quantity]) => (
            <tr key={id}>
              <td>{products[id].name}</td>
              <td>
                <input
                  aria-label={`Update ${products[id].name} quantity`}
                  type="text"
                  className={styles.input}
                  defaultValue={quantity}
                  onBlur={(e) => onQuantityChanged(e, id)}
                />
              </td>
              <td>${products[id].price}</td>
              <td>
                <button
                  onClick={() => dispatch(removeFromCart(id))}
                  aria-label={`Remove ${products[id].name} from Shopping Cart`}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total} data-testid="total">
              ${totalPrice}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={onCheckout}>
        {checkoutState === "ERROR" && errorMessage ? (
          <p className={styles.errorBox}>{errorMessage}</p>
        ) : null}
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </div>
  );
};
