import Head from 'next/head'
import Image from 'next/image'
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
        <div className={styles.description}>
          <p>
            Saque su turno&nbsp;
          </p>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/autotech-logo.jpg"
            alt="Autotech Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <Link
            href="turnos/turnos-supervisor"
            className={styles.card}
          >
            <h3>Turno Supervisor &rarr;</h3>
            <p>
              Sacar turno para supervisor.
            </p>
          </Link>
        </div>

        <div className={styles.grid}>
          <Link
            href="turnos/turnos-cliente"
            className={styles.card}
          >
            <h3>Turno Cliente &rarr;</h3>
            <p>
              Sacar turno cliente.
            </p>
          </Link>
        </div>
      </main>
    </>
  )
}
