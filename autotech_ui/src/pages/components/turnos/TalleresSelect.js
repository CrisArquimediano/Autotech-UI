import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import turno from '../turnos/turno'
import { useState, useEffect } from "react"

const talleres =
    [
        {
            San_Miguel: 'T001',
            Malvinas_Argentinas: 'T002',
            Belgrano: 'T003',
            T001: 'San Miguel',
            T002: 'Malvinas Argentinas',
            T003: 'Belgrano',
        }
    ]

//tiene que recibir de TallerAgendaForm los talleres (T001, T002, T003)
export default function TallerSelect() {
    return (
        <Box sx={{ minWidth: 120 }}>
            <div className="stock-container">
                {talleres.map((data, key) => {
                    return (
                        <Taller key={key}
                            San_Miguel={data.San_Miguel}
                            Malvinas_Argentinas={data.Malvinas_Argentinas}
                            Belgrano={data.Belgrano}
                            T001={data.T001}
                            T002={data.T002}
                            T003={data.T003}

                        />
                    );
                })}
            </div>
        </Box>
    );
}

const Taller = ({ San_Miguel, Malvinas_Argentinas, Belgrano, T001, T002, T003 }) => {

    /////////////////////////////////////////////////////////////// Nuevo

    const [t, setT] = useState({
        taller: '',
    });

    const guardarCambio = (event) => {
        const { name, value } = event.target;
        setT((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(value)
        turno.taller_id = value;
        console.log("Id del taller, json:", turno.taller_id)
    };
    ////////////////////////////////////////////////////////////////////////////////

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Talleres</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                type='text'
                name="taller"
                value={t.taller}
                onChange={guardarCambio}
            >
                <MenuItem value={San_Miguel}>{T001}</MenuItem>
                <MenuItem value={Malvinas_Argentinas}>{T002}</MenuItem>

            </Select>
        </FormControl>
    )
}
