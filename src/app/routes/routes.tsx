import { createBrowserRouter } from "react-router-dom";
import { routes } from "../constants/routes";
import { Home } from "@/pages/home";
import { Products } from "@/pages/products";
import { CartPage } from "@/pages/cart/cart";

export const allRoutes =[ {
  path: routes.home,
  element: <Home />,
},
{
  path: routes.products,
  element: <Products />,
},
{
  path: routes.cart,
  element: <CartPage />,
},]

export const router = createBrowserRouter(allRoutes);
