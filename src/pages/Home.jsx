import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import { useState, useEffect } from 'react';
import ShowSmall from './Components/ShowSmall.jsx'
import movieDB from '../movieDB.js';
import { fetchData } from '../dynamoService';

const Home = () => {
    const [dbData, setDBData] = useState([]);
    const [shows, setShows] = useState([]);

    const fetchAndSetData = async () => {
        const result = await fetchData();
        if (result.success) {
            console.log(result.data);
            setDBData(result.data);
        } else {
            alert("Error Fetching Data: " + result.message);
        }
    }

    useEffect(() => {
        let shows = [];
        for(let watchData of dbData) {
            movieDB.tv.getById({id: watchData.showId}, (success) => {
                var data = JSON.parse(success);
                shows.push({show: data, watchData: watchData});
                setShows([...shows]);
            }, () => {});
        }
    }, [dbData]);

    useEffect(() => {
            fetchAndSetData();
    }, []);
    
    return (
        <div className={styles.page}>
            <Me />
            <div className={gStyles.grid_big} key="top-shows">
                {shows.map((station, index) => (<ShowSmall data={station.show} watchData={station.watchData}/>))}
            </div>
        </div>)
};

export default Home