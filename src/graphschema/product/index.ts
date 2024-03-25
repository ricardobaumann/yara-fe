import {gql} from "@apollo/client";

export const CREATE_PRODUCT = gql(`
    mutation CreateProduct($productName: String!, $productType: ProductType!) {
      createProduct(productName: $productName, productType: $productType) {
        id
      }
    }
`);

export const GET_PRODUCTS = gql(`
    query GetProducts {
      getProducts {
        id
        productName
        productType
      }
    }
`)