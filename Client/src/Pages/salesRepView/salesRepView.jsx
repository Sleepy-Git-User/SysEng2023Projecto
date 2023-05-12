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
    const handleCheckBox = () => (setHide('visible'))
    const hideBox = () => (setHide('hidden'))

    return(
        <Container>
            {/* List of buttons */}
            <Button sx={{m:2, top: 65, left: 845, minWidth: 150, minHeight: 75}} variant="contained" onClick={handleBackdrop}>Logout</Button>
            <Button sx={{m:2, top: 970, right: 200, minWidth: 150, minHeight: 75}} variant="contained" onClick={handleBackdrop} color="success">Add</Button>
            <Button sx={{m:2, top: 970, right: 100, minWidth: 150, minHeight: 75}} variant="contained" onClick={handleBackdrop} color="error">Remove</Button>
            <Button sx={{m:2, top: 970, left: 300, minWidth: 150, minHeight: 75 }} variant="contained" onClick={() =>{handleBackdrop(); handleCheckBox();}} color="warning" >Checkout</Button>

            {/* Username of the user will be shown here */}
            <Typography sx={{color: '#5883a7'}} variant="h3">Username</Typography>


            {/* Display Box */}
             <Box display="flex" justifyContent="center" alignItems="center"sx={{ 
                zIndex: 0,
                border: 5 ,
                width: 1000, 
                height: 800, 
                color: '#5883a7',
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