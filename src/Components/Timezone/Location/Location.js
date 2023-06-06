import React, {useState, useEffect, memo} from 'react';
import styles from './styles.module.css';

function Location() {
    const [location, setLocation] = useState('Los Angeles, US');

   /*  useEffect(() => {
        const apikey = process.env.geoApiKey;
        fetch(`https://api.ipbase.com/v2/info?apikey=${apikey}&ip=1.1.1.1`)
            .then(response => response.json())
            .then(results => {
                const city = results.data.location.city.name;
                const country = results.data.location.country.alpha2;
                setLocation(`${city}, ${country}`)
            })
    }, []) */

    return(
        <h2 className={styles.location}>
            {location}
        </h2>
        )
}

export default memo(Location);
