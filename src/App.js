import React, {useEffect, useState, useRef} from 'react';
import Quotes from './Components/Quotes';
import icons from './Assets/icons';
import images from './Assets/images';
import './styles.css';

function App() {
    const [timezone, setTimezone] = useState('');
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        fetch('http://worldtimeapi.org/api/ip')
            .then(response => response.json())
            .then(results => {
                console.log(results);
                setTimezone(results);
            })
    },[])

    useEffect(() => {
        if(!timezone) return;

        const currentTime = timezone.datetime;
        const currentHour = new Date(currentTime).getHours();

        if(currentHour >= 5 && currentHour <= 12){
            setGreeting("good morning, it's currently");
            containerRef.current.style.background = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images['daytimeBg']})`
        } 
        else if(currentHour >= 13 && currentHour <= 18){
            setGreeting("good afternoon, it's currently");
            containerRef.current.style.background = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images['daytimeBg']})`
        }   
        else{
            setGreeting("good evening, it's currently")
            containerRef.current.style.backgroundImage = `url(${images['nighttimeBg']})`
        }
        
    }, [timezone])

    useEffect(() => {
        if(!timezone) return;

        const currentTime = new Date(timezone.datetime);
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        if(currentHour.length == 1)
            currentHour = '0' + currentHour;

        setCurrentTime(`${currentHour}:${currentMinutes}`)
    }, [timezone])

    //i will need to put <Quotes> inside another container and center it
    // same with the timezone
    return(
        <main className='container' ref={containerRef}>
            <Quotes/>
            <section className='timezone'>
                <h3 className='greeting'>
                    {greeting}
                </h3>
                <h1 className='time'>
                    {currentTime}
                </h1>
                <h2 className='location'>
                    in london, uk
                </h2>
                <button className='showMoreButton'>
                    More
                    <div className='arrowBackground'>
                        <img src={icons['arrowIcon']} className='arrowIcon'/>
                    </div>
                </button>
            </section>
        </main>
    )
} 

export default App;