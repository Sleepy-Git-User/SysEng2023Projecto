import './salesRepView.css'
import React, { useState } from 'react';
import { useContext } from 'react';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material'
import { List } from '@mui/material'
import { TextField } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { StaticDataContext } from '../../Contexts/StaticDataContext'
import axios from 'axios';


export default function Randompage(){

  const GlobalData = useContext(StaticDataContext);
  const arrayOfProducts = GlobalData.static_data.Products
        
    /* Calculate total */
    let zero = 0;
    let itemPricing = zero.toFixed(2);
    let runningtotal = zero.toFixed(2);
    
    /* Price calculator */
    const [total, setTotal] = React.useState(runningtotal);
    const [myArray, setMyArray] = useState([]);
    const navigate = useNavigate();
    const [removeValue, setRemoveValue] = useState('');
    const [itemPrice, setItemPrice] = useState(itemPricing);
    const [myString, setMyString] = useState('Check'); // Declare myString state variable

    const ButtonArray = () => {
      return (
        <div>
          {arrayOfProducts.map((product, index) => (
            <Button key={index} onClick={() => handleAddItem(product.Name, product.Price)} sx={{height: 200, width:800}}>ADD {product.Name}</Button>
          ))}
        </div>
      );
    };

    const handleAddItem = (Name, Price) =>{
        const price = Price;
        setTotal((+total + price).toFixed(2));
        setMyString(prevValue => {
          const newValue = Name;
          setMyArray([...myArray, newValue]);
          console.log(myArray.length);
          return newValue;
        });
    }

      const logout = () => {
        navigate('/');
      }

      const removeItem = () => {
        setMyArray(prevArray => {
          const removeItem = prevArray[removeValue-1];
          let updatedItemPrice = itemPrice;
          if (removeItem === "Jeans") {
            updatedItemPrice = 21.00;
          } else if (removeItem === "Shirt") {
            updatedItemPrice = 7.50;
          } else if (removeItem === "T-Shirt") {
            updatedItemPrice = 4.50;
          } else if (removeItem === "Socks") {
            updatedItemPrice = 2.99;
          }
          console.log(removeItem);
          console.log(updatedItemPrice);
          setItemPrice(() => updatedItemPrice);
      
          setTotal(prevTotal => (+prevTotal - updatedItemPrice).toFixed(2));
      
          const newArray = [...prevArray];
          newArray.splice(removeValue-1, 1);
          return newArray;
        });
      };

      const removeAdd = e => {
        console.log(e.target.value);
        setRemoveValue(e.target.value);
      }

      const clearTotal = () => {
        (setTotal((+total - +total).toFixed(2)));
        setItemPrice(itemPricing);
        setRemoveValue('');
        setMyArray([]);
        }


    /* Change the open or close state of the backdrop */
    const [open, setOpen] = React.useState(false)
    const handleBackdrop = () => {setOpen(!open)}

    /* Change the visibility of the checkout box */
    const [hiddenBox, setHideBox] = React.useState('hidden')
    const handleCheckBoxShow = () => (setHideBox('visible'))
    const handleCheckBoxHide = () => (setHideBox('hidden'))

    /* Change the visibility of the confirm box */
    const [hiddenConfirm, setConfirmBox] = React.useState('hidden')
    const handleConfirmShow = () => (setConfirmBox('visible'))
    const handleConfirmHide = () => (setConfirmBox('hidden'))

    /* Change the visibility of the confirm box */
    const [hiddenRemove, setRemoveBox] = React.useState('hidden')
    const handleRemoveShow = () => (setRemoveBox('visible'))
    const handleRemoveHide = () => (setRemoveBox('hidden'))

    /* Change the visibility of the add box */
    const [hiddenAdd, setAddBox] = React.useState('hidden')
    const handleAddShow = () => (setAddBox('visible'))
    const handleAddHide = () => (setAddBox('hidden'))


    return(
        <Container>
            {/* List of buttons */}
            <Button sx={{m:2, top: 65, left: 845, minWidth: 150, minHeight: 75}} variant="contained" onClick={() =>{handleBackdrop(); logout();}}>Logout</Button>
            <Button sx={{m:2, top: 970, right: 200, minWidth: 150, minHeight: 75}} variant="contained" onClick={() =>{handleBackdrop(); handleAddShow(); ButtonArray();}} color="success">Add</Button>
            <Button sx={{m:2, top: 970, right: 100, minWidth: 150, minHeight: 75}} variant="contained" onClick={() =>{handleRemoveShow(); handleBackdrop();}} color="error">Remove</Button>
            <Button sx={{m:2, top: 970, left: 300, minWidth: 150, minHeight: 75 }} variant="contained" onClick={() =>{handleBackdrop(); handleCheckBoxShow();}} color="warning" >Checkout</Button>

            {/* Username of the user will be shown here */}
            <Typography sx={{color: '#5883a7'}} variant="h3">Username</Typography>
            
            {/* Display Box */}
             <Box display="flex" justifyContent="center" alignItems="center" variant="outlined" sx={{ 
                zIndex: 0,
                border: 5 ,
                width: 1000, 
                height: 800, 
                color: '#5883a7',
                bgcolor: "white"}}
            > 

            {/* Cart Box */}
            <Box variant="outlined" sx={{ 
                zIndex: 0,
                border: 0 ,
                width: 1000, 
                height: 800, 
                color: '#5883a7',
                bgcolor: "white"}}
                >
                    {myArray.map((item,index) => (<div key={index}>{item}</div>))}
                </Box>

            <Button />
                {/* Checkout Box */}
                <Box visibility={hiddenBox} position={'absolute'} sx={{ 
                    zIndex: 1300,
                    border: 5 ,
                    width: 600, 
                    height: 500, 
                    bgcolor: "white"}} 
                    >
                    {/* Buttons to pay with either cash or card */}
                    <Typography sx={{height: 100, width:600}} display="flex" justifyContent="center" alignItems="center" variant="outlined" >How would the customer like to pay</Typography>
                    <Button  sx={{height: 400, width:300,}} variant="outlined" onClick={() =>{handleCheckBoxHide(); handleConfirmShow(); clearTotal();}}>Cash</Button>
                    <Button  sx={{height: 400, width:300,}} variant="outlined" onClick={() =>{handleCheckBoxHide(); handleConfirmShow(); clearTotal();}}>Card</Button>
                </Box>

                {/* Buying Box */}
                <Box visibility={hiddenAdd} position={'absolute'} sx={{ 
                    zIndex: 1100,
                    border: 5 ,
                    width: 800, 
                    height: 700,
                    bgcolor: "white"}} 
                    >
                        <List sx={{maxHeight: 682, overflow: 'auto'}}>
                        <ButtonArray></ButtonArray>
                        </List>
                </Box>

                {/* Confirmation Box */}
                <Box visibility={hiddenConfirm} position={'absolute'} display="flex" justifyContent="center" alignItems="center" variant="outlined" sx={{ 
                    zIndex: 1200,
                    border: 5 ,
                    width: 600, 
                    height: 500, 
                    bgcolor: "white"}} 
                    >
                    <Typography variant = "h4">Payment Succesful</Typography>
                    
                </Box>

                  {/* Removal Box */}
                  <Box visibility={hiddenRemove} position={'absolute'} display="flex" justifyContent="center" alignItems="center" variant="outlined" sx={{ 
                    zIndex: 1200,
                    border: 5 ,
                    width: 600, 
                    height: 200, 
                    bgcolor: "white"}} 
                    >
                    <TextField value={removeValue} variant="outlined" onChange={removeAdd}></TextField>
                    <Button sx={{minWidth: 50, minHeight: 50}} variant="contained" onClick={() =>{removeItem(); handleBackdrop(); handleRemoveHide();}} color="error">Remove</Button>
                </Box>


                {/* Price */}
                <Box position={'absolute'} display="flex" justifyContent="right" alignItems="right" variant="outlined" sx={{ 
                    zIndex: 0,
                    border: 2 ,
                    top: 890,
                    width: 1000, 
                    height: 75, 
                    bgcolor: "white"}} 
                    >
                    <text>{'Price: £' + total}</text>
                </Box>
            </Box>

                {/* Backdrop that shows loading when a button is pressed. */}
                <Backdrop open={open} onClick={() =>{handleBackdrop(); handleConfirmHide(); handleCheckBoxHide(); handleAddHide(); handleRemoveHide();}} sx={{zIndex: 100, position: "absolute"}}>
                    <CircularProgress>

                    </CircularProgress>
                </Backdrop>
        </Container>
    )
}
