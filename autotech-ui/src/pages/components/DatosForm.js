import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';


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

//Esto debería mostrarlo solo en caso de que ponga service (debería estar visible solo cuando el botón)
//de service está seleccionado
function KmSelect() {
    const [km, setKm] = React.useState('');

    const handleChange = (event) => {
        setKm(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kilómetros</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={km}
                    label="Kilómetros"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>5000 km</MenuItem>
                    <MenuItem value={20}>10000 km</MenuItem>
                    <MenuItem value={30}>15000 km</MenuItem>
                    <MenuItem value={40}>20000 km</MenuItem>
                    <MenuItem value={50}>25000 km</MenuItem>
                    <MenuItem value={60}>30000 km</MenuItem>
                </Select>
            </FormControl>
        </Box>
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
                <Grid item xs={12}>
                    <KmSelect />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}