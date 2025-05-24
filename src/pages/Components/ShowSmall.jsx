import styles from './ShowSmall.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useNavigate  } from 'react-router';
import movieDB from '../../movieDB.js';

const ShowSmall = ({data, watchData, hidden}) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var id = data.id;
    var image = movieDB.common.getImage({size: "original", file: data.poster_path}); 
    return (
        <div hidden={hidden}>
            <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                <div className={styles.receipt} onClick={() => handleClick("show/" + id)} >
                    <div className={styles.image} >
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>{data.name}</div>
                        <div className={styles.details}>{data.overview}</div>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
        )
};

export default ShowSmall