import { useState } from 'react'
import {Route, Routes, BrowserRouter, Outlet} from 'react-router-dom';
import './App.css';
import Randompage from './Pages/randompage/Randompage.jsx';
import Loginpage from './Pages/randompage/Loginpage.jsx';
import StaticDataContextProvider from './Contexts/StaticDataContext';
import {ProductList} from './Widgets/widgets';
import Loginpage from './Pages/loginpage/Loginpage';

import { ThemeProvider, createTheme } from '@mui/material/styles';

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

import {red} from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
              <Route index element = {<ProductList></ProductList>}></Route>
              <Route path="/fish" element={<Randompage></Randompage>}></Route>
              <Route path="/login" element={<Loginpage></Loginpage>}></Route>
            </Route>            
        </Routes>
			</BrowserRouter>
      </ThemeProvider>
    </StaticDataContextProvider>
    )
}

export default App
