import UserManagement from "../../Widgets/AdminStuff/UserManagement";
import { Box, Typography } from "@mui/material";
import ProductManagement from "../../Widgets/AdminStuff/ProductManagement";

export default function Adminpage(){
    return(
        <section>
            <Box  display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ 
            width: 4/5, backgroundColor: 'primary.main', px: "10vw", py:"3vh"}}>
                <Typography variant="h2">Admin Page</Typography>
            </Box>
            <UserManagement></UserManagement>
            <ProductManagement></ProductManagement>
        </section>
    )
}