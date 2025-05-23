import styles from './Show.module.css'
import movieDB from '../../movieDB.js';
import Season from './Season.jsx';

function ShowBig({ data }) {

    var image = movieDB.common.getImage({size: "original", file: data.poster_path});

        return (
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{data.name}</h1>
                        <div>{data.overview}</div>
                    </div>
                    <div className={styles.image}>
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                </div>
                <div className={styles.description}>
                {data.seasons?.filter(season => season.season_number !== 0).map(season => (
                    <Season season={season} seriesId={data.id}/>))}
                </div>
            </div>)

}

export default ShowBig