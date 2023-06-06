import React, {useEffect, useContext, useRef} from 'react';
import styles from './styles.module.css';
import { Context } from '../Context';

function Dialog() {
    const {expandDialog} = useContext(Context);
    const containerRef = useRef();

    useEffect(() => {
        if(expandDialog)
            containerRef.current.style.height = '400px';
        else
            containerRef.current.style.height = '';

    }, [expandDialog])


    return(
        <section className={styles.container} ref={containerRef}>
            <div className={styles.userData}>
                <h2 className={styles.title}>
                    CURRENT TIMEZONE
                </h2>
                <h1 className={styles.data}>
                    Europe/London
                </h1>
            </div>
            <div className={styles.userData}>
                <h2 className={styles.title}>
                    Day of the week
                </h2>
                <h1 className={styles.data}>
                    5
                </h1>
            </div>
            <div className={styles.userData}>
                <h2 className={styles.title}>
                    Day of the year
                </h2>
                <h1 className={styles.data}>
                    295
                </h1>
            </div>
            <div className={styles.userData}>
                <h2 className={styles.title}>
                    Week number
                </h2>
                <h1 className={styles.data}>
                    42
                </h1>
            </div>
        </section>
        )
}

export default Dialog;