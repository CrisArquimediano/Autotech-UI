import { Box, ListItem, List, ListItemText, ListItemIcon, ListItemButton } from "@mui/material";
import Link from "next/link";


export default function NavListDrawer({navLinks}){
    return (
        <Box sx={{width: 250}}>
            <nav>
                <List>
                    {
                        navLinks.map(item => (
                            <Link  href={item.path} key={item.title}>
                            <ListItem disablePadding key={item.title}> 
                                <ListItemButton>
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        ))
                    }
                </List>
            </nav>
        </Box>
    )
}