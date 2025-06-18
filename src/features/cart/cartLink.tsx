import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getNumItems } from "./cartSlice";
import styles from "./cartLink.module.scss";

export function CartLink() {
  const numItems = useAppSelector(getNumItems);
  return (
    <Link className={styles.link} to="/cart">
      <span className={styles.text}>
        🛒&nbsp;&nbsp;{numItems ? numItems : "Cart"}
      </span>
    </Link>
  );
}
