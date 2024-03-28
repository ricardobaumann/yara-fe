import React, {useState} from "react";
import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    MenuItem, Paper,
    Select,
    Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow
} from "@mui/material";
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS, GET_WAREHOUSES, LIST_TRANSACTIONS} from "../../../graphschema/product";
import {ToastContainer} from "react-toastify";
import {TransactionsFormParams} from "./types";
import {toToastItem} from "react-toastify/dist/utils";

interface Column {
    id: 'id' | 'product' | 'amount';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'product', label: 'Product', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
];

interface TransactionsData {
    id: string;
    product: string;
    amount: number;
}

const TransactionsForm = (params: TransactionsFormParams) => {
    const [product, setProduct] = useState<string>();
    const [amount, setAmount] = useState(0);
    const [warehouseId, setWarehouseId] = useState<string>("");

    const { data: transactionsData, refetch } = useQuery(LIST_TRANSACTIONS, {
        variables: {
            warehouseId: warehouseId
        }
    });

    const { data: warehouseData, refetch: refetchWarehouses } = useQuery(GET_WAREHOUSES);
    const { data: productData } = useQuery(GET_PRODUCTS);

    const saveForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        params.save({
            product: product!,
            amount: amount,
            warehouse: warehouseId!
        });

        refetchWarehouses();
        refetch({
            warehouseId: warehouseId
        });

    };
    let warehouseObj = warehouseData?.getWarehouses?.find((item: any) => item['id'] === warehouseId);
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
                        value={warehouseId}
                        onChange={event => {
                            let id = event.target.value;
                            setWarehouseId(id);
                            refetch({
                                warehouseId: id
                            });
                        }}
                    >
                        {
                            warehouseData?.getWarehouses?.map((item: any) => {
                                return (
                                    <MenuItem value={item['id']}>
                                        {`${item['code']} - ${item['hazardous'] == null ? "Empty": (item['hazardous'] ? "Hazardous" : "Non hazardous")}`}
                                    </MenuItem>
                                );
                            })
                        }
                    </Select>
                </FormControl>
                    <p><strong>Warehouse Summary</strong></p>
                    {warehouseId && (
                        <>
                            <p><strong>Code</strong>: {warehouseObj?.code}</p>
                            <p><strong>Capacity</strong>: {warehouseObj?.capacity}</p>
                            <p><strong>Occupied</strong>: {warehouseObj?.occupied}</p>
                        </>
                    )}
                <FormControl>

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
                            productData?.getProducts?.map((item: any) => {
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
                    <Button type={"submit"}>Add</Button>
                </FormControl>
            </Stack>
        </form>
        <Paper sx={{width: '40%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionsData?.getTransactions?.map((dataRow: any): TransactionsData => {
                            return {
                                amount: dataRow['amount'],
                                id: dataRow['id'],
                                product: dataRow['product_id']
                            }
                        })?.map((row: TransactionsData) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
        <ToastContainer/>
    </>
}

export default TransactionsForm