import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../components/generales/Copyright';
import LoggedInLayout from '../components/generales/LoggedInLayout';
import Header from '../components/generales/Header'
import { Box, CardContent} from '@mui/material';


const Home = () => {
  return (
    <LoggedInLayout>
      <Box m='5px'>
        <Box display='flex'>
          <Header titulo='Dashboard' subtitulo='Inicio'/>
        </Box>
      </Box>
      <Container maxWidth="xl" sx={{mb: 2, padding: 2}}>
        <Grid container spacing={2} >
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Paper
            className='mb-2' 
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                borderRadius: '15px'
              }}
              elevation={5}
            >
              <CardContent>

              </CardContent>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
                
              }}
              elevation={5}
              style={{borderRadius: 15}}
            >
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200}} elevation={5}  style={{borderRadius: 15}}>
              
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3} >
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200}} elevation={5}  style={{borderRadius: 15}}>
              
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 200}} elevation={5}  style={{borderRadius: 15}}>
              
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </LoggedInLayout>
  );
};

export default Home;
