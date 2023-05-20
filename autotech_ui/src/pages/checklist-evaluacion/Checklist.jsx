import { Box, Container, Divider, Typography } from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import Slider from "@mui/material/Slider";

import LoggedInLayout from "../components/generales/LoggedInLayout";
import Header from "../components/generales/Header";

const ChecklistEvaluacion = () => {
  const [puntajeMaximo, setPuntajeMaximo] = useState([]);

  const columnas = useMemo(
    () => [
      {
        accessorKey: "elemento",
        header: "Partes del auto",
      },
      {
        accessorKey: "tarea",
        header: "Tarea",
      },
    ],
    []
  );

  const renderRowActions = ({ row }) => (
    <Box
      style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem" }}
      sx={{ height: "3.5em" }}
    >
      <Slider
        aria-label="Puntaje máximo"
        defaultValue={0}
        valueLabelDisplay="auto"
        valueLabelFormat=""
        step={5}
        marks
        min={0}
        max={110} //el maximo es variable
      />
    </Box>
  );

  return (
    <LoggedInLayout>
      <Box mt="5px">
        <Box display="flex">
          <Header titulo="Evaluaciones" subtitulo="Checklist" />
        </Box>
      </Box>

      <Divider sx={{ color: "silver" }} />

      <Container maxWidth="xxl" sx={{ mb: 2 }}>
        <MaterialReactTable
          columns={columnas}
          data={"aca irian los elementos y tareas"}
          enableTopToolbar={false}
          enableRowSelection
          positionActionsColumn="last"
          enableRowActions
          renderRowActions={renderRowActions}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              header: "Puntaje",
            },
          }}
          //renderEmptyRowsFallback={noData}
          //muiToolbarAlertBannerProps={errorServidor? {color:'error', children: 'Error en servidor.'}: undefined}
          //state={{ isLoading: loading, showAlertBanner: errorServidor }}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
          muiTopToolbarProps={{
            sx: {
              display: "flex",
              flexWrap: "inherit",
              justifyContent: "flex-end",
              overflow: "auto",
              maxHeight: "200px",
            },
          }}
        />
      </Container>
    </LoggedInLayout>
  );
};

export default ChecklistEvaluacion;
