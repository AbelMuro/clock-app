import React, {useEffect, useState, useContext, memo} from 'react';
import styles from './styles.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import {Context} from '../Context'

function Quotes() {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    const {expandDialog} = useContext(Context);                         //the quotes component will be removed from the dom when the user expands the dialog

    const makeFetchRequest = () => {
        try{
            setLoading(true)
            fetch('https://programming-quotesapi.vercel.app/api/random')
                .then(response => response.json())
                .then(results => {
                    setQuote(results);
                    setLoading(false);
                });            
        }
        catch(err){
            setLoading(false);
        }

    }

    const handleClick = () => {
        makeFetchRequest();
    }

    useEffect(() => {
        if(expandDialog) return; 

        makeFetchRequest();
    }, [expandDialog])


    return expandDialog ? <></> : ( 
        <section className={styles.container}>
            <div className={styles.content}>
                {loading ? <CircularProgress className={styles.loadingIcon}/> : 
                    <>
                        <p className={styles.quote}>
                            {quote ? quote.quote : <></>}
                        </p>
                        <h1 className={styles.quoteAuthor}>
                            {quote ? quote.author : <></>}
                        </h1>                    
                    </>
}
                <div className={styles.refresh} onClick={handleClick}></div>                
            </div>
        </section> );
    
}

export default memo(Quotes);