import './salesRepView.css'
import React from "react"
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material'

export default function Randompage(){
    /* Function to change the open or close state of the backdrop */
    const [open, setOpen] = React.useState(false)
    const handleBackdrop = () => {setOpen(!open)}

    /* Function to change the visibility of the box */
    const [hiddenBox, setHideBox] = React.useState(false)
    const handleCheckBoxShow = () => (setHideBox('visible'))
    const handleCheckBoxHide = () => (setHideBox('hidden'))

        /* Function to change the visibility of the box */
        const [hiddenConfirm, setConfirmBox] = React.useState(false)
        const handleConfirmShow = () => (setConfirmBox('visible'))
        const handleConfirmHide = () => (setConfirmBox('hidden'))

    return(
        <Container>
            {/* List of buttons */}
            <Button sx={{m:2, top: 65, left: 845, minWidth: 150, minHeight: 75}} variant="contained" onClick={handleBackdrop}>Logout</Button>
            <Button sx={{m:2, top: 970, right: 200, minWidth: 150, minHeight: 75}} variant="contained" onClick={handleBackdrop} color="success">Add</Button>
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
                    <Button  sx={{height: 400, width:300,}} variant="outlined" onClick={() =>{handleCheckBoxHide(); handleConfirmShow();}}>Cash</Button>
                    <Button  sx={{height: 400, width:300,}} variant="outlined" onClick={() =>{handleCheckBoxHide(); handleConfirmShow();}}>Card</Button>
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
            </Box>

                {/* Backdrop that shows loading when a button is pressed. */}
                <Backdrop open={open} onClick={() =>{handleBackdrop(); handleConfirmHide(); handleCheckBoxHide();}} sx={{zIndex: 100, position: "absolute"}}>
                    <CircularProgress></CircularProgress>
                </Backdrop>
        </Container>
    )
}