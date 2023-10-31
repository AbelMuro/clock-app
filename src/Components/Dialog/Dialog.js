import React, {useEffect, useContext, useRef, memo} from 'react';
import styles from './styles.module.css';
import { Context } from '../Context';

function Dialog({data, isDay, mobile, tablet}) {
    const {expandDialog} = useContext(Context);
    const containerRef = useRef();

    useEffect(() => {
        if(expandDialog){
            if(mobile)
                containerRef.current.style.height = '40vh';
            else if(tablet)
                containerRef.current.style.height = '42vh';
            else
                containerRef.current.style.height = '50vh';
        }
        else
            containerRef.current.style.height = '';

    }, [expandDialog, tablet, mobile])

    useEffect(() => {
        const allTitles = document.querySelectorAll('.' + styles.title);
        const allData = document.querySelectorAll('.' + styles.data);
        const line = document.querySelector('.' + styles.line)
        let colorToUse = ''

        if(isDay){
            containerRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
            colorToUse = '#303030';
        }
            
        else{
            containerRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            colorToUse = 'white'
        }
            
        allTitles.forEach((title) => {
            title.style.color = colorToUse;
        })
        allData.forEach((data) => {
            data.style.color = colorToUse;
        })
        line.style.backgroundColor = colorToUse;

    }, [isDay])


    return(
        <section className={styles.container} ref={containerRef}>
            <div className={styles.content}>
                <div className={styles.userData}>
                    <h2 className={styles.title}>
                        CURRENT TIMEZONE
                    </h2>
                    <h1 className={styles.data}>
                        {data ? data.timezone.replace('_', ' ') : ''}
                    </h1>
                </div>
                <div className={styles.line}></div>
                <div className={styles.userData}>
                    <h2 className={styles.title}>
                        Day of the week
                    </h2>
                    <h1 className={styles.data}>
                        {data.day_of_week}
                    </h1>
                </div>
                <div className={styles.userData}>
                    <h2 className={styles.title}>
                        Day of the year
                    </h2>
                    <h1 className={styles.data}>
                        {data.day_of_year}
                    </h1>
                </div>
                <div className={styles.userData}>
                    <h2 className={styles.title}>
                        Week number
                    </h2>
                    <h1 className={styles.data}>
                        {data.week_number}
                    </h1>
                </div>
            </div>
        </section>
        )
}

export default memo(Dialog);