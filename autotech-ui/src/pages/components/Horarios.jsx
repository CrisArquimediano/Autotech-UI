import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from "react";
import Fullcalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";

function Horarios() {
    return (
        <div>
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "prev,next", // will normally be on the left. if RTL, will be on the right
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
                }}
                height={"90vh"}
            />
        </div>
    );
}

export default Horarios;