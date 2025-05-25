import  { useEffect } from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import { useState } from 'react';
import ShowSmall from './Components/ShowSmall.jsx'
import { searchShowByName } from "../tvmaze.js"

var AllShows = () =>
{
    const [filter, setFilter] = useState("");
    const [shows, setShow] = useState([]);

    const fetchShows = async (filter) => {
        const shows = await searchShowByName(filter);
        setShow(shows); 
    }
    
    useEffect(() => {
        fetchShows(filter);
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
            {shows.map((station, index) => (<ShowSmall show={station}/>))}
        </div>
    </div>)
}
    

export default AllShows