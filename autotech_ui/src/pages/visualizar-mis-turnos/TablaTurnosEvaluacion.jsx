import { useState, useEffect, useMemo } from "react";

import MaterialReactTable from "material-react-table";
import { getDetalleTurno } from "../../services/services-Turnos";
import Alerts from "../components/generales/Alerts";
import { Button } from "@mui/material";

const id_tecnico = 5;

const TablaTurnosEvaluacion = (props) => {
  const [turnosEvaluacion, setTurnosEvaluacion] = useState([]);
  const [actualizarTabla, setActualizarTabla] = useState([]);

  //Para ver los detalles del turno antes de realizarlo
  const [openVerMas, setOpenVerMas] = useState(false);
  const [detalle, setDetalle] = useState([]);

  //Para abrir el popup con la checklist
  const [idTurno, setIdTurno] = useState(0);
  const [openChecklist, setOpenChecklist] = useState(false);

  //alertas de la API
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

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
        accessorKey: "fecha_inicio",
        header: "Fecha de inicio",
      },
      {
        accessorKey: "hora_inicio",
        header: "Hora de inicio",
      },
      {
        accessorKey: "hora_fin",
        header: "Hora de fin",
      },
    ],
    []
  );

	const renderRowActions = ({row}) => (
		<Box
			style={{display:'flex', flexWrap:'nowrap', gap:'0.5rem'}}
			sx={{height:'3.2em'}}
		>
			<Button>
				Ver más
			</Button>
			<Button>
				Realizar evaluacion
			</Button>
		</Box>
	)

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {
					<Alerts 
						alertType={alertType}
						description={alertMessage}
						title={alertTitle}
					/>
				}
      </Box>
			<MaterialReactTable
				columns={columnas}
				data={turnosEvaluacion}
				state={{isLoading: loading}}
				positionActionsColumn='last'
				enableRowActions
				//renderRowActions={renderRowActions}
				//renderEmptyRowsFallback={noData}
				defaultColumn={{minSize:10, maxSize:100}}
				muiTopToolbarProps={{
					sx:{
						display:'flex',
						flexWrap:'inherit',
						justifyContent:'flex-end',
						overflow:'auto',
						maxHeight:'200px',
					},
				}}
			/>

    </>
  );
};

export default TablaTurnosEvaluacion;
