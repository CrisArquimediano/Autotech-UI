import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TallerSelect from './TalleresSelect';
import Calendario from './Calendario';
import { useState, useEffect } from "react"
import axios from "axios";

//Este sería mi componente padre, acá consigo los datos de la API y se los paso para que los muestren
//los talleres y la disponibilidad

export default function TallerAgendaForm() {

    const [posts, setPosts] = useState([]);

    const apiEndPoint = 'https://autotech.onrender.com/turnos/horarios-disponibles/T001'
    useEffect(() => {
        const getPosts = async () => {
            const { data: res } = await axios.get(apiEndPoint)
            setPosts(res)
        }
        getPosts()
    }, [])


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Talleres y Agenda Disponible
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={10}>
                    <TallerSelect />
                </Grid>
                <Grid item xs={12} md={10}>
                    <Calendario />
                </Grid>
            </Grid>
            <div className="stock-container">
                {/*posts.map((data, key) => {
                    return (
                        <div key={key}>
                            {data.dia}
                        </div>
                    );
                })*/}
            </div>
        </React.Fragment>
    );
}
