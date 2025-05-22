import styles from './Receipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import movieDB from '../../movieDB.js';

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
                    <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                        {data.seasons?.map(station => (
                            <div>
                                <h3>{station.name}</h3>
                                <h5>{station.air_date}</h5>
                                <div>
                                    {station.overview}
                                </div>
                            </div>))}
                    </ScrollAnimation>
                </div>
            </div>)

}

export default ShowBig