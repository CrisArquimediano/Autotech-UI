import { useState, useEffect, useMemo } from "react";
import { getTurnosTodos } from "../../services/services-Turnos";
import { Box, Button, Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";

import DialogCancel from "./dialogCancel";

//const id_taller=1;

const TablaTurnosPendientes = () => {
  const [turnosPendientes, setTurnosPendientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const columnas = useMemo(
    () => [
      {
        accessorKey: "id_turno",
        header: "Turno id",
      },
      {
        accessorKey: "tipo",
        header: "Tipo de Turno",
      },
      {
        accessorKey: "patente",
        header: "Patente",
      },
      {
        accessorKey: "estado",
        header: "Estado",
      },
      {
        accessorKey: "fecha_inicio",
        header: "Fecha",
      },
      {
        accessorKey: "hora_inicio",
        header: "Hora",
      },
    ],
    []
  );


  const traerTurnos = () => {
    getTurnosTodos().then((response) => {
      setTurnosPendientes(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    traerTurnos();
  }, []);



  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem" }}
      sx={{ height: "3.2em" }}
    >
      <Button
        variant="contained"
        sx={{ fontSize: "0.9em", backgroundColor: "rgba(51,51,51,0.75)" }}
        onClick={() => {
          console.log("Ver más", row.original.id_turno);
        }}
      >
        Ver más
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: "0.9em" }}
        onClick={() => {
          console.log("Asignar Tecnico", row.original.id_turno);
        }}
      >
        Asignar Tecnico
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ fontSize: "0.9em" }}
        onClick={()=> {setOpenDialog(true);
				console.log(row.original)}}
      >
        Cancelar Turno
      </Button>
    </Box>
  );

  const noData = () => (
    <Typography>No hay datos (Aca va el componente alerta de maite)</Typography>
  );

  const agregarTurno = () => (
    <Tooltip title="Agregar turno" placement="right">
      <Button
        variant="contained"
        startIcon={<AddCircleIcon sx={{ height: "2rem" }} />}
        onClick={() => {
          console.log("Agregar turno");
        }}
      >
        Agregar nuevo turno
      </Button>
    </Tooltip>
  );

  return (
		<>
		<MaterialReactTable
		columns={columnas}
		data={turnosPendientes}
		state={{ isLoading: loading }}
		renderTopToolbarCustomActions={agregarTurno}
		positionActionsColumn="last"
		enableRowActions
		renderRowActions={renderRowActions}
		renderEmptyRowsFallback={noData}
    />
		<DialogCancel title='Cancelar Turno' openDialog={openDialog} setOpenDialog={setOpenDialog} >
		</DialogCancel>
		</>
  );
};

export default TablaTurnosPendientes;
