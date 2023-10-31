import React, {useEffect, useState, useRef} from 'react';
import PreLoadImages from './Components/PreLoadImages'
import Quotes from './Components/Quotes';
import Timezone from './Components/Timezone';
import images from './Assets/images';
import './styles.css';
import useMediaQuery from './Hooks/useMediaQuery';
import ShareContext from './Components/Context';
import Dialog from './Components/Dialog';


function App() {
    const [data, setData] = useState('');
    const [isDay, setIsDay] = useState(false);
    const mobile = useMediaQuery('(max-width: 600px)');
    const tablet = useMediaQuery('(max-width: 800px)');
    const containerRef = useRef();

    useEffect(() => {
        fetch('https://worldtimeapi.org/api/ip')
            .then(response => response.json())
            .then(results => {
                setData(results);
            })
    },[])

    //this will check if its day time or night time, and will display the appropriate greeting to the user
    useEffect(() => {
        if(!data) return;

        const currentTime = data.datetime;
        const currentHour = new Date(currentTime).getHours();

        if(currentHour >= 5 && currentHour <= 18)
            setIsDay(true);
        else
            setIsDay(false);
        
    }, [data])


    //this will decide which background image to use, based on the time of day and device width
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



    return(
        <>
            <PreLoadImages/>
            <main className='container' ref={containerRef}>
                <Quotes/>
                <Timezone 
                    data={data}
                    isDay={isDay} 
                    mobile={mobile}/>
                <Dialog 
                    data={data} 
                    isDay={isDay}
                    mobile={mobile}
                    tablet={tablet}/>  
            </main>          
        </>

    )
} 

export default ShareContext(App);