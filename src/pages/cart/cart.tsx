import { Cart } from "@/features/cart/cart";
import { Layout } from "@/shared/components/layout/layout";

export const CartPage = () => {
  return (
    <Layout>
      <main className="container">
        <h1>Cart</h1>
        <Cart />
      </main>
    </Layout>
  );
};
