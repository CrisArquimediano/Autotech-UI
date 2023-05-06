import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function TallerSelect() {
    const [taller, setTaller] = React.useState('');

    const handleChange = (event) => {
        setTaller(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Talleres</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={taller}
                    label="Talleres"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>San Miguel</MenuItem>
                    <MenuItem value={20}>Malvinas Argentinas</MenuItem>
                    <MenuItem value={30}>Morón</MenuItem>
                    <MenuItem value={40}>Ituizango</MenuItem>
                    <MenuItem value={50}>Palermo</MenuItem>
                    <MenuItem value={60}>Colegiales</MenuItem>
                    <MenuItem value={70}>Belgrano</MenuItem>
                    <MenuItem value={80}>Lanús</MenuItem>
                    <MenuItem value={90}>Quilmes</MenuItem>
                    <MenuItem value={100}>El Talar</MenuItem>
                    <MenuItem value={110}>Escobar</MenuItem>
                    <MenuItem value={120}>Pilar</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
