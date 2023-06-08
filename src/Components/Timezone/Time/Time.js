import React, {useState, useEffect, memo} from 'react';
import styles from './styles.module.css';

function Time({zone}) {
    const [currentHour, setCurrentHour] = useState('');
    const [currentMinutes, setCurrentMinutes] = useState('');
    const [date, setDate] = useState(new Date());

    const formatTime = () => {
        let currentHour = date.getHours();
        let currentMinutes = date.getMinutes();
        
        if(currentHour <= 9)
            currentHour = '0' + currentHour;
        
        if(currentMinutes <= 9)
            currentMinutes = '0' + currentMinutes;
        setCurrentHour(currentHour);
        setCurrentMinutes(currentMinutes); 
    }


    useEffect(() => {
        formatTime();
    }, [date])    

    useEffect(() => {
        const clock = setInterval(() => {
            setDate(new Date());
        }, 1000)

        return () => {
            clearInterval(clock);
        }
    }, [])


    return(
        <h1 className={styles.time}>
            {currentHour}
            <span className={styles.colon}>:</span>
            {currentMinutes}
            <span className={styles.zone}>{zone}</span>
        </h1>
    )
}

export default memo(Time);