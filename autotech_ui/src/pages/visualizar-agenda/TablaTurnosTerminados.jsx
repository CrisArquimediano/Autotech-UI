import { useState, useEffect, useMemo } from "react";
import { getTurnosTodos } from "../../services/services-Turnos";
import { Box, Button, Typography } from "@mui/material";
import MaterialReactTable from "material-react-table";

//const id_taller=1;

const TablaTurnosTerminados = () => {
  const [turnosTerminados, setTurnosTerminados] = useState([]);
  const [loading, setLoading] = useState(true);

  const traerTurnos = () => {
    getTurnosTodos().then((response) => {
      setTurnosTerminados(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    traerTurnos();
  }, []);

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
        accessorKey: "tecnico_id",
        header: "Tecnico id",
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

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem"}}
      sx={{ height: "3.5em" }}
    >
      <Button
        variant="contained"
        color='secondary'
        sx={{fontSize:'1em'}} 
        onClick={() => {
          console.log("Ver mas", row.original.id_turno);
        }}
      >
        Ver más
      </Button>
    </Box>
  );

  const noData = () => (
    <Typography>No hay datos (Aca va el componente alerta de maite)</Typography>
  );

  return (
    <MaterialReactTable
      columns={columnas}
      data={turnosTerminados}
      state={{ isLoading: loading }}
      positionActionsColumn="last"
      enableRowActions
      renderRowActions={renderRowActions}
      renderEmptyRowsFallback={noData}
    />
  );
};

export default TablaTurnosTerminados;
