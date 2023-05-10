import Head from 'next/head'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from './components/Header'

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
            href="visualizacion-tecnicos/Formulario"
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
