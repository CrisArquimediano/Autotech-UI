import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { format } from 'date-fns';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import HoraNormal from './HorarioNormal';

const today = dayjs();
const limite = dayjs().add(29, 'day');
let diaElegido;

const isFeriadoIsMas30Dias = (date) => {
    const mayo25 = '25/05/2023';
    const mayo26 = '26/05/2023';
    const actual = format(new Date(date), 'dd/MM/yyyy');
    return actual === mayo25 || actual === mayo26 || date > limite;
}

function DateValidationShouldDisableDate() {
    const [value, setValue] = React.useState(dayjs());

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DemoContainer
                components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
            >
                <DemoItem label="Disponibilidad mensual">
                    <DatePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        today
                        disablePast
                        defaultValue={today}
                        shouldDisableDate={isFeriadoIsMas30Dias}
                        views={['year', 'month', 'day']}
                    />
                    <><br></br></>
                    {
                        value.day() === 6 && (
                            <HoraDomingo />
                        )
                    }
                    {
                        value.day() != 6 && (
                            <HoraNormal />
                        )
                    }
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}

const horaMinima = dayjs().set('hour', 8).startOf('hour');

const horaMax = dayjs().set('hour', 11).startOf('hour');

function HoraDomingo() {
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

export default function Calendario() {
    return (
        <>
            <div>
                <DateValidationShouldDisableDate />
            </div>
        </>
    );
}
