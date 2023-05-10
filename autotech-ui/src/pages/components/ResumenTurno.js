import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const turno = [
    {
        fecha: '8/05/2023',
        hora: '10:00',
        taller: 'San Miguel',
    },
];
const addresses = ['Av. Balbín', '99999', 'San Miguel', 'Buenos Aires', 'Argentina'];


/*const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];
*/

export default function ResumenTurno() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Resumen del turno
            </Typography>
            <List disablePadding>
                {/*turno.map((turnoActual) => (
                    <ListItem key={turnoActual.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={turnoActual.fecha} secondary={turnoActual.hora} />
                        <Typography variant="body2">{turnoActual.taller}</Typography>
                    </ListItem>
                ))*/}

                {/*<ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $00.00
                    </Typography>
                </ListItem>*/}
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>

                    </Typography>
                    <Typography gutterBottom>Patente: AA111AA</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
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