import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { format } from 'date-fns';
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


/////////////////////////////////////////////Taller select
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

        console.log("El json:", disponibilidad);
    } catch (error) {
        console.error(error);
    }
};

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
                            {turno.fecha_inicio !== '' &&
                                (<Hora fecha={turno.fecha_inicio} dias_y_horarios={disponibilidad.dias_y_horarios} />)}
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </LocalizationProvider>
    );
}

function Hora({ dias_y_horarios, fecha }) {
    const [hora, setHora] = React.useState('');

    const handleHoraChange = (event) => {
        const selectedValue = event.target.value;
        setHora(selectedValue);
        turno.hora_inicio = parseInt(selectedValue) + ':00:00';
        h = parseInt(selectedValue) + 1;
        turno.hora_fin = h + ':00:00';
        console.log("Hora inicio:", turno.hora_inicio, "| Hora fin:", turno.hora_fin);
    };

    let h;

    const horariosDisponibles = dias_y_horarios?.find((item) => item.dia === fecha)?.horarios_disponibles;

    return (
        <FormControl fullWidth>
            <InputLabel>Horarios Disponibles</InputLabel>
            <Select value={hora} onChange={handleHoraChange} width='50px' label="Horarios Disponibles">
                <MenuItem value="">Elija una hora, por favor</MenuItem>
                {horariosDisponibles &&
                    horariosDisponibles.map((horaItem) => (
                        <MenuItem key={horaItem} value={horaItem}>
                            {horaItem}
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
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
