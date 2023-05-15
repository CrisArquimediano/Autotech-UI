import * as React from 'react';
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography';
import  {Box, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';


import { useState } from 'react';

function TabPanel(props){
    const {children, value, index, ...other}=props;
    return (
        <div role='tabpanel' hidden={value!==index} id={`simple-tabpanel-${index}`}
        {...other}>
            {value === index && (
            <Box sx={{p:3}}>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

TabPanel.prototypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


function allyProps(index){
    return {
        id:`simple-tab-${index}`,
        'aria-controls':`simple-tabpanel-${index}`,
    };
}

export const SimpleTabTurnos = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom:1 , borderColor: 'silver'}}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' indicatorColor='secondary' >
                <Tab label='Turnos Pendientes' {...allyProps(0)} />
                <Tab label='Turnos en Progreso' {...allyProps(1)} />
                <Tab label='Turnos Terminados' {...allyProps(2)} />
            </Tabs>
        </Box>
            <TabPanel value={value} index={0}>
            Tabla turnos pendientes

            </TabPanel>
            <TabPanel value={value} index={1}>
            Tabla turnos en progreso
            </TabPanel>
            <TabPanel value={value} index={2}>
            Tabla turnos terminados
            </TabPanel>

    </Box>
    ) 
}
