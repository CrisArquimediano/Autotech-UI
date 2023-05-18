import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/////////////////////////////Lo de MUI + ChatGPT
//Integrar con lo de Cami, hacer que reciba el id del turno como prop
const AsignacionDeTecnicos = () => {
    const [tecnicosData, setTecnicosData] = useState([]);

    //El técnico seleccionado de la lisa de técnicos
    const [selectedItem, setSelectedItem] = useState(null);

    const [turnoInfo, setTurnoInfo] = useState(null);

    const [tecnicosDisponibles, setTecnicosDisponibles] = useState([]);

    useEffect(() => {
        fetchTecnicosDisponibles(29)
            .then(data => {
                if (typeof data === 'object' && Array.isArray(data.tecnicos_disponibles)) {
                    const ids = data.tecnicos_disponibles.map(item => item.id_tecnico);
                    setTecnicosDisponibles(ids);
                } else {
                    console.error('Invalid tecnicos_disponibles data format:', data);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const fetchTecnicosDisponibles = async (idTurno) => {
        try {
            const response = await axios.get(`https://autotech2.onrender.com/turnos/tecnicos-disponibles/${idTurno}/`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch turno data from API
        fetchTurnoData(29)
            .then(data => {
                setTurnoInfo(data);
            })
            .catch(error => console.error(error));
    }, []);

    const fetchTurnoData = async (idTurno) => {
        const turnoEndPoint = `https://autotech2.onrender.com/turnos/turnos-detalle/${idTurno}/`;

        try {
            const response = await axios.get(turnoEndPoint);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch tecnicos data from API
        fetchTecnicosData()
            .then(data => {
                if (typeof data === 'object' && Array.isArray(data.tecnicos)) {
                    const rows = data.tecnicos.map((tecnicosItem) => ({
                        id: tecnicosItem.id_empleado,
                        nombre: tecnicosItem.nombre_completo,
                        dni: tecnicosItem.dni,
                        categoria: tecnicosItem.categoria,
                        taller: tecnicosItem.branch,
                        selected: false,
                    }));
                    setTecnicosData(rows);
                } else {
                    console.error('Invalid tecnicos data format:', data);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const fetchTecnicosData = async () => {
        try {
            const response = await axios.get('https://autotech2.onrender.com/tecnicos/listar/?branch=S002');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleRowSelected = (rowData) => {
        const selectedItemId = rowData.row.id; // Access the ID from the rowData.data object
        const selectedItem = tecnicosData.find((item) => item.id === selectedItemId);
        setSelectedItem(selectedItem);
    };

    //Ahora tengo que llamar a la API y asignarle el turno al técnico (¿se hace solo?),
    //asignar el técnico al turno (la otra parte de lo de arriba) y cambiar el estado del turno
    //endpoint para asignar técnico al turno: turnos/asignar-tecnico/<int: id_tecnico>/<int: id_turno>/
    //endpoint para modificar el estado del turno: turnos/turnos-update/<int: id_turno>/

    const asignarTecnico = () => {
        if (selectedItem) {
            const idTecnico = selectedItem.id;
            const idTurno = 29; // Replace with the actual ID of the turno

            const urlAsignarTecnico = `https://autotech2.onrender.com/turnos/asignar-tecnico/${idTecnico}/${idTurno}/`;
            const urlModificarTurno = `https://autotech2.onrender.com/turnos/turnos-update/${idTurno}/`;

            axios
                .post(urlAsignarTecnico)
                .then(response => {
                    // Handle the response
                    console.log(response);
                    alert("Se ha asignado al técnico seleccionado.");
                    console.log("Técnico asignado:", selectedItem.id);
                })
                .catch(error => {
                    // Handle the error
                    console.error(error.response);
                });

            const payload = {
                estado: 'en proceso' // Replace 'nuevoEstado' with the desired updated value
            };

            axios
                .post(urlModificarTurno, payload)
                .then(response => {
                    // Handle the response
                    console.log(response);
                    alert("Se ha asignado al técnico seleccionado.");
                    console.log("Técnico asignado:", selectedItem.id);
                })
                .catch(error => {
                    // Handle the error
                    console.error(error.response);
                });
        } else {
            alert("Debe seleccionar un técnico.");
        }
    };


    return (
        <div>
            <h1>Asignar turno a un técnico</h1>
            <br></br>
            <EnhancedTableToolbar titulo='Turno' />
            <DataGrid
                rows={turnoInfo ? [turnoInfo] : []} // Set turnoInfo as the rows data
                columns={[
                    { field: 'id_turno', headerName: 'ID', width: 70 },
                    { field: 'tipo', headerName: 'Tipo', width: 130 },
                    { field: 'estado', headerName: 'Estado', width: 130 },
                    { field: 'fecha_inicio', headerName: 'Fecha de inicio', width: 150 },
                    { field: 'hora_inicio', headerName: 'Hora de inicio', width: 150 },
                    { field: 'hora_fin', headerName: 'Hora de fin', width: 130 },
                    { field: 'frecuencia_km', headerName: 'Frecuencia (km)', width: 160 },
                    { field: 'papeles_en_regla', headerName: 'Papeles en regla', width: 160 }
                ]}
                pageSize={5}
                getRowId={(row) => row.id_turno} // Specify the custom id for each row
            />
            <br></br>
            <EnhancedTableToolbar titulo='Técnicos' />
            <div style={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={tecnicosData.filter(item => tecnicosDisponibles.includes(item.id))}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70 },
                        { field: 'nombre', headerName: 'Nombre', width: 280 },
                        { field: 'dni', headerName: 'DNI', width: 130 },
                        { field: 'categoria', headerName: 'Categoría', width: 130 },
                        { field: 'taller', headerName: 'Taller', width: 130 },
                        {
                            field: 'fullName',
                            headerName: 'Filtro',
                            description: 'This column has a value getter and is not sortable.',
                            sortable: false,
                            width: 300,
                            valueGetter: (params) => `${params.row.nombre || ''}`,
                        },
                    ]}
                    disableMultipleSelection
                    checkboxSelection={false}
                    onRowClick={(rowData) => handleRowSelected(rowData)}
                    selectionModel={selectedItem ? [selectedItem.id] : []} // Set the selected item ID as the selectionModel
                    pageSize={5}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "0.9em" }}
                    onClick={() => { asignarTecnico() }}
                >Asignar</Button>
            </div>
        </div>
    );
};

////////////////probar poner un toolbar

function EnhancedTableToolbar({ titulo }) {


    return (
        <Toolbar>
            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
            </Typography>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {titulo}
            </Typography>
        </Toolbar>
    );
}

export default AsignacionDeTecnicos;
