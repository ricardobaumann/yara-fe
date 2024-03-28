import React from "react";
import TransactionsForm from "../../components/transactions/form";
import {ApolloError, useMutation, useQuery} from "@apollo/client";
import {CREATE_TRANSACTIONS, LIST_TRANSACTIONS} from "../../graphschema/product";
import {TransactionsFormValues} from "../../components/transactions/form/types";
import {toast} from "react-toastify";
import TransactionsList from "../../components/transactions/list";

const WarehouseView = ()=> {
    const [addTransactions] = useMutation(CREATE_TRANSACTIONS);

    const save = (transactionsFormValues: TransactionsFormValues) => {
        addTransactions({
            variables : {
                warehouseId: transactionsFormValues.warehouse,
                transactions : [
                    {
                        amount: transactionsFormValues.amount,
                        productId: transactionsFormValues.product
                    }
                ]
            }
        }).then(value => {
            if (value.data) {
                toast(("Transaction created successfully"));
            } else {
                toast.error("Failed to create the transaction");
            }
        }).catch(reason => {
            console.log(reason);
            if (reason instanceof ApolloError) {
                toast.error("Transaction failed to be created: "+(reason as ApolloError).message);
            } else {
                toast.error("An unknown error occurred: "+reason.error);
            }
        })
    };
    return <>
        <p>Transactions</p>
        <TransactionsForm save={productFormValues => save(productFormValues)}/>
    </>
}

export default WarehouseView