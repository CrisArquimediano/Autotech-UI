import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const horaMinima = dayjs().set('hour', 8).startOf('hour');
const horaMax = dayjs().set('hour', 16).startOf('hour');

export default function HoraNormal() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} width={200}>
                <TimePicker
                    label="24 hours"
                    defaultValue={horaMinima}
                    minTime={horaMinima}
                    maxTime={horaMax}
                    ampm={false}
                />
            </Stack>
        </LocalizationProvider>
    );
}