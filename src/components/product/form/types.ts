export interface ProductFormParams {
    save: (productFormValues: ProductFormValues) => any
}

export interface ProductFormValues {
    productName: string,
    productType: string,
    sizePerUnit: number
}