import {useState} from 'react';
import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography} from '@mui/material';
import NavListDrawer from './NavListDrawer';
import MenuIcon from "@mui/icons-material/Menu";
import CarRepairIcon from '@mui/icons-material/CarRepair';
import ArticleIcon from '@mui/icons-material/Article';


const navLinks = [
    {
        title:'Home', path:'../', icon: <CarRepairIcon/>
    },
    {
        title:'Turnos', path:'#Turnos', icon: <ArticleIcon/>
    }
]

export default function Navbar(){
    const [open, setOpen]= useState(false);

    return (
        <>
        <AppBar position='static' style={{padding:0}}>
            <Toolbar>
                <IconButton color="inherit" size="large" onClick={()=> setOpen(true)} sx={{display: {sx:"flex", sm:"none"}}} edge="start">
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' sx={{flexGrow:1}}>KarU - Área Técnica</Typography>
                <Box sx={{display:{xs: "none", sm:"block"}}}> 
                    {
                    navLinks.map(item => (
                        <Link href={item.path}  key={item.title}>
                        <Button color='inherit' key={item.title}> {item.title}</Button>
                        </Link>
                        ))
                    }
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer open={open}
        anchor="left"
        onClose={()=> setOpen(false)}
        sx={{display: {xs:"flex", sm:"none"}}}>
            <NavListDrawer navLinks={navLinks}/>
        </Drawer>
        </>
    )
}