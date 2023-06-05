import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

function Quotes() {
    const [quote, setQuote] = useState(null)

    useEffect(() => {
        fetch('https://programming-quotesapi.vercel.app/api/random')
            .then(response => response.json())
            .then(results => setQuote(results));
    },[])

    return(
        <section className={styles.container}>
            <p className={styles.quote}>
                {quote ? quote.quote : <></>}
            </p>
            <h1 className={styles.quoteAuthor}>
                {quote ? quote.author : <></>}
            </h1>
            <div className={styles.refresh}></div>
        </section>
    )
}

export default Quotes;