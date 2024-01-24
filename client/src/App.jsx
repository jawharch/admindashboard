import { useState } from 'react'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/orders';
import { Customers } from './pages/Customers';
import { Layout } from './components/shared/Layout';

function App() {
 
         
  

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Route>
      </Routes>
       
    </Router>
  );
  
  
}

export default App
