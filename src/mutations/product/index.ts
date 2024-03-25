import {gql} from "@apollo/client";

const CREATE_PRODUCT = gql(`
    mutation CreateProduct($productName: String!, $productType: ProductType!) {
      createProduct(productName: $productName, productType: $productType) {
        id
      }
    }
`);

export default CREATE_PRODUCT