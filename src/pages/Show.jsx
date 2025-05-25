import styles from './Page.module.css'
import ShowBig from './Components/ShowBig'

import { useEffect, useState } from 'react';
import { getShowById } from '../tvmaze.js';
import { fetchDataById } from '../dynamoService';

var Show = () => {
    var query = window.location.href.split('/');
    var id = query[query.length - 1];
    const [dbData, setDBData] = useState(null);

    const onRefresh = () => {
        fetchData(id);
    }

    const fetchData = async (id) => {
        if (!id) return;

        var data = await getShowById(id);

        if (!data) return;

        var watchDataResult = await fetchDataById(data.id);
        console.log(watchDataResult);
        if (watchDataResult.success)
            setDBData({ show: data, watchData: watchDataResult.data });
        else
            setDBData({ show: data, watchData: undefined });
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