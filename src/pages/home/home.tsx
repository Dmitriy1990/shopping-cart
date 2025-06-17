import { Layout } from "@/shared/components/layout/layout";

export const Home = () => {
  return (
    <Layout>
      <main className="container">
        <h1>Welcome to the Store</h1>
        <figure>
          <img src="/store.jpg" alt="Store" width="800" />
        </figure>
      </main>
    </Layout>
  );
};
