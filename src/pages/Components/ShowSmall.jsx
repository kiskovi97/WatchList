import styles from './ShowSmall.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useNavigate  } from 'react-router';

const ShowSmall = ({show, watchData, hidden}) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var id = show.id;
    var image = show.image?.medium;

    if (!watchData)
    {
        return (
        <div hidden={hidden}>
            <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                <div className={styles.receipt} onClick={() => handleClick("show/" + id)} >
                    <div className={styles.image} >
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>{show.name}</div>
                        <div className={styles.details}>{show.summary}</div>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
        )
    }

    const seasonEpisodeNumber = 0;
    const watchedEpisodeCount = watchData && watchData.episodes ? watchData.episodes.length : 0;


    return (
        <div hidden={hidden}>
            <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                <div className={styles.receipt} onClick={() => handleClick("show/" + id)} >
                    <div className={styles.image} >
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>
                            <div>{show.name}</div>
                            <div>
                                {show.next_episode_to_watch ? show.next_episode_to_watch.air_date : ""}
                            </div>
                            <div hidden={!show.next_episode_to_watch}>
                                {seasonEpisodeNumber - watchedEpisodeCount} episodes left
                            </div>
                        </div>
                        <div className={styles.details} hidden={show.next_episode_to_watch}>
                            {show.overview || show.description || "No description available."}
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
        )
};

export default ShowSmall