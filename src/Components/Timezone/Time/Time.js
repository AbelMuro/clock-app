import React, {useState, useEffect, memo} from 'react';
import styles from './styles.module.css';

function Time({currentTime, zone}) {
    const [time, setTime] = useState();
    const [date, setDate] = useState(currentTime);

    const formatTime = (currentTime) => {
        const current_Time = new Date(currentTime);
        let currentHour = current_Time.getHours();
        let currentMinutes = current_Time.getMinutes();
        
        if(currentHour <= 9)
            currentHour = '0' + currentHour;
        
        if(currentMinutes <= 9)
            currentMinutes = '0' + currentMinutes;
        
        setTime(`${currentHour}:${currentMinutes}`); 
    }


    useEffect(() => {
        formatTime(currentTime)
    }, [])

    useEffect(() => {

        setInterval(() => {
            const current_Time = new Date(date).getTime();
            const new_Time = new Date(current_Time + 1000);
            setDate(new_Time);
            formatTime(current_Time + 1000);
        }, 1000)
    }, [])


    return(
        <h1 className={styles.time}>
            {time}
            <span className={styles.zone}>{zone}</span>
        </h1>
    )
}

export default memo(Time);