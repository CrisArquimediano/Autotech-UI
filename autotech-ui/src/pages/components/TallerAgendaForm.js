import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TallerSelect from './TalleresSelect';
import Calendario from './Calendario';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function TallerAgendaForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Talleres y Agenda Disponible
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={10}>
                    <TallerSelect />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Calendario />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Horas />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

function Horas() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} width={200}>
                <TimePicker
                    label="24 hours"
                    defaultValue={dayjs('2022-04-17T18:30')}
                    ampm={false}
                />
            </Stack>
        </LocalizationProvider>
    );
}