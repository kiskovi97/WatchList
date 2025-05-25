import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import { useState, useEffect } from 'react';
import ShowSmall from './Components/ShowSmall.jsx'
import { getShowById } from '../tvmaze.js';
import { fetchData } from '../dynamoService';

const Home = () => {
    const [dbData, setDBData] = useState([]);
    const [shows, setShows] = useState([]);

    const fetchAndSetData = async () => {
        const result = await fetchData();
        if (result.success) {
            setDBData(result.data);
        } else {
            alert("Error Fetching Data: " + result.message);
        }
    }

    const fetchDataById = async (dbData) => {
        let shows = [];
        for(let watchData of dbData) {
            const data = await getShowById(watchData.showId, watchData.episodes);
            if (data)
                shows.push({show: data, watchData: watchData});
        }
        setShows([...shows]);
    }

    useEffect(() => {
        fetchDataById(dbData);
    }, [dbData]);

    useEffect(() => {
            fetchAndSetData();
    }, []);
    
    return (
        <div className={styles.page}>
            <Me />
            <div className={gStyles.grid_big} key="episodes-to-watch">
                {shows
                .filter(item => Date.parse(item.show.next_episode_to_watch?.airdate + " " + item.show.next_episode_to_watch?.airtime) < Date.now())
                .map((station, index) => (<ShowSmall show={station.show} watchData={station.watchData} key={station.show.id}/>))}
            </div>
            <div className={styles.filters}>To Be Aired</div>
            <div className={gStyles.grid_big} key="next-to-air">
                {shows
                .filter(item => Date.parse(item.show.next_episode_to_watch?.airdate + " " + item.show.next_episode_to_watch?.airtime) > Date.now())
                .map((station, index) => (<ShowSmall show={station.show} watchData={station.watchData} key={station.show.id}/>))}
            </div>
            <div className={styles.filters}>Finished</div>
            <div className={gStyles.grid_big} key="finished">
                {shows
                .filter(item => !item.show.next_episode_to_watch)
                .map((station, index) => (<ShowSmall show={station.show} watchData={station.watchData} key={station.show.id}/>))}
            </div>
        </div>)
};

export default Home