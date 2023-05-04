import React from "react";
import Link from 'next/link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';


const lastMonday = dayjs().startOf('week');
const nextSunday = dayjs().endOf('week').startOf('day');

const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
};

function DateValidationShouldDisableDate() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
            >
                <DemoItem label="DatePicker">
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

function Calendar() {
    return (
        <>
            <h2>
                <Link href="./turnos-cliente-talleres">Volver</Link>
            </h2>

            <div>
                <DateValidationShouldDisableDate />
            </div>

            <div>
                <Link href="./prueba-api">
                    <h3>técnicos &rarr;</h3>
                    <p>
                        Ver técnicos.
                    </p>
                </Link>
            </div>
        </>
    );
}

export default Calendar;








{/*            
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
            <div>
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "today prev,next", // will normally be on the left. if RTL, will be on the right
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
                    }}
                    height={"90vh"}
                />
            </div> */}