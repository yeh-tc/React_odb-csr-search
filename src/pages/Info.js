import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
export default function Info(){
    let { csrId } = useParams();
    return (
        
        <Typography variant="h3" >Info Page for CSR ID: {csrId}</Typography>
       
     
    );
}