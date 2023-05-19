import { useState } from 'react'
import {Route, Routes, BrowserRouter, Outlet} from 'react-router-dom';
import './App.css';
import StaticDataContextProvider from './Contexts/StaticDataContext';
import {ProductList} from './Widgets/widgets';
import SalesPage from './Pages/salesRepView/salesRepView';
import Loginpage from './Pages/loginpage/Loginpage';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Adminpage from './Pages/adminpage/Adminpage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5883a7',
    },
    secondary: {
      main: '#5883a7',
    },
  },
});






function App() {

  return (
    <StaticDataContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Outlet></Outlet>}>
              <Route index element = {<Loginpage></Loginpage>}></Route>
              <Route path="/salesRepView" element={<SalesPage></SalesPage>}></Route>
              <Route path='/adminPage' element={<Adminpage></Adminpage>}></Route>
            </Route>            
        </Routes>
			</BrowserRouter>
      </ThemeProvider>
    </StaticDataContextProvider>
    )
}

export default App
