import React, {memo} from 'react';
import styles from './styles.module.css';
import icons from '../../Assets/icons';
import Location from './Location';

function Timezone ({greeting, currentTime, isDay, mobile}) {
    return(             
        <section className={styles.container}>
            <h3 className={styles.greeting}>
                {isDay ? <img src={icons['sunIcon']} className={styles.dayOrNightIcon} /> 
                    : <img src={icons['moonIcon']} className={styles.dayOrNightIcon}/>}
                {greeting} 
                {mobile ? "" : ", it's currently"}
            </h3>
            <h1 className={styles.time}>
                {currentTime}
            </h1>
            <Location/>
            <button className={styles.showMoreButton}>
                More
                <div className={styles.arrowBackground}>
                    <img src={icons['arrowIcon']} className={styles.arrowIcon}/>
                </div>
            </button>
        </section>
)
}

export default memo(Timezone);