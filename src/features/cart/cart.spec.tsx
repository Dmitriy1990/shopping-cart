import { screen } from "@testing-library/react";
import { renderWithContext, getStateWithItems } from "../../test-utils";

import * as api from "@/app/api";
import { allRoutes } from "@/app/routes/routes";
import { routes } from "@/app/constants/routes";
import { Cart } from "./cart";
import { RootState } from "@/app/store";

const mockProductId = "207";

const mockState: RootState = {
  products: {
    products: {
      [mockProductId]: {
        name: "Test Product",
        price: 11,
        description:
          "This cluster of delicious bananas will keep your hunger down while filling you with nutritious potassium. ",
        imageURL:
          "https://live.staticflickr.com/7013/6612824761_3f66a93c71_b.jpg",
        imageAlt: "A single bunch of 4 yellow bananas connected toegher",
        imageCredit:
          '"Bananas (edited)" by 24oranges.nl is licensed under CC BY-SA 2.0',
        id: "207",
      },
    },
  },
  cart: {
    items: {
      [mockProductId]: 1,
    },
    checkoutState: "READY",
    errorMessage: "",
  },
};

test("Cart should display correct total", () => {
  const state = getStateWithItems(
    mockState.cart.items,
    mockState.products.products
  );

  renderWithContext({
    state,
    element: <Cart />,
  });

  const total = screen.getByTestId("total");
  expect(total).toHaveTextContent("$11");
});
