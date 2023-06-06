import React, {useEffect, useState, useRef} from 'react';
import Quotes from './Components/Quotes';
import Timezone from './Components/Timezone';
import images from './Assets/images';
import './styles.css';
import useMediaQuery from './Hooks/useMediaQuery';


//now i need to make another component for additional data that will expand from the bottom
function App() {
    const [timezone, setTimezone] = useState('');
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [isDay, setIsDay] = useState(false);
    const mobile = useMediaQuery('(max-width: 600px)');
    const tablet = useMediaQuery('(max-width: 800px)');
    const containerRef = useRef();

    useEffect(() => {
        fetch('http://worldtimeapi.org/api/ip')
            .then(response => response.json())
            .then(results => {
                setTimezone(results);
            })
    },[])

    useEffect(() => {
        if(!timezone) return;

        const currentTime = timezone.datetime;
        const currentHour = new Date(currentTime).getHours();

        if(currentHour >= 5 && currentHour <= 12){
            setGreeting("good morning");
            setIsDay(true);
        } 
        else if(currentHour >= 13 && currentHour <= 18){
            setGreeting("good afternoon");
            setIsDay(true);
        }   
        else{
            setGreeting("good evening")
            setIsDay(false);
        }
        
    }, [timezone])

    useEffect(() => {
        if(isDay){
            let imageName = 'daytimeBg';
            if(mobile)
                imageName += 'Mobile'
            else if(tablet)
                imageName += 'Tablet';
            containerRef.current.style.backgroundImage = `url(${images[imageName]})`
        }
        else{
            let imageName = 'nighttimeBg';
            if(mobile)
                imageName += 'Mobile'
            else if(tablet)
                imageName += 'Tablet';
            containerRef.current.style.backgroundImage = `url(${images[imageName]})`
        }

    }, [isDay, mobile, tablet])

    useEffect(() => {
        if(!timezone) return;

        const currentTime = new Date(timezone.datetime);
        let currentHour = currentTime.getHours();
        let currentMinutes = currentTime.getMinutes();

        if(currentHour <= 9)
            currentHour = '0' + currentHour;

        if(currentMinutes <= 9)
            currentMinutes = '0' + currentMinutes;

        setCurrentTime(`${currentHour}:${currentMinutes}`);
    }, [timezone])

    return(
        <main className='container' ref={containerRef}>
            <Quotes/>
            <Timezone greeting={greeting} currentTime={currentTime} isDay={isDay} mobile={mobile}/>
        </main>
    )
} 

export default App;