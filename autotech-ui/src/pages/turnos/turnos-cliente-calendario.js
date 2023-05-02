import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Link from 'next/link';

function Calendar() {
    return (
        <>
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
            </div>
            <h2>
                <Link href="./turnos-cliente-motivo">Volver</Link>
            </h2>
        </>
    );
}

export default Calendar;