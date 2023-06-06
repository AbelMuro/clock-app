import React, {useEffect, useState, memo} from 'react';
import styles from './styles.module.css';

function Quotes() {
    const [quote, setQuote] = useState(null);

    const makeFetchRequest = () => {
        fetch('https://programming-quotesapi.vercel.app/api/random')
            .then(response => response.json())
            .then(results => setQuote(results));
    }

    const handleClick = () => {
        makeFetchRequest();
    }

    useEffect(() => {
        makeFetchRequest();
    },[])

    return(
        <section className={styles.container}>
            <p className={styles.quote}>
                {quote ? quote.quote : <></>}
            </p>
            <h1 className={styles.quoteAuthor}>
                {quote ? quote.author : <></>}
            </h1>
            <div className={styles.refresh} onClick={handleClick}></div>
        </section>
    )
}

export default memo(Quotes);