import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import './usermanagement.css';
import AddUser from "./AddUser";
import RemoveUser from "./RemoveUser";
import EditUserFName from "./EditUserFName";
import EditUserLName from "./EditUserLName";
import ToggleUserAdmin from "./ToggleUserAdmin";


export default function UserManagement() {

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    const [showFNameEditForm, setShowFNameEditForm] = useState(false);
    const [showLNameEditForm, setShowLNameEditForm] = useState(false);
    const [showToggleAdminForm, setShowToggleAdminForm] = useState(false);
    

    useEffect(() => {
        axios.get('/api/getAllUserDetails')
            .then(response => {
                setUserData(response.data.data.UserDetails);
                setLoading(false);
                console.log(userData);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        console.log(userData); // Log the updated userData
    }, [userData]);

    return (
        <section >

            <Card sx={{ py: '3vh', minHeight: "50vh", borderBottom: 1, }}>
                <CardContent >
                    <Typography textAlign={"center"} variant="h4" sx={{paddingBottom:"4vh"}}>User Management</Typography>
                     <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            userData.length > 0 ? (
                                <table className="user-table">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Account Status</th>
                                            <th>Admin Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.UserID}</td>
                                                <td>{item.Fname}</td>
                                                <td>{item.Lname}</td>
                                                <td>{item.Account_Status}</td>
                                                <td>{item.Admin_Status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No data available.</p>
                            )
                        )}
                    </div>
                    <Container sx={{justifyContent: 'center', marginLeft:'18.5vw'}}>
                        <Button onClick={()=> setShowUserForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Add User</Button>
                        <Button onClick={()=> setShowRemoveForm(true)} variant="contained" sx={{marginRight: "2vw"}} >Remove User</Button>
                        <Button onClick={()=> setShowFNameEditForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Edit FName</Button>
                        <Button onClick={()=> setShowLNameEditForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Edit LName</Button>
                        <Button onClick={()=> setShowToggleAdminForm(true)} variant="contained" sx={{marginRight: "2vw"}}>Toggle Admin</Button>
                    </Container>
                    <AddUser className="addUser" trigger={showUserForm} setTrigger={setShowUserForm}></AddUser>
                    <RemoveUser className="addUser" trigger={showRemoveForm} setTrigger={setShowRemoveForm}></RemoveUser>
                    <EditUserFName className="addUser" trigger={showFNameEditForm} setTrigger={setShowFNameEditForm}></EditUserFName>
                    <EditUserLName className="addUser" trigger={showLNameEditForm} setTrigger={setShowLNameEditForm} ></EditUserLName>
                    <ToggleUserAdmin className="addUser" trigger={showToggleAdminForm} setTrigger={setShowToggleAdminForm}></ToggleUserAdmin>
                 </CardContent>
            </Card>
            
        </section>
    )
}