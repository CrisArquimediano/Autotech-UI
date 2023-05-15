import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import turno from '../turno'
import feriados from './feriados'
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from "axios";
import Stack from '@mui/material/Stack';

//debería traer lo de taller select acá y mostrar solo el calendario cuando elige el taller


//Traer talleres desde la API, de ahí obtengo id y nombre, etc.
//https://autotech2.onrender.com/talleres_admin/















const today = dayjs();
const limite = dayjs().add(29, 'day');

//acá debería agregar disponibilidad según el taller
const isFeriadoIsMas30Dias = (date) => {
    const actual = format(new Date(date), 'dd/MM/yyyy');
    let isFeriado = false;

    for (let dia in feriados) { if (actual === feriados[dia]) { isFeriado = true; } }
    return isFeriado || date > limite;
}


/////////////////////////////referencia para armar lo de la disponibilidad

async function disponibilidad() {
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
/////////////////////////////////////////////////////////////////////////////

function DateValidationShouldDisableDate() {
    const [dia, setDia] = React.useState(today);

    return (
        //Para que ponga las cosas del calendario en español
        //Problema: desfasa el calendario, porque arranca desde L y está para arrancar desde Sunday
        //adapterLocale="es"
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box>
                <Stack spacing={3} width={300}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={10}>
                            <DatePicker
                                disablePast
                                defaultValue={today}
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
                            {dia.day() != 0 && (<HoraNormal />)}
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
}

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
            />
        </LocalizationProvider>
    );
}

export default function Calendario() {
    return (
        <>
            <div>
                <DateValidationShouldDisableDate />
            </div>
        </>
    );
}
