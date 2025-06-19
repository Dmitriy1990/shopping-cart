import { renderWithContext } from "@/test-utils";
import { screen, waitFor } from "@testing-library/react";
import * as api from "@/app/api";
import mockProducts from "../../../public/products.json";
import userEvent from "@testing-library/user-event";
import { routes } from "@/app/constants/routes";
import { allRoutes } from "@/app/routes/routes";

const getProductsSpy = jest.spyOn(api, "getProducts");
getProductsSpy.mockResolvedValue(mockProducts);

test("several products should be listed", async () => {
  renderWithContext({
    routes: allRoutes,
    initialEntries: [routes.products],
  });

  await waitFor(() => expect(getProductsSpy).toHaveBeenCalledTimes(1));

  const articles = screen.getAllByRole("article");
  expect(articles.length).toEqual(mockProducts.length);
});

test("Each product should contain a heading", async () => {
  renderWithContext({
    routes: allRoutes,
    initialEntries: [routes.products],
  });

  for (let product of mockProducts) {
    await screen.findByRole("heading", { name: product.name });
  }
});

test("should be able to add a headphones to cart", async () => {
  const { store } = renderWithContext({
    routes: allRoutes,
    initialEntries: [routes.products],
  });
  const button = await screen.findByLabelText(/Add Headphones/i);

  await userEvent.click(button);
  expect(store.getState().cart.items["300"]).toEqual(1);
  await userEvent.click(button);
  await userEvent.click(button);
  expect(store.getState().cart.items["300"]).toEqual(3);
});
