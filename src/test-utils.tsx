import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Product } from "./app/api";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { getStoreWithState } from "./app/store"; // замените на свой путь
import type { RootState } from "./app/store"; // или откуда берется RootState
import type { RouteObject } from "react-router-dom";

interface RenderWithContextOptions {
  state?: RootState;
  initialEntries?: string[];
  routes?: RouteObject[];
}

export function renderWithContext({
  state,
  initialEntries = ["/"],
  routes,
}: RenderWithContextOptions) {
  const store = getStoreWithState(state);

  if (!routes) {
    throw new Error("renderWithContext: 'routes' must be provided.");
  }

  const router = createMemoryRouter(routes, {
    initialEntries,
  });

  const utils = render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  return {
    store,
    router,
    ...utils,
  };
}


export function getStateWithItems(
  items: Record<string, number>,
  products: Record<string, Product> = {}
): RootState {
  const state: RootState = {
    products: { products: {} },
    cart: {
      checkoutState: "READY",
      errorMessage: "",
      items,
    },
  };
  return state;
}
