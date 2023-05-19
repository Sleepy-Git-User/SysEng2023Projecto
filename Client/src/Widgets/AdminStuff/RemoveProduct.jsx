import { Card, CardContent, TextField, Grid, Button } from '@mui/material';
import './adduser.css';
import { useState } from 'react';
import axios from 'axios';

export default function RemoveProduct(props){
    
    const [productid, setProductID] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/removeProduct', {productID : productid})
        .then(res=>{
            if (res.data.success == true){
                window.location.reload();
            }
            else{
                console.log(res)
            }
        }).catch(e=>{
            console.log(e);
        });
    }
    
    
    return (props.trigger) ? (
        <Card>
            <CardContent className="layout">
                <form onSubmit={handleSubmit}>
                <Grid container spacing={1} columns={1} sx={{ py: 1, }}>
                        <Grid  xs={12} item sx={{py: 2, marginBottom: '4vh'}}>
                            <Button onClick={() => props.setTrigger(false)} variant="contained" size="large" sx={{marginLeft:'90vw'}}
                             style={{minHeight:'6vh'}}>Close</Button>
                        </Grid>
                        <Grid xs={12} item sx={{py: 2,}}>
                            <TextField required fullWidth autoComplete="false" label="Product ID" value={productid}
                             onChange={(e) => setProductID(e.target.value)} ></TextField>
                        </Grid>
                        <Grid xs={12} item sx={{py: 2,}}>
                            <Button fullWidth variant="contained" size="large"
                            type="submit" style={{minHeight:'6vh'}}>Submit</Button> 
                        </Grid>
                </Grid>
                </form>
            </CardContent>
        </Card>
    ) : "";
}