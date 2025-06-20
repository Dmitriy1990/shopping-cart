import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Product } from "./app/api";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { getStoreWithState } from "./app/store";
import type { RootState } from "./app/store";
import type { RouteObject } from "react-router-dom";

interface RenderWithContextOptions {
  state?: RootState;
  initialEntries?: string[];
  routes?: RouteObject[];
  element?: React.ReactElement;
}

export function renderWithContext({
  state,
  initialEntries = ["/"],
  routes,
  element,
}: RenderWithContextOptions) {
  const store = getStoreWithState(state);

  let router;

  if (routes) {
    router = createMemoryRouter(routes, {
      initialEntries,
    });
  } else if (element) {
    router = createMemoryRouter(
      [
        {
          path: "*",
          element,
        },
      ],
      { initialEntries }
    );
  } else {
    throw new Error(
      "renderWithContext: either 'routes' or 'element' must be provided."
    );
  }

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
    products: {
      products,
    },
    cart: {
      checkoutState: "READY",
      errorMessage: "",
      items,
    },
  };
  return state;
}
