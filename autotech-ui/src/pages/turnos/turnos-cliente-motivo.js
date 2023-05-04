import Head from 'next/head'
import Link from 'next/link';
import * as React from 'react';
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const inter = Inter({ subsets: ['latin'] })


function RadioButtonsGroup() {
    return (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Motivo</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="evaluacion"
                name="radio-buttons-group"
            >
                <FormControlLabel value="service" control={<Radio />} label="Service" />
                <FormControlLabel value="evaluacion" control={<Radio />} label="Evaluación" />
            </RadioGroup>
        </FormControl>
    );
}

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
                    <RadioButtonsGroup />
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




