import styles from './Page.module.css'
import ShowBig from './Components/ShowBig'

import { useEffect, useState } from 'react';
import { fetchShowById } from '../showInfo.js';

var Show = () => {
    var query = window.location.href.split('/');
    var id = query[query.length - 1];
    const [dbData, setDBData] = useState(null);

    const onRefresh = () => {
        fetchData(id);
    }

    const fetchData = async (id) => {
        var dbData = await fetchShowById(id);
        if (!dbData.show) return;
        setDBData(dbData);
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    if (dbData)
        return (<div className={styles.page}>
            <ShowBig show={dbData.show} watchData={dbData.watchData} onRefresh={onRefresh}/>
        </div>);
    return (<div className={styles.page}></div>);
}
    
    
export default Show