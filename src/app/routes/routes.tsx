import { createBrowserRouter } from "react-router-dom";
import { routes } from "../constants/routes";
import { Home } from "@/pages/home";
import { Products } from "@/pages/products";

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
  },
  {
    path: routes.products,
    element: <Products />,
  },
]);
