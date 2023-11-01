import React, {memo, useRef, useState, useEffect, useContext} from 'react';
import Time from './Time';
import styles from './styles.module.css';
import icons from '../../Assets/icons';
import Location from './Location';
import {Context} from '../Context'

function Timezone ({data, isDay, mobile}) {
    const {expandDialog, setExpandDialog} = useContext(Context);
    const [zone, setZone] = useState('');
    const [greeting, setGreeting] = useState('');
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
            window.scrollTo(9999, 9999);
        }
        else{
            buttonRef.current.firstElementChild.innerHTML = 'more';
            setExpandDialog(false);
        }   
    }, [expand])

    useEffect(() => {
        if(expandDialog){
            if(mobile)
                containerRef.current.style.top = '90px'
            else
                containerRef.current.style.top = '56px';
        }
        else
            containerRef.current.style.top = '';

    }, [expandDialog, mobile])

    //getting the timezone from the data
    useEffect(() => {
        if(!data) return;

        const currentZone = data.abbreviation;
        setZone(currentZone);
    }, [data])

    //this will check if its day time or night time, and will display the appropriate greeting to the user
    useEffect(() => {
        if(!data) return;
    
        const currentTime = data.datetime;
        const currentHour = new Date(currentTime).getHours();
    
        if(currentHour >= 5 && currentHour <= 12)
            setGreeting("good morning");
        
        else if(currentHour >= 13 && currentHour <= 18)
            setGreeting("good afternoon");
           
        else
            setGreeting("good evening")
        
    }, [data])

    return(             
        <section className={styles.container} ref={containerRef}>
            <h3 className={styles.greeting}>
                {isDay ? <img src={icons['sunIcon']} className={styles.dayOrNightIcon} /> 
                    : <img src={icons['moonIcon']} className={styles.dayOrNightIcon}/>}
                {greeting} 
                {mobile ? "" : ", it's currently"}
            </h3>
            <Time currentTime={data.datetime} zone={zone}/>
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