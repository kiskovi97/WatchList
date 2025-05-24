import styles from './Page.module.css'
import ShowBig from './Components/ShowBig'

import { useEffect, useState } from 'react';
import movieDB from '../movieDB.js';
import { fetchDataById } from '../dynamoService';

var Show = () => {
    var query = window.location.href.split('/');
    var id = query[query.length - 1];
    const [dbData, setDBData] = useState(null);

    useEffect(() => {
        movieDB.tv.getById({ id }, async (success) =>{
            var data = JSON.parse(success);
            var watchDataResult = await fetchDataById(data.id);
            console.log(watchDataResult);
            if (watchDataResult.success)
                setDBData({ show: data, watchData: watchDataResult.data });
            else
                setDBData({ show: data, watchData: undefined });
        }, () => {});
    }, [id]);

    if (dbData)
        return (<div className={styles.page}>
            <ShowBig show={dbData.show} watchData={dbData.watchData}/>
        </div>);
    return (<div className={styles.page}></div>);
}
    
    
export default Show