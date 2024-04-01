import React, {useState} from "react";
import {Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import {ToastContainer} from "react-toastify";
import {ProductFormParams} from "./types";

const ProductForm = (productFormParams: ProductFormParams)=> {
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("STANDARD");
    const [sizePerUnit, setSizePerUnit] = useState(0);

    const save = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        productFormParams.save({
            productName: productName,
            productType: productType,
            sizePerUnit: sizePerUnit
        })
    };
    const resetForm = () => {
        setProductType("STANDARD");
        setProductName("");
    };

    return <>
        <form onSubmit={event => {
            save(event);
            resetForm();
        }}>
            <Grid container justifyContent={"center"} sx={{paddingTop: '50px'}}>
                <Stack spacing={2} width={"400px"}>
                    <h2>Add a new product</h2>
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

                        <FormHelperText id="product-name-helper-text">Product type impacts on where you can store
                            it</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="size-per-unit-field">Size Per Unit</InputLabel>
                        <Input id="size-per-unit-field" aria-describedby="size-per-unit-helper-text"
                               value={sizePerUnit}
                               required={true}
                               inputProps={{type: 'number'}}
                               onChange={event => setSizePerUnit(parseInt(event.target.value))}/>
                        <FormHelperText id="size-per-unit-helper-text">How much space is takes?</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <Button type={"submit"}>Add new product</Button>
                        <ToastContainer/>
                    </FormControl>
                </Stack>
            </Grid>
        </form>
    </>
}

export default ProductForm;