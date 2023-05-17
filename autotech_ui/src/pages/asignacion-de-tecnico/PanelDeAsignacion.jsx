import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import tecnicoSeleccionado from './tecnicoSeleccionado';
import { Button } from '@mui/material';

/////////////////////////////Lo de MUI + ChatGPT
const YourComponent = () => {
    const [tecnicosData, setTecnicosData] = useState([]);

    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // Fetch tecnicos data from API
        fetchTecnicosData()
            .then(data => {
                if (typeof data === 'object' && Array.isArray(data.tecnicos)) {
                    const rows = data.tecnicos.map((tecnicosItem, index) => ({
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

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 260 },
        { field: 'dni', headerName: 'DNI', width: 130 },
        { field: 'categoria', headerName: 'Categoría', width: 130 },
        { field: 'taller', headerName: 'Taller', width: 130 },
        {
            field: 'fullName',
            headerName: 'Filtro',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 300,
            valueGetter: (params) =>
                `${params.row.nombre || ''}`,
        },
    ];

    const handleRowSelected = (rowData) => {
        const selectedItemId = rowData.row.id; // Access the ID from the rowData.data object
        const selectedItem = tecnicosData.find((item) => item.id === selectedItemId);
        setSelectedItem(selectedItem);
        tecnicoSeleccionado.id = selectedItem.id;
        console.log("Id del técnico en el json: ", tecnicoSeleccionado.id)
    };

    //Acá tengo que llamar a la API y asignarle el turno al técnico y cambiar el estado del turno
    const asignarTecnico = () => {
        if (selectedItem) {
            console.log("Asignar Tecnico: ", selectedItem.id);
            alert("Se ha asignado al técnico seleccionado.")
            console.log("Técnico asignado: ", selectedItem.id);
        } else { alert("Debe seleccionar un técnico.") }
    }

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={tecnicosData}
                    columns={columns}
                    disableMultipleSelection // Disable multiple selection
                    checkboxSelection={false} // Disable checkbox selection
                    onRowClick={(rowData) => handleRowSelected(rowData)} // Add onRowSelected event handler
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





/////////////////////////////Ejemplo básico de tabla en Material


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}



///////////////////////////////////////Tabla sin usar MUI, traer bien los datos del endpoint
const Panel = () => {
    const [headerData, setHeaderData] = useState([]);
    const [checkboxData, setCheckboxData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        // Fetch header data from API
        fetchHeaderData()
            .then(data => {
                if (typeof data === 'object' && !Array.isArray(data)) {
                    const dataArray = Object.values(data);
                    setHeaderData(dataArray);
                } else {
                    console.error('Invalid header data format:', data);
                }
            })
            .catch(error => console.error(error));

        // Fetch checkbox data from API
        fetchCheckboxData()
            .then(data => {
                if (typeof data === 'object' && !Array.isArray(data)) {
                    const dataArray = Object.values(data);
                    setCheckboxData(dataArray);
                } else {
                    console.error('Invalid checkbox data format:', data);
                }
            })
            .catch(error => console.error(error));
    }, []);

    const fetchHeaderData = async () => {
        try {
            const response = await axios.get('https://autotech2.onrender.com/turnos_admin/');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCheckboxData = async () => {
        try {
            const response = await axios.get('https://autotech2.onrender.com/tecnicos/listar/?branch=S001');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };


    const handleCheckboxChange = (itemId) => {
        setSelectedItem(itemId);
    };

    const handleSubmit = () => {
        // Handle submit button click
        if (selectedItem !== null) {
            // Do something with the selected item
            console.log('Selected item:', selectedItem);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {headerData.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {checkboxData.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedItem === item.id}
                                    onChange={() => handleCheckboxChange(item.id)}
                                />
                            </td>
                            {/* Render other columns of data */}
                            <td>{item.column1}</td>
                            <td>{item.column2}</td>
                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default function Mostrar() {
    return (
        <>
            <YourComponent />
        </>
    );
};
