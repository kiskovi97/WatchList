import { useEffect } from 'react';
import styles from './ShowSmall.module.css'
import { useNavigate  } from 'react-router';
import { motion } from "framer-motion";
import moment from "moment"

const Episode = ({ episode, show, onEpisodeWatched }) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var image = show.image?.medium;

    const watchThisEpisode = (e) => {
        onEpisodeWatched && onEpisodeWatched(show, episode);
    }

    useEffect(() => {
    }, [episode]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            >
                <div className={styles.main}>
                    <div className={styles.image} hidden={!image}>
                        <img src={image} alt="" className={styles.background} />
                    </div>
                    <div>
                        <div className={styles.title}>{episode.name}</div>
                        <div className={styles.text}>
                            {moment(episode.airdate + " " + episode.airtime).fromNow()}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={watchThisEpisode}>Watched</button>
                        <button onClick={() => handleClick("show/" + show.id)}>Open</button>
                    </div>
                </div>
        </motion.div>
        )
};

export default Episode