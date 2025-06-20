import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { receivedProducts } from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import { getProducts } from "../../app/api";
import styles from "./products.module.scss";

export function ProductsComponent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getProducts().then((products) => {
      dispatch(receivedProducts(products));
    });
  }, []);

  const products = useAppSelector((state) => state.products.products);
  return (
    <main className="page">
      <p>Hello</p>
      <ul className={styles.products}>
        {Object.values(products).map((product) => (
          <li key={product.id}>
            <article className={styles.product}>
              <figure>
                <img src={product.imageURL} alt={product.imageAlt} />
                <figcaption className={styles.caption}>
                  {product.imageCredit}
                </figcaption>
              </figure>
              <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button
                  aria-label={`Add ${product.name} to cart`}
                  onClick={() => dispatch(addToCart(product.id))}
                >
                  Add to Cart 🛒
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
