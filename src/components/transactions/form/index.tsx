import React, {useState} from "react";
import {Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {ApolloError, useMutation, useQuery} from "@apollo/client";
import {CREATE_TRANSACTIONS, GET_PRODUCTS, GET_WAREHOUSES} from "../../../graphschema/product";
import {toast, ToastContainer} from "react-toastify";

const TransactionsForm = () => {
    const [product, setProduct] = useState<string>();
    const [amount, setAmount] = useState(0);
    const [warehouse, setWarehouse] = useState<string>();

    const { loading, error, data, refetch } = useQuery(GET_WAREHOUSES);
    const { loading: loadingProd, error: errorProd, data: dataProd, refetch: refetchProd } = useQuery(GET_PRODUCTS);
    const [addTransactions] = useMutation(CREATE_TRANSACTIONS);

    const saveForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(`Warehouse id: ${warehouse}`);
        console.log(`Product id: ${product}`);
        addTransactions({
            variables : {
                warehouseId: warehouse,
                transactions : [
                    {
                        amount: amount,
                        productId: product
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
                toast("Product failed to be created: "+(reason as ApolloError).message);
            } else {
                toast.error("An unknown error occurred: "+reason.error);
            }
        }).finally(() => {
            refetch();
            refetchProd();
        })
    };
    return <>
        <form onSubmit={event => saveForm(event)}>
            <Stack spacing={2} width={"400px"}>

                <FormControl>
                    <InputLabel htmlFor="warehouse-select">Warehouse</InputLabel>
                    <Select
                        labelId="warehouse-select-label"
                        id="warehouse-select"
                        label="Warehouse"
                        required={true}
                        value={warehouse}
                        onChange={event => setWarehouse(event.target.value)}
                    >
                        {
                            data?.getWarehouses?.map((item: any) => {
                                return (
                                    <MenuItem value={item['id']}>
                                        {`${item['code']} - ${item['hazardous'] == null ? "Empty": (item['hazardous'] ? "Hazardous" : "Non hazardous")}`}
                                    </MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="product-select">Product</InputLabel>
                    <Select
                        labelId="product-select-label"
                        id="product-select"
                        label="Product"
                        required={true}
                        value={product}
                        onChange={event => setProduct(event.target.value)}
                    >
                        {
                            dataProd?.getProducts?.map((item: any) => {
                                return (
                                    <MenuItem value={item['id']}>{`${item['productName']} - ${item['productType']}`}</MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>


                <FormControl>
                    <InputLabel htmlFor="amount-field">Amount</InputLabel>
                    <Input id="amount-field" aria-describedby="amount-helper-text"
                           value={amount}
                           inputProps={{type: 'number'}}
                           required={true}
                           onChange={event => setAmount(parseInt(event.target.value))}/>
                    <FormHelperText id="amount-helper-text">How many?</FormHelperText>
                </FormControl>

                <FormControl>
                    <Button type={"submit"}>Create</Button>
                </FormControl>
            </Stack>
        </form>
        <ToastContainer/>
    </>
}

export default TransactionsForm