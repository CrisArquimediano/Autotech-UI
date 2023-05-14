import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

const navLinksSupervisor = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Turnos",
    path: "/agendaTaller",
    icon: <ArticleIcon />,
  },
  {
    title: "Tecnicos",
    path: "/controlTecnicos",
    icon: <PersonIcon />,
  },
];

export default navLinksSupervisor;