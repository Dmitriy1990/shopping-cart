import productsReducer ,{receivedProducts} from "./productsSlice"
import products from "../../../public/products.json"

describe("Products reducer",() => {
    it("should return the initial state when passed an empty action", () => {
        const initialState = undefined
        const action = {type: ""};
        const result = productsReducer(initialState,action)
        expect(result).toEqual({products: {}})
    })

    it("should convert the products received to an object", () => {
        const initialState = undefined;
        const action = receivedProducts(products)
        const result = productsReducer(initialState,action)
        products.forEach((product) => {
            expect(result.products[product.id]).toEqual(product);
          });
    })
})