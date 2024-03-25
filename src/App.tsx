import React, {useState} from 'react';
import './App.css';
import {Box, Tab, Tabs} from "@mui/material";
import ProductView from "./views/product";

function App() {

  const [currentTabIndex, setCurrentTabIndex] = useState(0);


  const handleChange = (newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  return <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={currentTabIndex} onChange={(event, newValue) => handleChange(newValue)} aria-label="basic tabs example">
        <Tab label="Products"/>
        <Tab label="Warehouse"/>
      </Tabs>
    </Box>
    {currentTabIndex === 0 && (
        <>
          <ProductView/>
        </>
    )}
  </>
}

export default App;
