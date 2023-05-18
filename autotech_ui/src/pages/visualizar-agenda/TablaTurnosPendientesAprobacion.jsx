import { useState, useEffect, useMemo, useCallback } from "react";
import { getTurnosPendientesDeAprobacion } from "../../services/services-Turnos";
import { Box, Button, DialogActions} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MaterialReactTable from "material-react-table";
import Alerts from "../components/generales/Alerts";
import { getDetalleTurno, getCancelarTurno } from "../../services/services-Turnos";
import Popup from './Popup';


const id_taller = `S001`;

const TablaTurnosPendientesDeAprobacion = () => {
  const [turnosPendientesDeAprobacion, setTurnosPendientesDeAprobacion] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [openVerMas, setVerMas] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [errorServidor, setErrorServidor]= useState(false);
  const [detalleTurno, setDetalleTurno] = useState([]);
  const [resCancelar, setResCancelar] = useState([]);
  const [idTurnoCancelar, setIdTurnoCancelar]= useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);

  const traerTurnos = useCallback(() => {
    getTurnosPendientesDeAprobacion(id_taller).then((response) => {
      setTurnosPendientesDeAprobacion(response.data);
      setLoading(false);
    });
  },[]);

  useEffect(() => {
    try{
      traerTurnos();
      setActualizarTabla(false); //Reiniciar el estado de actualizarTabla
    }catch(error){
      console.error("Error al traer los turnos", error);
      setErrorServidor(true);
    }
  }, [traerTurnos, actualizarTabla]);

  const obtenerDetalle = (idTurno) => {
    getDetalleTurno(idTurno).then((response) => {
    setDetalleTurno(response.data);
    console.log(detalleTurno);
  });
};

const cancelarTurno = (idTurno) => {
  try{
      getCancelarTurno(idTurno).then ((response)=>{
      setResCancelar(response.data);
      setActualizarTabla(true); //Para actualizar la tabla despues de cancelar turno
    })
  }catch(error){
    setResCancelar(error.message);
  }
};

const handleCloseSnackbar = (event, reason)=> {
  if (reason === 'clickaway'){
    return;
  }
  setOpenSnackbar(false);
};


  const columnas = useMemo(
    () => [
      {
        accessorKey: "id_turno",
        header: "Turno id",
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
        accessorKey: "tipo",
        header: "Tipo de Turno",
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
      style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem" }}
      sx={{ height: "3.2em" }}
    >
      <Button
        variant="contained"
        sx={{ fontSize: "0.9em", backgroundColor: "rgba(51,51,51,0.75)" }}
        onClick={() => {
          obtenerDetalle(row.original.id_turno);
          setVerMas(true);
        }}
      >
        Ver más
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{ fontSize: "0.9em" }}
        onClick={() => {
          console.log("Cancelar turno", row.original.id_turno);
          setIdTurnoCancelar(row.original.id_turno);
          setOpenCancel(true);
        }}
      >
        Cancelar Turno
      </Button>
    </Box>
  );

  const noData = () => (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Alerts
        title="No hay datos"
        description="No hay datos disponibles en este momento"
        alertType="info"
      />
    </Box>
  );

  return (
    <>
    <MaterialReactTable
      columns={columnas}
      data={turnosPendientesDeAprobacion}
      muiToolbarAlertBannerProps={errorServidor? {color:'error', children: 'Error en servidor.'}: undefined}
      state={{ isLoading: loading, showAlertBanner: errorServidor }}
      positionActionsColumn="last"
      enableRowActions
      renderRowActions={renderRowActions}
      renderEmptyRowsFallback={noData}
      defaultColumn={{ minSize: 10, maxSize: 100 }}
      muiTopToolbarProps={
        {sx: 
          {display:'flex', flexWrap:'inherit', justifyContent:'flex-end', overflow: 'auto', maxHeight: '200px'}
        }
      }
    />
    <Popup title='Cancelar Turno' openDialog={openCancel} setOpenDialog={setOpenCancel} description='¿Está seguro que desea cancelar el turno? No se podrá modificar la acción una vez realizada.'>
      <Box>
        <DialogActions>
          <Button color='primary' variant='outlined'
          onClick={() => {
                      cancelarTurno(idTurnoCancelar);
                      setOpenCancel(false);
                      setOpenSnackbar(true);
            }}>Aceptar</Button>
		      <Button color='error' variant="outlined" onClick={() => {setOpenCancel(false)}}>Cancelar</Button>
        </DialogActions>
      </Box>
		</Popup>
    <Snackbar 
      message={resCancelar} 
      autoHideDuration={4000}
      open={openSnackbar}
      onClose={handleCloseSnackbar}
    />
    <Popup title='Detalle del Turno' openDialog={openVerMas} setOpenDialog={setVerMas} botonRetorno='Atras'>
      {
        Object.entries(detalleTurno).map(([key, value]) => (
          <div key={key}>
            <span><strong>{key}: </strong></span>
            <span>{value} </span>
          </div>
        ))
      }
    </Popup>
    </>
    
  );
};

export default TablaTurnosPendientesDeAprobacion;
