import './salesRepView.css'
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material'
import { List } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { StaticDataContext } from '../../Contexts/StaticDataContext'
import axios from 'axios';


export default function SalesPage(){

  const GlobalData = useContext(StaticDataContext);
  const arrayOfProducts = GlobalData.static_data.Products
        
    /*let values*/
    let zero = 0;
    let First = '';
    let itemPricing = zero.toFixed(2);
    let runningtotal = zero.toFixed(2);
    
    /* Value setters*/
    const [total, setTotal] = React.useState(runningtotal);
    const [myArray, setMyArray] = useState([]);
    const navigate = useNavigate();
    const [removeValue, setRemoveValue] = useState('');
    const [itemPrice, setItemPrice] = useState(itemPricing);
    const [myString, setMyString] = useState('Check');
    const [userData, setUserData] = useState({});
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    /* Get request for getUserDetails using the logged in users UserID */
    useEffect(() => {
      axios.get(`/api/getUserDetails/${GlobalData.userID}`)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    /* Line that reads the userID and accesses the first and last name of said ID */
    useEffect(() => {
      if (userData && userData.data && userData.data.UserDetails && userData.data.UserDetails.length > 0) {
        const userDetails = userData.data.UserDetails[0];
        console.log(userData);
        setFname(userDetails.Fname);
        setLname(userDetails.Lname);
      }
    }, [userData]);

          /* Function to generate buttons based on database */
          const ButtonArray = () => {
            return (
              <div>
                {arrayOfProducts.map((product, index) => (
                  <Button key={index} 
                  variant="outlined" 
                  onClick={() => handleAddItem(product.Name, product.Price)} 
                  sx={{height: 100, width:100}}
                  >
                    {product.Name} - £{product.Price}
                    </Button>
                ))}
              </div>
            );
          };

    /* Function to generate remove buttons based on whats been added to cart */
    const RemoveButtonArray = () => {
      return (
        <div>
          {myArray.map((item, index) => (
            <Button
              key={index}
              variant="outlined"
              onClick={() => handleRemoveItem(index, arrayOfProducts[index].Price)}
              sx={{ height: 100, width: 100 }}
            >
              REMOVE {item}
            </Button>
          ))}
        </div>
      );
    };

    const ContentArray = () => {
      return (
        <div>
          {myArray.map((item, index) => {
            const removedProduct = arrayOfProducts.find((product) => product.Name === item);
            const removedPrice = removedProduct ? removedProduct.Price : 'N/A';
            const description = removedProduct ? removedProduct.Description : 'No description available';
            const category = removedProduct ? removedProduct.Category : 'No category';
            const productID = removedProduct ? removedProduct.ProductID : 'N/A';
            return (
              <Container key={index} sx={{ border: 1, minWidth: 950, fontWeight: 'bold', display: 'flex' }}>
                <div style={{ flex: '1 0 17%', marginRight: '3em' }}>
                  <span>{item}</span>
                </div>
                <div style={{ flex: '0 0 17%', marginRight: '3em' }}>
                  <span>{category}</span>
                </div>
                <div style={{ flex: '0 0 17%', marginRight: '3em' }}>
                  <span>{description}</span>
                </div>
                <div style={{ flex: '1 0 17%', marginRight: '3em' }}>
                  <span>£{removedPrice}</span>
                </div>
                <div style={{ flex: '1 0 17%', marginRight: '3em' }}>
                  <span>ID:{productID}</span>
                </div>
              </Container>
            );
          })}
        </div>
      );
    };

    /* Function to handle adding items to cart and correcting price*/
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

    /* Function to handle remove items from cart and correcting price*/
    const handleRemoveItem = (index) => {
      const removedItem = myArray[index];
      const removedProduct = arrayOfProducts.find((product) => product.Name === removedItem);
    
      if (removedProduct) {
        const removedPrice = removedProduct.Price;
    
        setTotal((prevTotal) => (+prevTotal - removedPrice).toFixed(2));
        setItemPrice(itemPricing);
    
        setMyArray((prevArray) => {
          const newArray = [...prevArray];
          newArray.splice(index, 1);
          return newArray;
        });
      }
    };

    /* Nav function to logout */
      const logout = () => {
        navigate('/');
      }

      /* function that clears total*/
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
            <Button 
            sx={{m:2, top: 65, left: 845, minWidth: 150, minHeight: 75}} 
            variant="contained" 
            onClick={() =>{handleBackdrop(); logout();}}
            >
              Logout
              </Button>

            <Button 
            sx={{m:2, top: 970, right: 200, minWidth: 150, minHeight: 75}} 
            variant="contained" 
            onClick={() =>{handleBackdrop(); handleAddShow(); ButtonArray();}} 
            color="success"
            >
              Add
              </Button>
            <Button 
            sx={{m:2, top: 970, right: 100, minWidth: 150, minHeight: 75}} 
            variant="contained" 
            onClick={() =>{handleRemoveShow(); handleBackdrop();}} 
            color="error"
            >
              Remove
              </Button>
            <Button 
            sx={{m:2, top: 970, left: 300, minWidth: 150, minHeight: 75 }} 
            variant="contained" 
            onClick={() =>{handleBackdrop(); handleCheckBoxShow();}} 
            color="warning" 
            >
              Checkout
              </Button>

            {/* Username of the user will be shown here */}
            <Typography sx={{color: '#5883a7'}} variant="h3">User: {fname} {lname}</Typography>
            
            {/* Display Box */}
             <Box variant="outlined"  sx={{ 
                zIndex: 0,
                border: 5 ,
                width: 1000, 
                height: 720, 
                overflow: 'auto',
                color: '#5883a7',
                bgcolor: "white"}}
            > 

            {/* Cart Box */}
            <Box display ="flex" variant="outlined" sx={{ 
                zIndex: 0,
                border: 0 ,
                width: 1000, 
                height: 720, 
                color: '#5883a7',
                bgcolor: "white"}}
                >
                    <ContentArray></ContentArray>
                </Box>

            <Button />
                {/* Checkout Box */}
                <Box visibility={hiddenBox} position={'absolute'} sx={{ 
                    zIndex: 1300,
                    border: 5 ,
                    top: 300,
                    left: 800,
                    width: 600, 
                    height: 500, 
                    bgcolor: "white"}} 
                    >
                    {/* Buttons to pay with either cash or card */}
                    <Typography 
                    sx={{height: 100, width:600}} 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    variant="outlined" 
                    >
                      How would the customer like to pay
                      </Typography>

                    <Button  
                    sx={{height: 400, width:300,}} 
                    variant="outlined" 
                    onClick={() =>{handleCheckBoxHide(); handleConfirmShow(); clearTotal();}}
                    >
                      Cash
                      </Button>

                    <Button  
                    sx={{height: 400, width:300,}} 
                    variant="outlined" 
                    onClick={() =>{handleCheckBoxHide(); handleConfirmShow(); clearTotal();}}
                    >
                      Card
                      </Button>

                </Box>

                {/* Buying Box */}
                <Box visibility={hiddenAdd} position={'absolute'} sx={{ 
                    zIndex: 1100,
                    border: 5 ,
                    top: 200,
                    left: 730,
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
                    border: 5, 
                    top: 300,
                    left: 800,
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
                    top: 450,
                    left: 830,
                    width: 600, 
                    height: 200, 
                    bgcolor: "white"}} 
                    >
                      <List sx={{maxHeight: 175, overflow: 'auto'}}>
                      <RemoveButtonArray></RemoveButtonArray>
                      </List>
                    {/* <TextField value={removeValue} variant="outlined" onChange={removeAdd}></TextField>
                    <Button sx={{minWidth: 50, minHeight: 50}} variant="contained" onClick={() =>{removeItem(); handleBackdrop(); handleRemoveHide();}} color="error">Remove</Button> */}
                </Box>


                {/* Price */}
                <Box position={'absolute'} display="flex" justifyContent="right" alignItems="right" variant="outlined" sx={{ 
                    zIndex: 0,
                    border: 5 ,
                    top: 890,
                    left: 625,
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
