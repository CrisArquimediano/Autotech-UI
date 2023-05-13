import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    title: "Turnos",
    path: "/turnos",
    icon: <ArticleIcon />,
  },
  {
    title: "Tecnicos",
    path: "/visualizarTecnicos",
    icon: <PersonIcon />,
  },
];

export default navLinks;