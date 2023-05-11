import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatosForm from './DatosForm';
import TallerAgendaForm from './TallerAgendaForm';
import ResumenTurno from './ResumenTurno';
import turno from '../turnos/turno'
import axios from "axios";
import { useState, useEffect } from "react"

//creería que acá tengo que traerme la API y acá disparar una función crear el turnoooooooooooooooooooooooooooooooooo
const crearTurnoApi = 'https://autotech2.onrender.com/turnos/turnos-create/'

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Autotech
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Datos', 'Disponibilidad', 'Su turno'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <DatosForm />;
        case 1:
            return <TallerAgendaForm />;
        case 2:
            return <ResumenTurno />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function TurnoForm() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        console.log("SE ejecuta handleNext.")
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        console.log("SE ejecuta handleBack.")
        setActiveStep(activeStep - 1);
    };


    /*Referencia
    const Home = () => {

    const [posts, setPosts] = useState([]);

    const apiEndPoint = 'https://api-rest-pp1.onrender.com/api/tecnicos/'
    useEffect(() => {
        const getPosts = async () => {
            const { data: res } = await axios.get(apiEndPoint)
            setPosts(res)
        }
        getPosts()
    }, [])

    return (<>
        <div>
            <h2>Hay {posts.length} técnicos en el taller</h2>
        </div>

    </>)
} */

    /*Ejemplo de POST
    function asdd(patient){
        return axios.post('url',
        {nombre: patient.nom
        apellido: patient.ap
    
    })
        .then(res => {
            return res.data
        })
    } */
    /*Lo que le paso al back (lo que toma)
        dia = request.data.get("fecha_inicio")
        dia_fin = request.data.get("fecha_fin")
        horario_inicio = request.data.get("hora_inicio")
        horario_fin = request.data.get("hora_fin")
        taller_id = request.data.get("taller_id") */
    //Está vacía, lista para mí para usarla, qué bueeeeeeeno
    /*function handleSubmit() {
        console.log("SE ejecuta handleSubmit.")
        return axios.post(crearTurnoApi,
            {
                fecha_inicio: turno.fecha_inicio,
                fecha_fin: turno.fecha_fin,
                hora_inicio: turno.hora_inicio,
                hora_fin: turno.hora_fin,
                taller_id: turno.taller_id
            })
            .then(res => {
                return res.data
            })
    }*/
    /*const handleSubmit = async () => {

        const sendData = async () => {
            const { data: res } = await axios.post(crearTurnoApi, turno)
            sendData(res)
        }
        sendData()
        console.log("Se crea el turno")
    }*/

    /*async function handleSubmit() {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://autotech2.onrender.com/turnos/turnos-create/',
                data: turno,
            })
            console.log("Se crea el turno con:", turno)
            return response
        } catch (e) {
            console.log(e)
        }
    }*/
    async function handleSubmit() {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://autotech2.onrender.com/turnos/turnos-create/',
                data: {
                    fecha_inicio: turno.fecha_inicio,
                    fecha_fin: turno.fecha_fin,
                    hora_inicio: turno.hora_inicio,
                    hora_fin: turno.hora_fin,
                    taller_id: turno.taller_id,
                    patente: turno.patente,
                    tipo: turno.tipo,
                    frecuencia_km: turno.frecuencia_km,
                    estado: turno.estado,
                }
            })
            console.log("Se crea el turno con:", turno)
            return response
        } catch (e) {
            console.log(e.response.data)
        }
    }
    /**axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}); */
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Autotech
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Turno
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Gracias por sacar su turno.
                            </Typography>
                            <Typography variant="subtitle1">
                                Por favor, recuerde asistir con cédula verde al taller. Gracias.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Volver
                                        {console.log(turno)}
                                    </Button>
                                )}
                                {activeStep === steps.length - 1 && (
                                    <Button onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
                                        Enviar Datos
                                        {console.log(turno)}
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                    onSubmit={handleSubmit}
                                >
                                    {console.log(turno)}
                                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}