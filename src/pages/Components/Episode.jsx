import { useEffect } from 'react';
import styles from './ShowSmall.module.css'
import { useNavigate  } from 'react-router';
import { motion } from "framer-motion";

const Episode = ({ episode, show, onEpisodeWatched }) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var image = episode.image?.medium;

    const watchThisEpisode = (e) => {
        e.stopPropagation();
        onEpisodeWatched && onEpisodeWatched(show, episode);
    }

    useEffect(() => {
    }, [episode]);

    return (
        <div>
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            >
                <div className={styles.receipt} onClick={() => handleClick("show/" + show.id)} >
                    <div className={styles.image} >
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>
                            <h3>{episode.name}</h3>
                            <div>
                                {episode.airdate + " " + episode.airtime}
                            </div>
                            <button className={styles.button} onClick={watchThisEpisode}>Watched</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
        )
};

export default Episode