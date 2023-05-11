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
import turno from '../turnos/turno'
import { number } from 'yup';

//Acá obtengo tipo de turno, kilometraje y patente

//poner en un json general y juntar con los otros datos
const inputCliente = {
    patente: '', //string
    tipoDeTurno: '', //string
    kilometraje: '', //nro
};

function ControlledRadioButtonsGroup() {
    //Tipo de turno
    const [value, setValue] = React.useState('evaluacion');

    //para guardar el input del cliente
    const guardarTipoDeTurno = (event) => {
        setValue(event.target.value);
        inputCliente.tipoDeTurno = value;
        console.log(inputCliente.tipoDeTurno)
        turno.tipo = value;
        console.log('Tipo de turno cargado en el json:', turno.tipo)
    };

    //Para mostrar input de Kilometraje o no mostrarlo, según tipo de turno
    const [kmInput, setKmInput] = React.useState('');

    const handleClick = (event) => {
        setKmInput(event.target.value);
    };


    const [tipo, setTipo] = useState({
        tipoTurno: '',
    });
    const guardarCambio = (event) => {
        const { name, value } = event.target;
        setTipo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(value)
        turno.kilometraje = value;
        console.log('Kilometraje cargado en el json:', turno.kilometraje)
    };

    return (
        <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Tipo de turno</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="tipo"
                value={tipo.tipoTurno}
                onChange={guardarCambio}
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
                    kmInput === "service" && (
                        < Kilometraje />
                    )
                }
            </RadioGroup>
        </FormControl>
    );
}


//Esto se muestra solo en caso de que ponga service
function Kilometraje() {

    const [km, setKm] = useState({
        km1: '',
    });

    const guardarCambio = (event) => {
        const { name, value } = event.target;
        setKm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(value)
        turno.kilometraje = value;
        console.log('Kilometraje cargado en el json:', turno.kilometraje)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <FormLabel id="demo-radio-buttons-group-label">Kilometraje</FormLabel>
                <Input
                    type='number'
                    name="km1"
                    value={km.km1}
                    onChange={guardarCambio}
                    placeholder="Ejemplo: 4724 km"
                    className="form-control form-control-lg mb-2">Kilometraje</Input>
            </FormControl>
        </Box>
    );
}


/*export default function DatosForm() {
    const [patente, setPatente] = React.useState('');

    const handleChange = (event) => {
        setPatente(event.target.value);
        inputCliente.patente = patente;
        console.log(inputCliente.patente);
        turno.patente = patente;
        console.log('Patente cargada en el json:', turno.patente)
    };


    const [valoresCampos, setValoresCampos] = useState({
        campo1: '',
        campo2: '',
        campo3: '',
    });

    const manejarCambio = (event) => {
        const { name, value } = event.target;
        setValoresCampos((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(value)
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
                        value={patente}
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
                <input type="text" name="campo1" value={valoresCampos.campo1} onChange={manejarCambio} />
                <input type="text" name="campo2" value={valoresCampos.campo2} onChange={manejarCambio} />
                <input type="text" name="campo3" value={valoresCampos.campo3} onChange={manejarCambio} />
            </Grid>
        </React.Fragment>
    );
}*/

export default function DatosForm() {
    const [patente, setPatente] = React.useState('');

    const handleChange = (event) => {

        const { name, value } = event.target;
        setPatente((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        inputCliente.patente = value;

        console.log(inputCliente.patente);
        turno.patente = value;
        console.log('Patente cargada en el json:', turno.patente)
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