import { Route, Routes } from 'react-router-dom'
import './App.css';

import TurnoForm from './pages/turnos/turno-cliente/TurnoForm'
import Home from './pages/home/Home'
import ControlTecnicos from './pages/visualizacion-tecnicos/ControlTecnicos.jsx';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';
import AsignacionDeTecnicos from './pages/asignacion-de-tecnico/PanelDeAsignacion'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/turnoForm' element={<TurnoForm />} />
        <Route path='/controlTecnicos' element={<ControlTecnicos />} />
        <Route path='/agendaTaller' element={<AgendaTaller />} />
        <Route path='/asignarTecnico' element={<AsignacionDeTecnicos />} />
      </Routes>
    </div>
  );
}

export default App;
