import movieDB from '../../movieDB.js';
import { useEffect, useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll'
import styles from './Show.module.css'

function Season({ seriesId, season }) {

    var [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        movieDB.tvSeasons.getById({ id: seriesId, season_number: season.season_number }, (success) => {
            var data = JSON.parse(success);
            setEpisodes(data.episodes);
        }, () => {});
    }, [season, seriesId]);

        var image = movieDB.common.getImage({size: "original", file: season.poster_path});

        return (
            <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                <div className={styles.season}>
                    <div className={styles.image_season}>
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div>
                        <h3>Season {season.season_number} - {season.name}</h3>
                        <div>
                            {episodes.map(episode => (
                                <li key={episode.id}>
                                    {episode.episode_number} - {episode.name}
                                </li>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
            )

}

export default Season