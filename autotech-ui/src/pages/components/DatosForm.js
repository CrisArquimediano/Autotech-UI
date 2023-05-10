import * as React from 'react';
import { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import { Input } from '@mui/material';

//poner en un json general y juntar con los otros datos
const inputCliente = {
    patente: '',
    tipoDeTurno: '',
    kilometraje: '',
};

function ControlledRadioButtonsGroup() {
    //Tipo de turno
    const [value, setValue] = React.useState('evaluacion');

    //para guardar el input del cliente
    const guardarTipoDeTurno = (event) => {
        setValue(event.target.value);
        inputCliente.tipoDeTurno = value;
        console.log(inputCliente.tipoDeTurno)
    };

    //Kilometraje
    const [km, setKm] = React.useState('');

    const handleClick = (event) => {
        setKm(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Tipo de turno</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={guardarTipoDeTurno}
            >
                <FormControlLabel
                    value="evaluacion"
                    control={<Radio />}
                    label="Evaluacion"
                    onClick={handleClick} />
                <FormControlLabel
                    value="service"
                    control={<Radio />}
                    label="Service"
                    onClick={handleClick} />
                <br></br>
                {
                    km === "service" && (
                        < Kilometraje />
                    )
                }
            </RadioGroup>
        </FormControl>
    );
}


//Esto se muestra solo en caso de que ponga service
function Kilometraje() {
    const [km, setKm] = React.useState('');

    const handleChange = (event) => {
        setKm(event.target.value);
        inputCliente.kilometraje = km;
        console.log(inputCliente.kilometraje);
    };


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Kilometraje</FormLabel>
                <Input
                    type='number'
                    name="kilometraje"
                    onChange={handleChange}
                    placeholder="Ejemplo: 4724 km"
                    className="form-control form-control-lg mb-2">Kilometraje</Input>
            </FormControl>
        </Box>
    );
}

export default function DatosForm() {
    const [patente, setPatente] = React.useState('');

    const handleChange = (event) => {
        setPatente(event.target.value);
        inputCliente.patente = patente;
        console.log(inputCliente.patente);
    };
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
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ControlledRadioButtonsGroup />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}