import React, {useState} from 'react';
import './App.css';
import {Box, Tab, Tabs} from "@mui/material";
import ProductView from "./views/product";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import TransactionsView from "./views/warehouse";
const backendURL = process.env.BACKEND_URL || 'http://localhost:4000/graphql';
console.log('Backend URL:', backendURL);  // Use the environment variable as needed

const client = new ApolloClient({
  uri: backendURL,
  cache: new InMemoryCache(),
});

function App() {

  const [currentTabIndex, setCurrentTabIndex] = useState(0);


  const handleChange = (newValue: number) => {
    setCurrentTabIndex(newValue);
  };

  return <>
    <ApolloProvider client={client}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}
           display={"flex"}
           justifyContent={"center"}
           alignContent={"center"}>
        <Tabs value={currentTabIndex}
              onChange={(event, newValue) => handleChange(newValue)} aria-label="basic tabs example">
          <Tab label="Products"/>
          <Tab label="Transactions"/>
        </Tabs>
      </Box>
      {currentTabIndex === 0 && (
          <>
            <ProductView/>
          </>
      )}
      {currentTabIndex === 1 && (  
          <>
            <TransactionsView/>
          </>
      )}
    </ApolloProvider>
  </>
}

export default App;
