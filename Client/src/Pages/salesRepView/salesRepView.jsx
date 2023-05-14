import './salesRepView.css'
import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material'
import { List } from '@mui/material'

export default function Randompage(){
    /* Calculate total */
    let zero = 0;
    let runningtotal = zero.toFixed(2);

    /*Price calculator */
    const [total, setTotal] = React.useState(runningtotal)
    const shirtBrought = () => (setTotal((+total + 7.50).toFixed(2)))
    const tshirtBrought = () => (setTotal((+total + 4.50).toFixed(2)))
    const socksBrought = () => (setTotal((+total + 2.99).toFixed(2)))
    const jeansBrought = () => (setTotal((+total + 21.00).toFixed(2)))
    const clearTotal = () => (setTotal((+total - +total).toFixed(2)))

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

    /* Change the visibility of the add box */
    const [hiddenAdd, setAddBox] = React.useState('hidden')
    const handleAddShow = () => (setAddBox('visible'))
    const handleAddHide = () => (setAddBox('hidden'))


    return(
        <Container>
            {/* List of buttons */}
            <Button sx={{m:2, top: 65, left: 845, minWidth: 150, minHeight: 75}} variant="contained" onClick={handleBackdrop}>Logout</Button>
            <Button sx={{m:2, top: 970, right: 200, minWidth: 150, minHeight: 75}} variant="contained" onClick={() =>{handleBackdrop(); handleAddShow();}} color="success">Add</Button>
            <Button sx={{m:2, top: 970, right: 100, minWidth: 150, minHeight: 75}} variant="contained" onClick={handleBackdrop} color="error">Remove</Button>
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
                        <Button sx={{height: 200, width:775}} varient="outlined" onClick={jeansBrought}>Add Jeans</Button>
                        <Button sx={{height: 200, width:775}} varient="outlined" onClick={shirtBrought}>Add Shirt</Button>
                        <Button sx={{height: 200, width:775}} varient="outlined" onClick={tshirtBrought}>Add T-Shirt</Button>
                        <Button sx={{height: 200, width:775}} varient="outlined" onClick={socksBrought}>Add Socks</Button>
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
                <Backdrop open={open} onClick={() =>{handleBackdrop(); handleConfirmHide(); handleCheckBoxHide(); handleAddHide();}} sx={{zIndex: 100, position: "absolute"}}>
                    <CircularProgress>

                    </CircularProgress>
                </Backdrop>
        </Container>
    )
}