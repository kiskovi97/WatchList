import  { useEffect } from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import { useState } from 'react';
import ShowSmall from './Components/ShowSmall.jsx'
import { searchShowByName } from "../tvmaze.js"
import { useLocation, useNavigate } from 'react-router';

var AllShows = () =>
{
    const [filter, setFilter] = useState([]);
    const [shows, setShow] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const fetchShows = async (filter) => {
        const shows = await searchShowByName(filter);
        setShow(shows); 
    }
    
    useEffect(() => {
        const queryString = location.search; // Returns:'?q=123'
        const params = new URLSearchParams(queryString);
        setFilter(params.get("filter"))
        fetchShows(params.get("filter"));
    }, [location]);
    
    
    return(<div className={styles.page}>
        <div className={styles.filters}>
            <input 
            type="text"
            placeholder="Search..."
            defaultValue={filter}
            onBlur={(e) => navigate("/all?filter=" + e.target.value)} 
            />
        </div>
        <div className={gStyles.grid_big}>
            {shows.map((station, index) => (<ShowSmall show={station} key={station.id}/>))}
        </div>
    </div>)
}
    

export default AllShows