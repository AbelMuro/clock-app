import React, {memo, useRef, useState, useEffect, useContext} from 'react';
import styles from './styles.module.css';
import icons from '../../Assets/icons';
import Location from './Location';
import {Context} from '../Context'


//i need to style the container after the dialog has been expanded

function Timezone ({greeting, currentTime, isDay, mobile}) {
    const {expandDialog, setExpandDialog} = useContext(Context);
    const buttonRef = useRef();
    const containerRef = useRef();
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
        if(expandDialog){
            containerRef.current.style.bottom = '456px';
        }
            
        else{
            containerRef.current.style.bottom = '';
        }
            

    }, [expandDialog])

    return(             
        <section className={styles.container} ref={containerRef}>
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