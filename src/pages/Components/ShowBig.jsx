import styles from './Show.module.css'
import Season from './Season.jsx';
import { uploadData, removeDataById } from '../../dynamoService';
import { useEffect, useState } from 'react';

function ShowBig({ show, watchData, onRefresh}) {
    var image = show.image?.original || show.image?.medium;
    var [episodesWatched, setEpisodesWatched] = useState([]);

    const onRemoveFromMyShows = () => {
        removeDataById(show.id.toString());
        if (onRefresh) onRefresh();
    };
    const onAddToMyShows = () => {
        let uploadableData = {
            showId: show.id.toString(),
        }
        uploadData(uploadableData);
        if (onRefresh) onRefresh();
    };

    const setOffset = (offset) => {
        var offsetInt = Number.parseInt(offset);
        if (watchData && offsetInt) {
            watchData.offset = offsetInt;
            uploadData(watchData);
        }
    }

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }

    const onEpisodesAdded = (episodes) => {
        let watched = episodesWatched;
        for (let episode of episodes)
        {
            if (!watched.includes(episode.id) && Date.parse(episode.airstamp) <= Date.now())
                watched.push(episode.id);
        }
        watched = watched.filter(onlyUnique);
        watchData.episodes = [...watched];
        setEpisodesWatched([...watched]);
        uploadData(watchData);
    }

    const onEpisodesRemoved = (episodes) => {
        let watched = episodesWatched;
        watched = watched.filter(item => episodes.some(episode => episode.id !== item)).filter(onlyUnique);
        watchData.episodes = [...watched];
        setEpisodesWatched([...watched]);
        uploadData(watchData);
    }

    useEffect(() => {
        if (watchData && watchData.episodes) {
            setEpisodesWatched(watchData.episodes);
        } else {
            setEpisodesWatched([]);
        }
    }, [watchData]);

    const seasonEpisodeNumber = show.episodes.length;
    const watchedEpisodeCount = watchData && watchData.episodes ? watchData.episodes.length : 0;
    const offset = watchData ? watchData.offset : 0;

    return (
        <div className={styles.receipt}>
            <div className={styles.main}>
                <div className={styles.details}>
                    <button onClick={onAddToMyShows} hidden={watchData}>Add To My Shows</button>
                    <button onClick={onRemoveFromMyShows} hidden={!watchData}>Remove from My Shows</button>
                    <div>
                        Offset
                        <input type="number" id="offset" name="offset" min="-24" max="48"
                            onChange={(e) => setOffset(e.target.value)} defaultValue={offset}/>
                        Hours
                    </div>
                    <h1 className={styles.title}>{show.name}</h1>
                    <h4 hidden={!watchData}>
                        {(watchedEpisodeCount /seasonEpisodeNumber * 100).toPrecision(4)}% Watched ({watchedEpisodeCount} of {seasonEpisodeNumber} episodes)
                    </h4>
                    <div>{show.overview}</div>
                </div>
                <div className={styles.image} key="image">
                    <img src={image} hidden={!image} alt="" className={styles.background} />
                </div>
            </div>
            <div className={styles.description}>
            {show.seasons?.filter(season => season.season_number !== 0).map(season => (
                <Season season={season} seriesId={show.id} key={season.season_number} 
                    offset={offset}
                    episodesWatched={episodesWatched} 
                    onEpisodesAdded={onEpisodesAdded} 
                    onEpisodesRemoved={onEpisodesRemoved}
                    editable={watchData}/>))}
            </div>
        </div>)

}

export default ShowBig