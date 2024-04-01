export interface TransactionsFormParams {
    save: (productFormValues: TransactionsFormValues) => any
}

export interface TransactionsFormValues {
    warehouse: string,
    product: string,
    amount: number,
    transactionDate: Date
}