import { Route, Routes } from 'react-router-dom'
import './App.css';

import TurnoForm from './pages/turnos/turno-cliente/TurnoForm'
import Home from './pages/home/Home'
import ControlTecnicos from './pages/visualizacion-tecnicos/ControlTecnicos.jsx';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import AsignacionDeTecnicos from './pages/asignacion-de-tecnico/PanelDeAsignacion'
import ChecklistEvaluacion from './pages/checklist-evaluacion/Checklist';
import MisTurnos from './pages/visualizar-mis-turnos/MisTurnos';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/turnoForm' element={<TurnoForm />} />
        <Route path='/controlTecnicos' element={<ControlTecnicos />} />
        <Route path='/agendaTaller' element={<AgendaTaller />} />
        <Route path='/asignarTecnico' element={<AsignacionDeTecnicos />} />
        <Route path='/evaluacioneaChecklist' element={<ChecklistEvaluacion />} />
        <Route path='/misTurnos' element={<MisTurnos />} />
      </Routes>
    </div>
  );
}

export default App;
