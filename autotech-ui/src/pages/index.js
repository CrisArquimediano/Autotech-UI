import Head from 'next/head'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Autotech</title>
        <meta name="description" content="Compra y venta de vehiculos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.title}>
          <h1>Autotech</h1>
        </div>

        <div>
          <img src="/concesionaria.jpg" width="99%"></img>
        </div>

        <div className={styles.grid}>
          <Link
            href="turnos/turnos-cliente-motivo"
            className={styles.card}
          >
            <h3>Saque su turno &rarr;</h3>
            <p>
              Evaluaciones para vender tu auto. <br></br>
              Service para reparar el que compraste.
            </p>
          </Link>
        </div>
      </main>
    </>
  )
}
