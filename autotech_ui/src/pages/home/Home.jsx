import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../common/Copyright'
import LoggedInLayout from '../../common/LoggedInLayout';


const Home = () => {
  return (
    <LoggedInLayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 200,
              }}
            >
              
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </LoggedInLayout>
  );
};

export default Home;
