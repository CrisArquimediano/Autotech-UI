import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TallerSelect from './TalleresSelect';
import Calendario from './Calendario';


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
            </Grid>
        </React.Fragment>
    );
}
