import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'
import { Box} from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';

export default function DetalleTrabajos() {
	
	const [listaTecnicos, setTecnicos] = useState([]);
	const [tablaTecnicos, setTablaTecnicos] = useState([]);
	const [detalleTrabajos, setDetalleTrabajos] = useState([]);
	const [mostrarInfo, setMostrarInfo] = useState(false);
	const [seleccionarFila, setSeleccionarFila] = useState(null);

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={mostrarInfo} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Detalle
            </Typography>

            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Patente</TableCell>
                  <TableCell align="center">Fecha inicio</TableCell>
                  <TableCell align="center">Hora inicio</TableCell>
                  <TableCell align="center">Fecha fin</TableCell>
                  <TableCell align="center">Hora fin</TableCell>
                  <TableCell align="center">Tipo</TableCell>
                  <TableCell align="center">Estado</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {detalleTrabajos.map((detalle, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="center">{detalle.patente}</TableCell>
                    <TableCell align="center">{detalle.fecha_inicio}</TableCell>
                    <TableCell align="center">{detalle.hora_inicio}</TableCell>
                    <TableCell align="center">{detalle.fecha_fin}</TableCell>
                    <TableCell align="center">{detalle.hora_fin}</TableCell>
                    <TableCell align="center">{detalle.tipo}</TableCell>
                    <TableCell align="center">{detalle.estado}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
