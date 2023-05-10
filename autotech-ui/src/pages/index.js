import Head from 'next/head'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from './components/Header'
import React from 'react';
import { createTheme } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Autotech</title>
        <meta name="description" content="Compra y venta de vehiculos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.title}>
          <Header title="Autotech" subtitle="" />
        </div>

        <div>
          <img src="/concesionaria.jpg" width="99%"></img>
        </div>

        <div className={styles.grid}>
          <Link
            href="turnos/turnos-cliente"
            className={styles.card}
          >
            <h3>Saque su turno &rarr;</h3>
            <p>
              Evaluaciones para vender tu auto. <br></br>
              Service para reparar el que compraste.
            </p>
          </Link>
          <Link
            href="visualizacion-tecnicos/visualizacion"
            className={styles.card}
          >
            <h3>Visualizar técnicos &rarr;</h3>
            <p>Detalle e información. <br></br></p>
          </Link>
        </div>
      </main>
    </>
  )
}

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: 'rgb(28, 28, 28)',
      light: '#5c5c5e',
      dark: '#161616',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00796b',
      light: '#8e9ae0',
      dark: 'rgb(0, 84, 74)',
      contrastText: '#fff',
    },
    info: {
      main: '#3e4243',
      light: 'rgb(147, 166, 175)',
      dark: 'rgb(84, 100, 109)',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: 'd32f2f',
      contrastText: '#fff',
    },
    background: {
      default: '#ffffff',
      paper: '#d8d8d8',
    },
    text: {
      secondary: 'rgba(65,65,65,0.73)',
    },
    success: {
      main: '#428745',
      light: 'rgb(103, 159, 106)',
      dark: 'rgb(46, 94, 48)',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Encode Sans',
    h1: {
      fontFamily: 'Bruno Ace',
    },
    h2: {
      fontFamily: 'Bruno Ace',
    },
    h3: {
      fontFamily: 'Bruno Ace',
    },
    h4: {
      fontFamily: 'Bruno Ace',
    },
    h5: {
      fontFamily: 'Bruno Ace',
    },
    h6: {
      fontFamily: 'Play',
    },
    subtitle1: {
      fontFamily: 'Play',
    },
    subtitle2: {
      fontFamily: 'Play',
    },
    body1: {
      fontFamily: 'Encode Sans',
    },
    body2: {
      fontFamily: 'Encode Sans',
    },
    button: {
      fontFamily: 'Encode Sans',
    },
    caption: {
      fontFamily: 'Encode Sans',
    },
    overline: {
      fontFamily: 'Encode Sans',
    },
  },
});



