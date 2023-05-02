import Head from 'next/head'
import Link from 'next/link';
import * as React from 'react';
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Motivo() {
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
                        Elija el motivo de su turno&nbsp;
                    </p>
                </div>

                <div className={styles.grid}>
                    <Link
                        href="./turnos-cliente-talleres"
                        className={styles.card}
                    >
                        <h3>Turno Cliente &rarr;</h3>
                        <p>
                            Ver talleres.
                        </p>
                    </Link>
                </div>

                <h2>
                    <Link href="/">Volver</Link>
                </h2>
            </main>
        </>
    );
}


