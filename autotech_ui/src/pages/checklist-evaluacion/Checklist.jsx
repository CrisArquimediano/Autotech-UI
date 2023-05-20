import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect, useMemo, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import Slider from "@mui/material/Slider";
import DialogActions from "@mui/material/DialogActions";

import LoggedInLayout from "../components/generales/LoggedInLayout";
import Header from "../components/generales/Header";
import Popup from "../components/generales/DialogPopup";

import { getChecklistEvaluaciones } from "../../services/services-checklist";

const ChecklistEvaluacion = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [puntajeMaximo, setPuntajeMaximo] = useState([]);
  const [loading, setLoading] = useState(true);
  //alertas de la API
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  /*Trae todos los tecnicos, cuando los campos estan vacios*/
  const traerChecklist = () => {
    getChecklistEvaluaciones()
      .then((response) => {
        setEvaluaciones(response.data);
        setLoading(false);
        setAlertType("");
      })
      .catch((error) => {
        setAlertMessage(
          "Ha ocurrido un error, disculpe las molestias. Intente nuevamente más tarde."
        );
        setAlertType("error");
        setAlertTitle("Error de servidor");
        console.log(error);
      });
  };

  const columnas = useMemo(
    () => [
      {
        accessorKey: "elemento",
        header: "Partes del auto",
        width: 50,
      },
      {
        accessorKey: "tarea",
        header: "Tarea",
        width: 120,
      },
    ],
    []
  );

  const renderRowActions = ({ row, puntajeMaximo }) => (
    <Box
      style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem" }}
      sx={{ height: "3.5em" }}
    >
      <Slider
        aria-label="Puntaje máximo"
        defaultValue={0}
        valueLabelDisplay="auto"
        valueLabelFormat="puntaje"
        step={5}
        marks
        min={0}
        max={puntajeMaximo} //el maximo es variable
      />
    </Box>
  );

  useEffect(() => {
    traerChecklist();
  }, []);

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
          data={evaluaciones}
          state={{ isLoading: loading }}
          enableTopToolbar={false}
          enableRowSelection
          positionActionsColumn="last"
          enableRowActions
          renderRowActions={(params) =>
            renderRowActions({ row: params.row, puntajeMaximo: params.row.puntaje_max })}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              header: "Puntaje",
            },
          }}
          defaultColumn={{ minSize: 10, maxSize: 100 }}
        />
      </Container>

      <Popup
        title="Finalizar Turno"
        //openDialog={openFinalizar}
        //setOpenDialog={setOpenFinalizar}
        description="¿Está seguro que desea enviar la evaluación? No se podrá modificar una vez enviada."
      >
        <Box>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              //onClick={() => {
                //finalizarTurno(idTurnoFinalizar);
                //setOpenFinalizar(false);
                //setOpenSnackbar(true);
              //}}
            >
              Aceptar
            </Button>
            <Button
              color="error"
              variant="outlined"
              //</DialogActions>onClick={() => {
                //setOpenFinalizar(false);
              //}}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Box>
      </Popup>
    </LoggedInLayout>
  );
};

export default ChecklistEvaluacion;
