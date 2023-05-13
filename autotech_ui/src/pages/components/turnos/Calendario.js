import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import turno from '../turnos/turno';
import { Box } from '@mui/material';



const today = dayjs();
const limite = dayjs().add(29, 'day');

//poner en un jason general y juntar con los otros datos
const diaYhora =
    [
        {
            dia: '',
            hora: '',
        }
    ]

const isFeriadoIsMas30Dias = (date) => {
    const mayo25 = '25/05/2023';
    const mayo26 = '26/05/2023';
    const actual = format(new Date(date), 'dd/MM/yyyy');
    return actual === mayo25 || actual === mayo26 || date > limite;
}

function DateValidationShouldDisableDate() {
    const [dia, setDia] = React.useState(today);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Box>
                <DatePicker
                    disablePast
                    defaultValue={today}
                    shouldDisableDate={isFeriadoIsMas30Dias}
                    views={['year', 'month', 'day']}
                    value={dia}
                    onChange={(newValue) => {
                        setDia(newValue);
                        diaYhora.dia = format(new Date(newValue), 'yyyy-MM-dd');
                        console.log(diaYhora.dia)
                        turno.fecha_inicio = format(new Date(newValue), 'yyyy-MM-dd');
                        console.log("Fecha inicio, en el json: ", turno.fecha_inicio)
                        turno.fecha_fin = format(new Date(newValue), 'yyyy-MM-dd');
                        console.log("Fecha fin, en el json: ", turno.fecha_fin)
                    }}
                />
                <><br></br></>
                {
                    dia.day() === 6 && (
                        <HoraDomingo />
                    )
                }
                {
                    dia.day() != 6 && (
                        <HoraNormal />
                    )
                }
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
            <Stack spacing={3} width={200}>
                <TimePicker
                    label="24 hours"
                    defaultValue={horaMinimaDomingo}
                    minTime={horaMinimaDomingo}
                    maxTime={horaMaxDomingo}
                    ampm={false}
                    value={hora}
                    onChange={(newValue) => {
                        setHora(newValue);
                        diaYhora.hora = format(new Date(newValue), 'kk');
                        diaYhora.hora = newValue;
                        console.log(diaYhora.hora);
                        turno.hora_inicio = format(new Date(newValue), 'kk:mm:ss');
                        console.log("Hora inicio en el json: ", turno.hora_inicio);
                        h = new Date(newValue);
                        h.setHours(h.getHours() + 1);
                        turno.hora_fin = format(h, 'kk:mm:ss');
                        console.log("Hora fin en el json: ", turno.hora_fin);
                    }}
                />
            </Stack>
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
            <Stack spacing={3} width={200}>
                <TimePicker
                    label="24 hours"
                    defaultValue={horaMinima}
                    minTime={horaMinima}
                    maxTime={horaMax}
                    ampm={false}
                    value={hora}
                    onChange={(newValue) => {
                        setHora(newValue);
                        diaYhora.hora = format(new Date(newValue), 'kk');
                        console.log(diaYhora.hora)
                        turno.hora_inicio = format(new Date(newValue), 'kk:mm:ss');
                        console.log("Hora inicio en el json: ", turno.hora_inicio);
                        h = new Date(newValue);
                        h.setHours(h.getHours() + 1);
                        turno.hora_fin = format(h, 'kk:mm:ss');
                        console.log("Hora fin en el json: ", turno.hora_fin);
                    }}
                />
            </Stack>
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
