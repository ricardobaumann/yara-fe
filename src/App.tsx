import React, {useState} from 'react';
import './App.css';
import {Box, Tab, Tabs} from "@mui/material";
import ProductView from "./views/product";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {

  const [currentTabIndex, setCurrentTabIndex] = useState(0);


  const handleChange = (newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  return <>
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  </>
}

export default App;
