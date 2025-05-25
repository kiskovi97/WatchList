import styles from './Show.module.css'
import Season from './Season.jsx';
import { uploadData } from '../../dynamoService';

function ShowBig({ show , watchData}) {

    var image = show.image?.original || show.image?.medium;

    const onAddToMyShows = () => {
        let uploadableData = {
            showId: show.id.toString(),
        }
        uploadData(uploadableData);
    };

    const seasonEpisodeNumber = 10;
    const watchedEpisodeCount = watchData && watchData.episodes ? watchData.episodes.length : 0;

    return (
        <div className={styles.receipt}>
            <div className={styles.main}>
                <div className={styles.details}>
                    <button onClick={onAddToMyShows} hidden={watchData}>Add To My Shows</button>
                    <button onClick={onAddToMyShows} hidden={!watchData}>Remove from My Shows</button>
                    <h1 className={styles.title}>{show.name}</h1>
                    <h4 hidden={!watchData}>
                        {(watchedEpisodeCount /seasonEpisodeNumber * 100).toPrecision(4)}% Watched ({watchedEpisodeCount} of {seasonEpisodeNumber} episodes)
                    </h4>
                    <div>{show.overview}</div>
                </div>
                <div className={styles.image}>
                    <img src={image} hidden={!image} alt="" className={styles.background} />
                </div>
            </div>
            <div className={styles.description}>
            {show.seasons?.filter(season => season.season_number !== 0).map(season => (
                <Season season={season} seriesId={show.id} key={season.season_number} watchData={watchData}/>))}
            </div>
        </div>)

}

export default ShowBig