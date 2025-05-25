import { useEffect, useState } from 'react';
import styles from './Show.module.css'
import { motion } from "framer-motion";

function Season({ season, episodesWatched, onEpisodesAdded, onEpisodesRemoved, editable }) {

    var [episodes, setEpisodes] = useState([]);

    const setWatchSeason = () => {
        if (episodes.every(epsiode => episodesWatched.includes(epsiode.id) || !epsiode.airstamp || Date.parse(epsiode.airstamp) > Date.now())) {
            onEpisodesRemoved(episodes);
        } else {
            onEpisodesAdded(episodes);
        }
    }
    const setWatchData = (episode) => {
        if (episodesWatched.includes(episode.id)) {
            onEpisodesRemoved([episode]);
        } else {
            onEpisodesAdded([episode]);
        }
    }
    useEffect(() => {
        setEpisodes(season.episodes || []);
    }, [season]);

        var image = season.image?.medium;

        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                >
                <div className={styles.season}>
                    <div className={styles.image_season}>
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div>
                        <input type="checkbox" 
                            onChange={() => setWatchSeason()} 
                            checked={episodes.every(epsiode => episodesWatched.includes(epsiode.id))} 
                            hidden={!editable}/>
                        <h3>Season {season.number} - {season.name}</h3>
                        <div>
                            {episodes.map(episode => (
                                <div key={episode.id}>
                                    <input type="checkbox" 
                                        onChange={() => setWatchData(episode)} 
                                        checked={episodesWatched.includes(episode.id)}
                                        hidden={!editable || !episode.airstamp || Date.parse(episode.airstamp) > Date.now()}
                                        />
                                    {episode.episode_number} - {episode.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
            )

}

export default Season