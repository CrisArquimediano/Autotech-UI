import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import TooltipCus from "./pages/components/generales/Tooltip";

const navLinksSupervisor = [
  {
    title: "Home",
    path: "/",
    icon: <TooltipCus icon={<HomeIcon />} title='Home'/>,
  },
  {
    title: "Turnos",
    path: "/agendaTaller",
    icon: <TooltipCus icon={<ArticleIcon />} title='Turnos'/>,
  },
  {
    title: "Tecnicos",
    path: "/controlTecnicos",
    icon: <TooltipCus icon={<PersonIcon />} title='Tecnicos'/>,
  },
];

export default navLinksSupervisor;