
import { render } from "@testing-library/react";
import App from "./App";

test("test", () => {
  expect(2 + 3).toBe(5);
});

test("Renders the main page", () => {
  render(<App />);

});
