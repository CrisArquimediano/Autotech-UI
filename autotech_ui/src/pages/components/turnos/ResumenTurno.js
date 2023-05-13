import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import turno from '../turnos/turno'



export default function ResumenTurno() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Resumen del turno
            </Typography>
            <Typography variant="body1">{turno.hora_inicio} hs</Typography>
            <Typography variant="body2">{turno.fecha_inicio}</Typography>
            <Typography variant="body2">Taller: {turno.taller_id}</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>

                    </Typography>
                    <Typography gutterBottom>Patente: {turno.patente}</Typography>
                    <Typography gutterBottom>Tipo de turno: {turno.tipo}</Typography>
                    <Typography gutterBottom>Kilometraje: {turno.frecuencia_km} KM</Typography>

                </Grid>
            </Grid>
        </React.Fragment>

    );
}
