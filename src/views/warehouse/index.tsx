import React from "react";
import TransactionsForm from "../../components/transactions/form";
import {ApolloError, useMutation} from "@apollo/client";
import {CREATE_TRANSACTIONS} from "../../graphschema/product";
import {TransactionsFormValues} from "../../components/transactions/form/types";
import {toast} from "react-toastify";

const WarehouseView = ()=> {
    const [addTransactions] = useMutation(CREATE_TRANSACTIONS);

    const save = async (transactionsFormValues: TransactionsFormValues) => {
        await addTransactions({
            variables : {
                warehouseId: transactionsFormValues.warehouse,
                transactions : [
                    {
                        amount: transactionsFormValues.amount,
                        productId: transactionsFormValues.product,
                        transactionDate: transactionsFormValues.transactionDate
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
        <TransactionsForm save={productFormValues => save(productFormValues)}/>
    </>
}

export default WarehouseView