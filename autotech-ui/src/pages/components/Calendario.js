import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';


const lastMonday = dayjs().startOf('week');
const nextSunday = dayjs().endOf('week').startOf('day');

const isWeekend = (date) => {
    const month = date.month();
    const day = date.day();

    return day === 0 || day === 6;
};

function DateValidationShouldDisableDate() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <DemoContainer
                components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
            >
                <DemoItem label="Disponibilidad">
                    <DatePicker
                        defaultValue={nextSunday}
                        shouldDisableDate={isWeekend}
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
