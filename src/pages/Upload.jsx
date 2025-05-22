import styles from './Page.module.css'
import AddDishButton from './Components/AddDishButton'
import { useState } from 'react'
import { uploadNewData } from '../dynamoService.js';
import inputStyles from './Components/Input.module.css'
import BigDBReceipt from "./Components/BigDBReceipt.jsx"

var Upload = () =>
{
    const [ data, setData ] = useState();

    const uploadRecepie = async () => {
        if (!data) return;

        await uploadNewData(data);
        
        alert('Dish uploaded successfully!');
        setData(null);
    }
    return (
    <div className={styles.page}>
        <AddDishButton onClickedAndChanged={setData}/>
        <button onClick={uploadRecepie} disabled={!data} class={inputStyles.button}>UPLOAD AS NEW</button>
        { data ? (<BigDBReceipt proj={data}/>) : null }
    </div>);
}

export default Upload