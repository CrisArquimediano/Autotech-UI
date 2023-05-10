import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Poner en un json general, juntar con los otros datos
const tallerID =
    [
        {
            id: '',
        }
    ]

const talleres =
    [
        {
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

const Taller = ({ T001, T002, T003 }) => {

    const [taller, setTaller] = React.useState('');

    const handleChange = (event) => {
        setTaller(event.target.value);
        tallerID.id = taller;
        console.log(tallerID.id);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Talleres</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={taller}
                label="Talleres"
                onChange={handleChange}
            >
                <MenuItem value={10}>{T001}</MenuItem>
                <MenuItem value={20}>{T002}</MenuItem>
                <MenuItem value={30}>{T003}</MenuItem>
            </Select>
        </FormControl>
    )
}
