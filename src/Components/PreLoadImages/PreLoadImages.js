import React from 'react';
import styles from './styles.module.css';
import images from '../../Assets/images'

function PreLoadImages() {
    return(
        <div>
            <img src={images['daytimeBg']} className={styles.image}/>
            <img src={images['daytimeBgTablet']} className={styles.image}/>
            <img src={images['daytimeBgMobile']} className={styles.image}/>
            <img src={images['nighttimeBg']} className={styles.image}/>
            <img src={images['nighttimeBgTablet']} className={styles.image}/>
            <img src={images['nighttimeBg']} className={styles.image}/>
        </div>
    )
}

export default PreLoadImages;