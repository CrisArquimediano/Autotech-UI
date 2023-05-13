import Head from 'next/head'
import * as React from 'react';
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import Visualizacion from './VisualizacionFiltroBusqueda';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })


export default function visualizacion() {
    return (
        <>
            <Head>
                <title>Autotech</title>
                <meta name="description" content="Compra y venta de vehiculos" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Bruno+Ace&family=Encode+Sans:wght@100;200;300;400;500;600;700;800;900&family=Play:wght@400;700&display=swap"
                    rel="stylesheet" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
                    crossorigin="anonymous" async></script>

                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />

            </Head>
            <main className={`${styles.main} ${inter.className}`}>

                <div>
                    <Link href="/"><h2>Volver</h2></Link>
                    <div id="root"></div>
                    <Visualizacion />
                </div>


            </main>
        </>
    );
}