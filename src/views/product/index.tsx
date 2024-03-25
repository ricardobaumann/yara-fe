import React, {useState} from "react";
import {Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ApolloError,useMutation} from "@apollo/client";
import CREATE_PRODUCT from "../../mutations/product";

const ProductView = () => {

    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("STANDARD");
    const [addProduct] = useMutation(CREATE_PRODUCT);
    const resetForm = () => {
        setProductType("STANDARD");
        setProductName("");
    };
    const save = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addProduct({variables: {
                productName: productName,
                productType: productType
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
        }).finally(() => resetForm());
    };
    return <>
        <p>Add a new product</p>
        <form onSubmit={event => save(event)}>
            <Stack spacing={2} width={"400px"}>

                <FormControl>
                    <InputLabel htmlFor="product-name-field">Product Name</InputLabel>
                    <Input id="product-name-field" aria-describedby="product-name-helper-text"
                           value={productName}
                           required={true}
                           onChange={event => setProductName(event.target.value)}/>
                    <FormHelperText id="product-name-helper-text">Product name is unique</FormHelperText>
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="product-type-field">Product Type</InputLabel>

                    <Select
                        labelId="product-type-select-label"
                        id="product-type-field"
                        value={productType}
                        required={true}
                        defaultValue={"STANDARD"}
                        label="Product Type"
                        onChange={event => setProductType(event.target.value)}>

                        <MenuItem value={"STANDARD"}>Standard</MenuItem>
                        <MenuItem value={"HAZARDOUS"}>Hazardous</MenuItem>

                    </Select>

                    <FormHelperText id="product-name-helper-text">Product type impacts on where you can store it</FormHelperText>
                </FormControl>

                <FormControl>
                    <Button type={"submit"}>Add new product</Button>
                    <ToastContainer />
                </FormControl>
            </Stack>
        </form>
    </>
}

export default ProductView