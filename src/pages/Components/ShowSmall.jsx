import styles from './ShowSmall.module.css'
import { useNavigate  } from 'react-router';
import { motion } from "framer-motion";

const ShowSmall = ({show, watchData }) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var id = show.id;
    var image = show.image?.medium;

    if (!watchData)
    {
        return (
        <div >
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            >
                <div className={styles.receipt} onClick={() => handleClick("show/" + id)} >
                    <div className={styles.image} >
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>{show.name}</div>
                        <div className={styles.details}>{show.summary}</div>
                    </div>
                </div>
            </motion.div>
        </div>
        )
    }

    const seasonEpisodeNumber = show.episodes ? show.episodes.length : 0;
    const watchedEpisodeCount = watchData && watchData.episodes ? watchData.episodes.length : 0;
    const nextEpisode = show.next_episode_to_watch;

    return (
        <div >
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            >
                <div className={styles.receipt} onClick={() => handleClick("show/" + id)} >
                    <div className={styles.image} >
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>
                            <div>{show.name}</div>
                            <div>
                                {nextEpisode ? Date.now() - Date.parse(nextEpisode.airdate + " " + nextEpisode.airtime) : ""}
                            </div>
                            <div hidden={!nextEpisode}>
                                {seasonEpisodeNumber - watchedEpisodeCount} episodes left
                            </div>
                        </div>
                        <div className={styles.details} hidden={nextEpisode}>
                            {show.overview || show.description || "No description available."}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
        )
};

export default ShowSmall