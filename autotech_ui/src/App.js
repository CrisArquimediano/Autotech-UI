import {Route, Routes} from 'react-router-dom'
import './App.css';
import VisualizacionBusquedaTecnicos from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda'
import TurnoForm from './pages/turnos/turno-cliente/TurnoForm'
import Home from './pages/home/Home'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/turnoForm' element={<TurnoForm />} />
        <Route path='/visualizarTecnicos' element={<VisualizacionBusquedaTecnicos />} />
      </Routes>
    </div>
  );
}

export default App;
