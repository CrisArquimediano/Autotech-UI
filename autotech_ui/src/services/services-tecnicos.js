import axios from 'axios';

const url='https://autotech2.onrender.com/tecnicos';

const getTurnosEvaluacion = async (tecnicoId)=> await axios.get(url + `/trabajos-en-proceso-evaluacion/${tecnicoId}/`);

const getTurnosService = async (tecnicoId)=> await axios.get(url+`/trabajos-en-proceso-service/${tecnicoId}/`);

const getTurnosReparacion = async (tecnicoId)=> await axios.get(url+`/trabajos-en-proceso-reparacion/${tecnicoId}/`);

const getTurnosExtraodinario = async (tecnicoId) => await axios.get(url+`/trabajos-en-proceso-extraodinarios/${tecnicoId}/`);

export {
    getTurnosEvaluacion,
    getTurnosReparacion,
    getTurnosService,
    getTurnosExtraodinario,
};