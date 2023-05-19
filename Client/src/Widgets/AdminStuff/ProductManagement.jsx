import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import './productmanagement.css';
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";
import EditProductName from "./EditProductName";
import EditProductDescription from "./EditProductDescription";
import EditProductPrice from "./EditProductPrice";
import EditProductStock from "./EditProductStock";



export default function ProductManagement() {

    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showProductForm, setShowProductForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    const [showEditNameForm, setShowEditNameForm] = useState(false);
    const [showEditDescForm, setShowEditDescForm] = useState(false);
    const [showEditPriceForm, setShowEditPriceForm] = useState(false);
    const [showEditStockForm, setShowEditStockForm] = useState(false);

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
                    <Container sx={{justifyContent: 'center', marginLeft:'10vw'}}>
                        <Button onClick={()=> setShowProductForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Add Product</Button>
                        <Button onClick={()=> setShowRemoveForm(true)} variant="contained" sx={{marginRight: "2vw"}} >Remove Product</Button>
                        <Button onClick={()=> setShowEditForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Edit Name</Button>
                        <Button onClick={()=> setShowEditDescForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Edit Description</Button>
                        <Button onClick={()=> setShowEditPriceForm(true)} variant="contained" sx={{marginRight: "2vw"}} >Edit Price </Button>
                        <Button onClick={()=> setShowEditStockForm(true)} variant="contained" sx={{marginRight: "2vw"}} >Edit Stock </Button>
                    </Container>
                    <AddProduct className="addUser" trigger={showProductForm} setTrigger={setShowProductForm}></AddProduct>
                    <RemoveProduct className="addUser" trigger={showRemoveForm} setTrigger={setShowRemoveForm}></RemoveProduct>
                    <EditProductName className="addUser" trigger={showEditNameForm} setTrigger={setShowEditNameForm}></EditProductName>
                    <EditProductDescription className="addUser" trigger={showEditDescForm} setTrigger={setShowEditDescForm}></EditProductDescription>
                    <EditProductPrice className="addUser" trigger={showEditPriceForm} setTrigger={setShowEditPriceForm}></EditProductPrice>
                    <EditProductStock className="addUser" trigger={showEditStockForm} setTrigger={setShowEditStockForm}></EditProductStock>
                 </CardContent>
            </Card>
        </section>
    )
}