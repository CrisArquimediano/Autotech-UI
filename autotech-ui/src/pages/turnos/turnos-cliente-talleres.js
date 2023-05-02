import Link from 'next/link';
import * as React from 'react';
import styles from '@/styles/Home.module.css'

export default function Talleres() {
    return (
        <>
            <h1>Seleccione taller más cómodo</h1>
            <h2>
                <Link href="./turnos-cliente-motivo">Volver</Link>
            </h2>

            <div className={styles.grid}>
                <Link
                    href="./turnos-cliente-calendario"
                    className={styles.card}
                >
                    <h3>Calendario &rarr;</h3>
                    <p>
                        Elegir día de visita.
                    </p>
                </Link>
            </div>
        </>
    );
}