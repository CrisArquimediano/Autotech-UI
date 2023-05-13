import './App.css';
import VisualizacionBusquedaTecnicos from './pages/visualizacion-tecnicos/VisualizacionFiltroBusqueda'
import TurnoForm from './pages/turnos/turno-cliente/TurnoForm'
function App() {
  return (
    <div className="App">

      <VisualizacionBusquedaTecnicos></VisualizacionBusquedaTecnicos>
      <TurnoForm />

    </div>
  );
}

export default App;
