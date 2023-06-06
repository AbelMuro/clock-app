import React, {memo, useRef, useState, useEffect, useContext} from 'react';
import styles from './styles.module.css';
import icons from '../../Assets/icons';
import Location from './Location';
import {Context} from '../Context'

function Timezone ({greeting, currentTime, isDay, mobile}) {
    const {expandDialog, setExpandDialog} = useContext(Context);
    const buttonRef = useRef();
    const [expand, setExpand] = useState(false)

    const handleClick = () => {
        setExpand(!expand);
    }

    useEffect(() => {
        if(expand){
            buttonRef.current.firstElementChild.innerHTML = 'less';
            setExpandDialog(true);
        }
            
        else{
            buttonRef.current.firstElementChild.innerHTML = 'more';
            setExpandDialog(false);
        }
            
    }, [expand])

    useEffect(() => {

    }, [expandDialog])

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
            <button className={styles.showMoreButton} onClick={handleClick} ref={buttonRef}>
                <span></span>
                <div className={styles.arrowBackground}>
                    <img src={icons['arrowIcon']} className={styles.arrowIcon}/>
                </div>
            </button>
        </section>
)
}

export default memo(Timezone);