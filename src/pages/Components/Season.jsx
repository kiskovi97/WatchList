import { getShowById } from '../../tvmaze.js';
import { useEffect, useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll'
import styles from './Show.module.css'
import { uploadData } from '../../dynamoService';

function Season({ season, watchData }) {

    var [episodes, setEpisodes] = useState([]);
    var [episodesWatched, setEpisodesWatched] = useState([]);
    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
    const setWatchSeason = () => {
        for (let episode of episodes)
        {
            if (!episodesWatched.includes(episode.id) && Date.parse(episode.air_date) <= Date.now())
                episodesWatched.push(episode.id);
        }
        episodesWatched = episodesWatched.filter(onlyUnique);
        watchData.episodes = [...episodesWatched];
        setEpisodesWatched([...episodesWatched]);
        uploadData(watchData);
    }
    const setWatchData = (episode) => {
        if (!episodesWatched.includes(episode.id)) {
            episodesWatched.push(episode.id);
        } else {
            episodesWatched = episodesWatched.filter(item => item !== episode.id);
        }
        episodesWatched = episodesWatched.filter(onlyUnique);
        watchData.episodes = [...episodesWatched];
        setEpisodesWatched([...episodesWatched]);
        uploadData(watchData);
    }

    useEffect(() => {
        setEpisodesWatched(watchData?.episodes || []);
    }, [watchData]);

        var image = null;

        return (
            <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                <div className={styles.season}>
                    <div className={styles.image_season}>
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div>
                        <input type="checkbox" 
                            onChange={() => setWatchSeason()} 
                            checked={episodes.every(epsiode => episodesWatched.includes(epsiode.id))} />
                        <h3>Season {season.season_number} - {season.name}</h3>
                        <div>
                            {episodes.map(episode => (
                                <div key={episode.id}>
                                    <input type="checkbox" 
                                        onChange={() => setWatchData(episode)} 
                                        checked={episodesWatched.includes(episode.id)}
                                        hidden={!watchData || Date.parse(episode.air_date) > Date.now()}
                                        />
                                    {episode.episode_number} - {episode.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
            )

}

export default Season