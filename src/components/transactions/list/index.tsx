import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface TransactionsListParams {
    data: any
}

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

const TransactionsList = (transactionParams: TransactionsListParams)=> {
    const data = transactionParams.data;
    return <>
        <p>List</p>
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
                        {data?.getTransactions?.map((dataRow: any): TransactionsData => {
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
    </>
}

export default TransactionsList