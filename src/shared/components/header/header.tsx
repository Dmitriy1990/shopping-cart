import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import { routes } from "@/app/constants/routes";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <Link to={routes.home} className={styles.logo}>
            logo
          </Link>
          <nav className={styles.nav}>
            <Link to={routes.home} className={styles.nav__link}>
              Home
            </Link>
            <Link to={routes.products} className={styles.nav__link}>
              Products
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
