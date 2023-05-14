import LoggedInLayout from "../components/generales/LoggedInLayout";
import Container from '@mui/material/Container';
import VisualizacionBusquedaTecnicos from './VisualizacionFiltroBusqueda'
import Header from '../components/generales/Header'
import { Box } from "@mui/material";

const ControlTecnicos =() => {
    return (
        <LoggedInLayout>
            <Container maxWidth="xl" sx={{mb: 4, padding: 2}}>
                <Box m='5px'>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Header titulo='Tecnicos' subtitulo='Busqueda y Filtrado'/>
                    </Box>
                </Box>
                <VisualizacionBusquedaTecnicos />
            </Container>
        </LoggedInLayout>
    )
}

export default ControlTecnicos;