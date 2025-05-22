import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import { useState, useEffect } from 'react';
import ShowSmall from './Components/ShowSmall.jsx'
import movieDB from '../movieDB.js';

const Home = () => {
    const [movies, setMovies] = useState([]);

     useEffect(() => {
        movieDB.tv.getTopRated({}, (success) => { 
            var data = JSON.parse(success);
            setMovies(data.results); 
        }, () => {})
    }, []);
    
    return (
        <div className={styles.page}>
            <Me />
            <div className={gStyles.grid_big} key="top-shows">
                {movies.map((station, index) => (<ShowSmall data={station}/>))}
            </div>
        </div>)
};

export default Home