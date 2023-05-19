import { Typography } from "@mui/material";





export default function LoginError(props){

    return (props.trigger) ? (
        <section >
            <Typography variant="h5" marginLeft={"12vw"} marginBottom={"4vh"} >User ID not found.</Typography>
        </section>
    ) : "";
}