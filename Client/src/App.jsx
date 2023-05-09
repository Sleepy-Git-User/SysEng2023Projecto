import { useState } from 'react'
import {Route, Routes, BrowserRouter, Outlet} from 'react-router-dom';
import './App.css';
import Randompage from './Pages/salesRepView/salesRepView.jsx';
import StaticDataContextProvider from './Contexts/StaticDataContext';
import {ProductList} from './Widgets/widgets';

function App() {

  return (
    <StaticDataContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Outlet></Outlet>}>
              <Route index element = {<ProductList></ProductList>}></Route>
              <Route path="/salesRepView" element={<Randompage></Randompage>}></Route>
            </Route>            
        </Routes>
			</BrowserRouter>
    </StaticDataContextProvider>
    )
}

export default App
