import {Route, Routes} from 'react-router-dom'
import './App.css';

import TurnoForm from './pages/turnos/turno-cliente/TurnoForm'
import Home from './pages/home/Home'
import ControlTecnicos from './pages/visualizacion-tecnicos/ControlTecnicos.jsx';
import AgendaTaller from './pages/visualizar-agenda/AgendaTaller';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/turnoForm' element={<TurnoForm />} />
        <Route path='/controlTecnicos' element={<ControlTecnicos />} />
        <Route path='/agendaTaller' element={<AgendaTaller />} />
      </Routes>
    </div>
  );
}

export default App;
