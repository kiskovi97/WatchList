import styles from './Receipt.module.css'
import inputStyles from './Input.module.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { useState, useEffect } from 'react';
import { uploadData } from '../../dynamoService.js';
import InputList from './InputList.jsx';
import InputListList from './InputListList.jsx';

function BigDBReceipt({ proj }) {
    const [allValues, setAllValues] = useState(proj);
    const handleChange = (e) => {
        setAllValues({ ...allValues, [e.target.name]: e.target.value });
    }; 
    const upload = async () => {
        await uploadData(allValues);
    }
    useEffect(() => {
        if(proj) {
            setAllValues({ ...proj })
        }
    }, [proj])

    var image = proj.image?.startsWith("/CookBook") ? "https://kiskovi97.github.io" + proj.image : proj.image; 
    image = image?.replace("static/media", "images");

        return (
            <div className={styles.receipt}>
                <div className={styles.main}>
                    <div className={styles.details}>
                        <div className={styles.title}>
                            <input className={inputStyles.text}
                                type="text"
                                name='title'
                                placeholder="Paste recipe URL here"
                                value={allValues.title}
                                defaultValue={allValues.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <textarea className={inputStyles.textarea}
                                name='details'
                                placeholder="Paste recipe URL here"
                                value={allValues.details}
                                defaultValue={allValues.details}
                                onChange={handleChange}
                            />
                        </div>
                        {proj.sources && proj.sources.length > 0 ? (<div>Források:</div>) : null}
                        {proj.sources?.map(source => (
                            <div>
                                <a href={source.link} target="_blank" rel="noreferrer">{source.name}</a>
                            </div>))}

                    </div>
                    <div className={styles.image}>
                        <img src={image} hidden={!image} alt="" className={styles.background} />
                    </div>
                </div>
                <div className={styles.description}>
                    <ScrollAnimation animateIn="fadeInLeft" animateOut="fadeOutLeft" animateOnce >
                        <InputListList name="ingredients" onChanged={handleChange} defaultState={proj.ingredients}/>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInRight" animateOut="fadeOutRight" animateOnce >
                        <div>
                            {proj.comment ? (<li>{proj.comment}</li>) : null}
                            <InputList name="instructions" onChanged={handleChange} defaultState={proj.instructions}/>
                        </div>
                    </ScrollAnimation>
                </div>
                <div  className={styles.description}>
                    <div>
                        <button className={inputStyles.button} onClick={upload}>Upload</button>
                    </div>
                </div>
            </div>)

}

export default BigDBReceipt