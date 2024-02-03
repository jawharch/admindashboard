import { useState } from 'react'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/orders';
import { Customers } from './pages/Customers';
import { Layout } from './components/shared/Layout';
import { CreateCustomer } from './pages/CreateCustomer';
import { ChakraProvider } from '@chakra-ui/react'


        

import {QueryClient,QueryClientProvider} from 'react-query';

function App() {
  const queryClient= new QueryClient()
 
         
  

  return (
    
    <QueryClientProvider client={queryClient}>
    <Router>
    <ChakraProvider/>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path='/create-customer' element={<CreateCustomer/>}/>
      </Route>
      </Routes>

    
       
    </Router>
    
    </QueryClientProvider>
    
    
    
  );
  
  
}

export default App
