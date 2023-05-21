/* eslint-disable react/react-in-jsx-scope */
import { Box, Container, Divider } from '@mui/material';
import Header from '../components/generales/Header';
import { TabMisTurnos } from './TabMisTurnos';
import LoggedInLayout from '../components/generales/LoggedInLayout'

const MisTurnos = () => (
  <>
  <LoggedInLayout>
    <Box mt="5px">
      <Box display="flex">
        <Header titulo="Mis Turnos" subtitulo="Área de trabajo" />
      </Box>
    </Box>
    <Divider sx={{ color: 'silver' }} />
    <Container maxWidth="xxl" sx={{ mb: 2 }}>
      <TabMisTurnos />
    </Container>
    </LoggedInLayout>
  </>
);

export default MisTurnos;
