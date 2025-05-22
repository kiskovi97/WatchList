import styles from './SmallReceipt.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useNavigate  } from 'react-router';

const DBReceipt = ({proj, hidden}) => {
    const navigate = useNavigate();
    const handleClick = (index) => navigate("/" + index);

    var id = proj.id;
    var image = proj.image?.startsWith("/CookBook") ? "https://kiskovi97.github.io" + proj.image : proj.image; 
    image = image?.replace("static/media", "images");
    return (
        <div hidden={hidden}>
            <ScrollAnimation animateIn={"fadeIn"} animateOnce duration={0.6} offset={0}>
                <div className={styles.receipt} onClick={() => handleClick("dbdish/" + id)} >
                    <div className={styles.image} >
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                    <div className={styles.description} >
                        <div className={styles.title}>{proj.title}</div>
                        <div className={styles.details}>{proj.details}</div>
                    </div>
                </div>
            </ScrollAnimation>
        </div>
        )
};

export default DBReceipt