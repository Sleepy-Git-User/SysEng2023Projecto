import { Card, CardContent, TextField, Grid, Button } from '@mui/material';
import './adduser.css';
import { useState } from 'react';
import axios from 'axios';
import './adduser.css';

export default function EditProductPrice(props){
    
    const [pPrice, setPPrice] = useState('');
    const [productid, setProductid] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/editProductPrice', {productID: productid,value: pPrice })
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
                            <TextField required fullWidth autoComplete="false" label="ID of Product being changed" value={productid}
                             onChange={(e) => setProductid(e.target.value)} ></TextField>
                        </Grid>
                        <Grid xs={12} item sx={{py: 2,}}>
                            <TextField required fullWidth autoComplete="false" label="New Product Price" value={pPrice}
                             onChange={(e) => setPPrice(e.target.value)} type='number'></TextField>
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