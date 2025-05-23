import  { useEffect } from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import { useState } from 'react';
import ShowSmall from './Components/ShowSmall.jsx'
import movieDB from '../movieDB.js';

var AllShows = () =>
{
    const [filter, setFilter] = useState("");
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {

        movieDB.search.getTv({ query: filter }, (success) => { 
            var data = JSON.parse(success);
            setMovies(data.results); 
        }, () => {})
    }, [filter]);
    
    return(<div className={styles.page}>
        <div className={styles.filters}>
            <input 
            type="text"
            placeholder="Search..."
            onBlur={(e) => setFilter(e.target.value)} 
            />
        </div>
        <div className={gStyles.grid_big}>
            {movies.map((station, index) => (<ShowSmall data={station}/>))}
        </div>
    </div>)
}
    

export default AllShows