import styles from './ShowSmall.module.css'
import { useNavigate  } from 'react-router';
import { motion } from "framer-motion";
import moment from "moment";

const ShowSmall = ({show, watchData }) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var id = show.id;
    var image = show.image?.medium;

    if (!watchData)
    {
        return (
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            >
                <div className={styles.main} >
                    <div className={styles.image} hidden={!image}>
                        <img src={image}  alt="" className={styles.background} />
                    </div>
                    <div>
                        <div className={styles.title}>{show.name}</div>
                        <div className={styles.text}>{show.summary}</div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={() => handleClick("show/" + id)}>Open</button>
                    </div>
                </div>
            </motion.div>
        )
    }

    const seasonEpisodeNumber = show.episodes ? show.episodes.length : 0;
    const watchedEpisodeCount = watchData && watchData.episodes ? watchData.episodes.length : 0;
    const nextEpisode = show.next_episode_to_watch;

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
                        <div className={styles.title}>{show.name}</div>
                        <div className={styles.text} hidden={!nextEpisode}>
                            {nextEpisode ? moment(nextEpisode.airdate + " " + nextEpisode.airtime).fromNow() : ""}
                        </div>
                        <div className={styles.text} hidden={!nextEpisode}>
                            {seasonEpisodeNumber - watchedEpisodeCount} episodes left
                        </div>
                        <div className={styles.text} hidden={nextEpisode}>
                            {show.overview || show.description || "No description available."}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={() => handleClick("show/" + show.id)}>Open</button>
                    </div>
                </div>
            </motion.div>
        )
};

export default ShowSmall