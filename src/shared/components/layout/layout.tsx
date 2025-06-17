import { FC, ReactNode } from "react";
import styles from "./layout.module.scss";
import { Header } from "../header/header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
};
