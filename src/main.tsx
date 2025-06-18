import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { router } from "./app/routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
