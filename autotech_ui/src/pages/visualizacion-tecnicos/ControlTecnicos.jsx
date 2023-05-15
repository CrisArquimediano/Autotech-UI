import LoggedInLayout from "../components/generales/LoggedInLayout";
import Container from "@mui/material/Container";
import VisualizacionBusquedaTecnicos from "./VisualizacionFiltroBusqueda";
import Header from "../components/generales/Header";
import { Box } from "@mui/material";

const ControlTecnicos = () => {
    return (
        <LoggedInLayout>
        <Box>
            <Box display="flex">
                <Header titulo="Tecnicos" subtitulo="Búsqueda y Filtrado" />
            </Box>
        </Box>
        <Container maxWidth="xl" sx={{ mb: 2 }}>
            <VisualizacionBusquedaTecnicos />
        </Container>
        </LoggedInLayout>
    );
};

export default ControlTecnicos;
