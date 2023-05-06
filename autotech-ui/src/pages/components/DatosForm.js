import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RadioButtonsGroup() {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Motivo</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="evaluacion"
                name="radio-buttons-group"
            >
                <FormControlLabel value="service" control={<Radio />} label="Service" />
                <FormControlLabel value="evaluacion" control={<Radio />} label="Evaluación" />
            </RadioGroup>
        </FormControl>
    );
}

export default function DatosForm() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Patente y motivo del turno
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="patente"
                        name="patente"
                        label="Patente"
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <RadioButtonsGroup />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}