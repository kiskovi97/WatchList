import styles from './Page.module.css'
import ShowBig from './Components/ShowBig'

import { useEffect, useState } from 'react';
import movieDB from '../movieDB.js';

var Show = () => {
    var query = window.location.href.split('/');
    var id = query[query.length - 1];
    const [dbData, setDBData] = useState([]);

    useEffect(() => {
        movieDB.tv.getById({ id }, (success) =>{
            var data = JSON.parse(success);
            setDBData(data);
        }, () => {});
    }, [id]);

    if (dbData)
        return (<div className={styles.page}>
            <ShowBig data={dbData}/>
        </div>);
    return (<div className={styles.page}></div>);
}
    
    
export default Show