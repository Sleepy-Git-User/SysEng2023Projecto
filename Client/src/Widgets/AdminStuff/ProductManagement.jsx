import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import './productmanagement.css';
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";




export default function ProductManagement() {

    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showProductForm, setShowProductForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    

    useEffect(() => {
        axios.get('/api/static_data')
            .then(response => {
                setProductData(response.data.data.Products);
                setLoading(false);
                console.log(productData);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        console.log(productData); // Log the updated userData
    }, [productData]);

    return (
        <section className="layout">

            <Card sx={{ py: '3vh', minHeight: "50vh" }}>
                <CardContent >
                    <Typography textAlign={"center"} variant="h4" sx={{paddingBottom:"4vh"}}>Product Management</Typography>
                     <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            productData.length > 0 ? (
                                <table className="product-table">
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.ProductID}</td>
                                                <td>{item.Name}</td>
                                                <td>{item.Description}</td>
                                                <td>{item.Price}</td>
                                                <td>{item.Stock}</td>
                                                <td>{item.Category}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No data available.</p>
                            )
                        )}
                    </div>
                    <Container>
                        <Button onClick={()=> setShowProductForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Add Product</Button>
                        <Button onClick={()=> setShowRemoveForm(true)} variant="contained" sx={{marginRight: "2vw"}} >Remove Product</Button>
                    </Container>
                    <AddProduct className="addUser" trigger={showProductForm} setTrigger={setShowProductForm}></AddProduct>
               <RemoveProduct className="addUser" trigger={showRemoveForm} setTrigger={setShowRemoveForm}></RemoveProduct>
                 </CardContent>
            </Card>
        </section>
    )
}