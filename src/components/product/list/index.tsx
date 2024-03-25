import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface ProductListParams {
    data: any
}

interface Column {
    id: 'productName' | 'productType';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'productName', label: 'ProductName', minWidth: 170 },
    { id: 'productType', label: 'ProductType', minWidth: 100 },
];

interface ProductData {
    productName: string;
    productType: string;
}


const ProductList = (params: ProductListParams) => {
    const data = params.data;
    return <>
        <p>Product List</p>
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
                        {data?.getProducts?.map((dataRow: any): ProductData => {
                                return {
                                    productName: dataRow['productName'],
                                    productType: dataRow['productType']
                                }
                            })?.map((row: ProductData) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.productName}>
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

export default ProductList