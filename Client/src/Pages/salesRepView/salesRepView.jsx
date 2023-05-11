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
    const [hidden, setHide] = React.useState(false)
    const handleCheckBox = () => (setHide('visable'))
    const hideBox = () => (setHide('hidden'))

    return(
        <Container>
            {/* List of buttons */}
            <Button sx={{m:2, top: 67, left: 800}} variant="contained" onClick={handleBackdrop}>Logout</Button>
            <Button sx={{m:2, top: 930, right: 100}} variant="contained" onClick={handleBackdrop} color="success">Add</Button>
            <Button sx={{m:2, top: 930, left: 0}} variant="contained" onClick={handleBackdrop} color="error">Remove</Button>
            <Button sx={{m:2, top: 930, left: 450}} variant="contained" onClick={() =>{handleBackdrop(); handleCheckBox();}} color="warning" >Checkout</Button>

            {/* Username of the user will be shown here */}
            <Typography sx={{}} variant="h3">Username</Typography>


            {/* Display Box */}
             <Box display="flex" justifyContent="center" alignItems="center"sx={{ 
                zIndex: 0,
                border: 5 ,
                width: 1000, 
                height: 800, 
                bgcolor: "white"}}
            > 
            {/* Checkout Box */}
            <Box visibility={hidden} sx={{ 
                zIndex: 1,
                border: 5 ,
                width: 600, 
                height: 500, 
                bgcolor: "white"}} 
                >
                {/* Buttons to pay with either cash or card */}
                <Button sx={{height: 500, width:300,}} variant="outlined" onClick={handleBackdrop}>Cash</Button>
                <Button sx={{height: 500, width:300,}} variant="outlined" onClick={handleBackdrop}>Card</Button>
                </Box>
                </Box>

                {/* Backdrop that shows loading when a button is pressed. */}
                <Backdrop open={open} onClick={() =>{handleBackdrop(); hideBox();}} sx={{zIndex: 0, position: "absolute"}}>
                    <CircularProgress></CircularProgress>
                </Backdrop>
        </Container>
    )
}