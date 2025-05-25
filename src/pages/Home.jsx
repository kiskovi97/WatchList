import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import { useState, useEffect } from 'react';
import ShowSmall from './Components/ShowSmall.jsx'
import Episode from './Components/Episode.jsx'
import { getShowById } from '../tvmaze.js';
import { fetchData, uploadData, fetchDataById as getDBShowById } from '../dynamoService';

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

    const  onEpisodeWatched = async (show, episode) => {
        const watchData = (await getDBShowById(show.id)).data;
        if (!watchData) return;

        let watched = watchData.episodes || [];
        
        if (!watched.includes(episode.id))
            watched.push(episode.id);
        
        watchData.episodes = [...watched];
        await uploadData(watchData);
        setDBData([...dbData.filter(item => item.showId !== watchData.showId), watchData]);
    };

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
                .map((station) => (<Episode 
                    episode={station.show.next_episode_to_watch} 
                    show={station.show} 
                    key={station.show.id}
                    onEpisodeWatched={onEpisodeWatched}/>))}
            </div>
            <div className={styles.filters}>To Be Aired</div>
            <div className={gStyles.grid_big} key="next-to-air">
                {shows
                .filter(item => Date.parse(item.show.next_episode_to_watch?.airdate + " " + item.show.next_episode_to_watch?.airtime) > Date.now())
                .map((station) => (<ShowSmall 
                    show={station.show} 
                    watchData={station.watchData} 
                    key={station.show.id}
                    />))}
            </div>
            <div className={styles.filters}>Finished</div>
            <div className={gStyles.grid_big} key="finished">
                {shows
                .filter(item => !item.show.next_episode_to_watch)
                .map((station) => (<ShowSmall 
                    show={station.show} 
                    watchData={station.watchData} 
                    key={station.show.id}/>))}
            </div>
        </div>)
};

export default Home