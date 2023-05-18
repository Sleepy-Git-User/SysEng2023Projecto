import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useState } from "react";
import './loginform.css';
import axios from "axios";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";



export default function LoginForm(){

    /*function postUser() {
        axios
          .post('/loginChecker', {
            title: "User",
            body: user
          })
          .then((response) => {
            setPost(response.data);
          });
      }*/

    
    //user and password variables
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    //prevents page automatically refreshing on submit, will direct user to sales/admin view upon authentication
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/loginChecker', { userID: user })
        .then(res=>{
            if (res.data.success == true){
                navigate("/salesRepView");
            }
            else{

            }
        }).catch(e=>{
            console.log(e);
        });
    }

    //Login fields for login page, using mui components and sx to style and format further
    //Card and grid used to give a professional and clean look
    return (
        <Container maxWidth="sm" sx={{ bgcolor: "primary", height: "100vh" }}>
            <Typography variant="h3" color="primary" sx={{ textAlign: "center", my: 6, }}>Login</Typography>
            <Card sx={{my:3}}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} columns={1} sx={{ py: 1, }}>
                        <Grid xs={12} item sx={{py: 2,}}>
                            <TextField required fullWidth autoComplete="false" label="User ID" value={user}
                             onChange={(e) => setUser(e.target.value)} ></TextField>
                        </Grid>
                        {/*<Grid xs={12} item sx={{py: 2,}}>
                            <TextField required fullWidth autoComplete="false" label="Password" type="password"
                             value={pass} onChange={(e) => setPass(e.target.value)}></TextField>
    </Grid>*/}
                        <Grid xs={12} item sx={{py: 2,}}>
                            <Button fullWidth variant="contained" size="large"
                            type="submit" style={{minHeight:'6vh'}}>Login</Button>
                        </Grid>
                    </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )

}