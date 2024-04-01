import React from "react";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface ProductListParams {
    data: any
}

interface Column {
    id: 'productName' | 'productType' | 'sizePerUnit';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'productName', label: 'Product Name', minWidth: 170 },
    { id: 'productType', label: 'Product Type', minWidth: 100 },
    { id: 'sizePerUnit', label: 'Size Per Unit', minWidth: 100 },
];

interface ProductData {
    productName: string;
    productType: string;
    sizePerUnit: number;
}


const ProductList = (params: ProductListParams) => {
    const data = params.data;
    return <>
        <Grid container justifyContent={"center"} sx={{paddingTop: '50px'}}>
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
                                        <strong>{column.label}</strong>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.getProducts?.map((dataRow: any): ProductData => {
                                    return {
                                        productName: dataRow['productName'],
                                        productType: dataRow['productType'],
                                        sizePerUnit: dataRow['sizePerUnit']
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
        </Grid>
    </>
}

export default ProductList