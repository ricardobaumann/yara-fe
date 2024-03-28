import {gql} from "@apollo/client";

export const CREATE_PRODUCT = gql(`
    mutation CreateProduct($productName: String!, $productType: ProductType!, $sizePerUnit: Int!) {
      createProduct(productName: $productName, productType: $productType, sizePerUnit: $sizePerUnit) {
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
        sizePerUnit
      }
    }
`)

export const GET_WAREHOUSES = gql(`
    query GetWarehouses {
      getWarehouses {
        id
        code
        capacity
        hazardous
        occupied
      }
    }
`)

export const LIST_TRANSACTIONS = gql(`
    query GetTransactions($warehouseId: String!) {
      getTransactions(warehouseId: $warehouseId) {
        id
        product_id
        amount
      }
    }
`)

export const CREATE_TRANSACTIONS = gql(`
    mutation CreateTransactions($warehouseId: String!, $transactions: [TransactionInput]!) {
      createTransactions(warehouseId: $warehouseId, transactions: $transactions)
    }`
)