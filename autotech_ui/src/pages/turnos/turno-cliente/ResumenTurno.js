import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import turno from '../turno'
import Stack from '@mui/material/Stack';



export default function ResumenTurno() {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Resumen del turno
            </Typography>
            <Grid item xs={12} sm={6}>
                <Typography gutterBottom>Hora: {turno.hora_inicio} hs</Typography>
                <Typography gutterBottom>Fecha: {turno.fecha_inicio}</Typography>
                <Typography gutterBottom>Taller: {turno.taller_id}</Typography>
                <Typography gutterBottom>Patente: {turno.patente}</Typography>
                <Typography gutterBottom>Tipo de turno: {turno.tipo}</Typography>
                <Typography gutterBottom>Kilometraje: {turno.frecuencia_km} KM</Typography>
            </Grid>
        </React.Fragment>

    );
}
