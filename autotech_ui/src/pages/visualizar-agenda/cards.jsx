import React from 'react'
import { Box } from '@mui/material'
import CardTurno from './card'

const cardsTurnos= [
    {
        title: 'Turnos Pendientes', description: 'Pendientes de asignación.', image:'https://images.unsplash.com/photo-1599256630445-67b5772b1204?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', url:'/#TurnosPendientes'
    },{
        title: 'Turnos en Progreso', description: 'Turnos asignados y en progreso.', image:"https://cdn.pixabay.com/photo/2017/10/08/04/45/engine-2828878_1280.jpg", url:'/#TurnosEnProgreso'
    },
    {
        title: 'Turnos Terminados', description: 'Turnos terminados', image:"https://images.unsplash.com/photo-1619252351055-1c0f3ff8259d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80", url:'/#TurnosTerminados'
    },
    {
        title: 'Altas de Turno', description: 'Ingreso de turnos por taller', image:"https://plus.unsplash.com/premium_photo-1661770030805-0abb8fd880f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=976&q=80", url:'/#AltaTurno'
    }
]
//
//


export default function Cards() {
    return (
    <Box className='container p-2' sx={{margin:2.5}}>
        <Box className="row "  sx={{height:'65vh'}}>
            {
            cardsTurnos.map(card => (
                <CardTurno key={card.title}
                title={card.title} image={card.image} description={card.description} />
            ))
            } 
        </Box>
    </Box>
    )
}
