import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
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
                    <Typography gutterBottom>Kilometraje: {turno.kilometraje}</Typography>

                </Grid>
                {/*<Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        {payments.map((payment) => (
                            <React.Fragment key={payment.name}>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography gutterBottom>{payment.detail}</Typography>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid> */} {/*Lp guardo porque me servirá de referencia para hacer algo */}
            </Grid>
        </React.Fragment>

    );
}