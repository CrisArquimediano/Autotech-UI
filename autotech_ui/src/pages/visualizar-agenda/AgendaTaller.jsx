import { Box, Container, Grid, Paper } from "@mui/material";

import Cards from "./cards";
import LoggedInLayout from "../components/generales/LoggedInLayout";
import Header from "../components/generales/Header";

const AgendaTaller = () => {
    return (
    <LoggedInLayout>
        <Box m="5px">
            <Box display="flex">
            <Header titulo="Turnos" subtitulo="Agenda del taller" />
            </Box>
        </Box>
        <Container maxWidth="xl" sx={{mb: 2, padding: 2}}>
            <Grid container spacing={2} >
                <Grid item xs={6} sm={3} md={3} lg={3}>
                <Paper
                    className='mb-2' 
                sx={{p: 2, display: 'flex', flexDirection: 'column', height: 200, borderRadius: '15px'}}
                elevation={5}
                >
                </Paper>
                </Grid>
            </Grid>
        </Container>
    </LoggedInLayout>
    );
};

export default AgendaTaller;
