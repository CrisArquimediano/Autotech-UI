import { Box, Typography, Divider} from "@mui/material";
import Navbar from "../components/generales/Navbar";
import Cards from './cards';



const AgendaTaller =() => {
    return (
        <Box sx={{height:'100vh'}}>
            <Navbar />
            <Box >
                <Typography className='text-center' fontSize='3.5rem' variant="h2" sx={{margin:4}}>Agenda | Taller</Typography>
                <Divider sx={{bgcolor:'grey'}}flexItem/>
                <Box sx={{display:'flex',m:1}}>
                    <Cards/>
                </Box>      
            </Box>
        </Box>
    );
}

export default AgendaTaller;