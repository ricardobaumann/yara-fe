import React from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ApolloError, useMutation, useQuery} from "@apollo/client";
import {CREATE_PRODUCT, GET_PRODUCTS} from "../../graphschema/product";
import ProductList from "../../components/product/list";
import ProductForm from "../../components/product/form";
import {ProductFormValues} from "../../components/product/form/types";

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


const ProductView = () => {

    const [addProduct] = useMutation(CREATE_PRODUCT);
    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);

    const saveForm = (productFormValues: ProductFormValues) => {
        addProduct({variables: {
                productName: productFormValues.productName,
                productType: productFormValues.productType
            }}).then(value => {
            if (value.data) {
                toast("Product created successfully");
            } else {
                if (value.errors) {
                    toast("Product failed to be created");
                }
            }
        }).catch(reason => {
            console.log(reason);
            if (reason instanceof ApolloError) {
                toast("Product failed to be created: "+(reason as ApolloError).message);
            } else {
                toast("An unknown error occurred: "+reason.error);
            }
        }).finally(() => {
            refetch();
        });
    };
    return <>
        <ProductForm save={(productFormValues: ProductFormValues) => saveForm(productFormValues)}/>
        <ProductList data={data}></ProductList>
    </>
}

export default ProductView