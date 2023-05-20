import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import TooltipCus from './pages/components/generales/Tooltip';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const navLinksSupervisor = [
  {
    title: 'Home',
    path: '/',
    icon: <TooltipCus icon={<HomeIcon />} title='Home'/>,
  },
  {
    title: 'Turnos',
    path: '/agendaTaller',
    icon: <TooltipCus icon={<ArticleIcon />} title='Turnos'/>,
  },
  {
    title: 'Tecnicos',
    path: '/controlTecnicos',
    icon: <TooltipCus icon={<PersonIcon />} title='Tecnicos'/>,
  },
  {
    title: 'Mis Turnos',
    path:'/misTurnos',
    icon: <TooltipCus icon={<ReceiptIcon />} title='Mis Turnos'/>
  }, 
  {
    title: 'Checklist Evaluaciones',
    path: '/evaluacionesChecklist',
    icon: <TooltipCus icon={<FactCheckIcon />} title='Checklist Evaluaciones'/>
  }
];


export default navLinksSupervisor;

