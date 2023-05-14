import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${
        params.getValue('lastName') || ''
      }`,
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

const Tabla = () => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      row.lastName.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={filterText}
        onChange={handleFilterChange}
      />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Tabla;
