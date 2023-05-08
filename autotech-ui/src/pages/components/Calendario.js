import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { format } from 'date-fns';

const today = dayjs();

const isFeriado = (date) => {
    const mayo25 = '25/05/2023';
    const mayo26 = '26/05/2023';
    const actual = format(new Date(date), 'dd/MM/yyyy');
    return actual === mayo25 || actual === mayo26
};

//const isMas30Dias = (date) => {}

function DateValidationShouldDisableDate() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DemoContainer
                components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
            >
                <DemoItem label="Disponibilidad">
                    <DatePicker
                        today
                        disablePast
                        defaultValue={today}
                        shouldDisableDate={isFeriado}
                        views={['year', 'month', 'day']}
                    />
                </DemoItem>
            </DemoContainer>
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
