import axios from 'axios';

const url='https://autotech2.onrender.com/turnos';

const getTurnosTodos= async () => await axios.get(url+`/turnos-list/`);


export {
    getTurnosTodos
};
