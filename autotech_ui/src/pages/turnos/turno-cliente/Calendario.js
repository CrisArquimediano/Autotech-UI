import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import turno from '../turno'
import disponibilidad from './disponibilidad'
import feriados from './feriados'
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


//Taller select
const tallerAPI = axios.create({
    baseURL: "https://autotech2.onrender.com/talleres_admin/"
});

const Talleres = () => {
    const [talleres, setTalleres] = useState([]);

    useEffect(() => {
        tallerAPI.get().then((response) => {
            setTalleres(response.data);
        });
    }, []);

    const [t, setT] = useState({
        taller: '',
    });

    const guardarCambio = (event) => {
        const { name, value } = event.target;
        setT((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        turno.taller_id = value;
        console.log("Id del taller, json:", turno.taller_id)
    };

    return (
        <Box sx={{ m: 1, minWidth: 80 }}>
            <div className="stock-container">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Talleres</InputLabel>
                    <Select
                        required
                        label="Talleres"
                        type='text'
                        name="taller"
                        value={t.taller}
                        onChange={guardarCambio}
                    >
                        {talleres.map((taller) => (
                            <MenuItem key={taller.id_taller} value={taller.id_taller}>
                                {taller.localidad}
                            </MenuItem>
                        ))}
                    </Select>
                    {
                        //Esto está bien, ahora tiene que recibir la disponibilidad
                        t.taller !== '' && (
                            <Stack spacing={3} width={300} padding={5}>
                                <Grid item xs={12} md={10}>
                                    <DateValidationShouldDisableDate />
                                </Grid>
                            </Stack>
                        )
                    }
                </FormControl>
            </div>
        </Box>
    );
};
//////////////////////////////////////Fin taller select

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const limite = dayjs().add(30, 'day');

/////////////////////////Para traer la disponibilidad de un taller

const fetchAgendaData = async (idTaller) => {
    const agendaEndPoint = `https://autotech2.onrender.com/turnos/dias-horarios-disponibles/${idTaller}/`;

    try {
        const response = await axios.get(agendaEndPoint);
        disponibilidad = response.data;
        // Process the data as needed
        console.log("El json:", disponibilidad);
    } catch (error) {
        // Handle error
        console.error(error);
    }
};

// Example usage
// Fetch data from 'https://autotech2.onrender.com/turnos/dias-horarios-disponibles/1/'
//fetchAgendaData(2); // Fetch data from 'https://autotech2.onrender.com/turnos/dias-horarios-disponibles/2/'







//acá debería agregar disponibilidad según el taller
const isFeriadoIsMas30Dias = (date) => {
    if (turno.taller_id === "") {
        return true;
    }

    const actual = format(new Date(date), 'dd/MM/yyyy');
    const hoy = format(new Date(today), 'dd/MM/yyyy');
    let isFeriado = false;

    for (let dia in feriados) { if (actual === feriados[dia]) { isFeriado = true; } }
    return isFeriado || date > limite || actual === hoy;
}
/////////////////////////////////////////////////////////////////////////////

function DateValidationShouldDisableDate() {
    const [dia, setDia] = React.useState(tomorrow);
    fetchAgendaData(turno.taller_id);

    return (
        //Para que ponga las cosas del calendario en español: adapterLocale="es"
        //Problema: desfasa el calendario, porque arranca desde L y está para arrancar desde Sunday
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Stack spacing={3} width={300}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={10}>
                            <DatePicker
                                disablePast
                                defaultValue={tomorrow}
                                shouldDisableDate={isFeriadoIsMas30Dias}
                                views={['year', 'month', 'day']}
                                value={dia}
                                onChange={(newValue) => {
                                    setDia(newValue);
                                    turno.fecha_inicio = format(new Date(newValue), 'yyyy-MM-dd');
                                    turno.fecha_fin = format(new Date(newValue), 'yyyy-MM-dd');
                                    console.log("Fecha inicio:", turno.fecha_inicio, "| Fecha fin:", turno.fecha_fin)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            {dia.day() === 0 && (<HoraDomingo />)}
                            {dia.day() !== 0 && (<HoraNormal />)}
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
}

//transformarlo en una función que devuelva un array así pero dependiendo la fecha
const disabledHours = [9, 10]; // Example array of disabled hours

const horaMinimaDomingo = dayjs().set('hour', 8).startOf('hour');
const horaMaxDomingo = dayjs().set('hour', 11).startOf('hour');

function HoraDomingo() {
    const [hora, setHora] = React.useState('');
    let h;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label="24 hours"
                defaultValue={horaMinimaDomingo}
                minTime={horaMinimaDomingo}
                maxTime={horaMaxDomingo}
                ampm={false}
                value={hora}
                onChange={(newValue) => {
                    setHora(newValue);
                    turno.hora_inicio = format(new Date(newValue), 'kk:mm:ss');
                    h = new Date(newValue);
                    h.setHours(h.getHours() + 1);
                    turno.hora_fin = format(h, 'kk:mm:ss');
                    console.log("Hora inicio:", turno.hora_inicio, "| Hora fin:", turno.hora_fin);

                }}
                views={['hours']}
                shouldDisableTime={(time) => {
                    const hour = new Date(time);
                    let hora = hour.getHours();
                    return disabledHours.includes(hora);
                }}
            />
        </LocalizationProvider>
    );
}

const horaMinima = dayjs().set('hour', 8).startOf('hour');
const horaMax = dayjs().set('hour', 16).startOf('hour');

function HoraNormal() {
    const [hora, setHora] = React.useState('');
    let h;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                label="24 hours"
                defaultValue={horaMinima}
                minTime={horaMinima}
                maxTime={horaMax}
                ampm={false}
                value={hora}
                onChange={(newValue) => {
                    setHora(newValue);
                    turno.hora_inicio = format(new Date(newValue), 'kk:mm:ss');
                    h = new Date(newValue);
                    h.setHours(h.getHours() + 1);
                    turno.hora_fin = format(h, 'kk:mm:ss');
                    console.log("Hora inicio:", turno.hora_inicio, "| Hora fin:", turno.hora_fin);
                }}
                views={['hours']}
            />
        </LocalizationProvider>
    );
}

export default function Calendario() {
    return (
        <>
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={10}>
                        <Talleres />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
