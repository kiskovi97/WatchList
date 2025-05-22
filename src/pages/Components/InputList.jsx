import { useState, useEffect } from 'react';
import inputStyles from './Input.module.css'
import deleteIcon from '../../logos/bin.png';
import checkIcon from '../../logos/degree.png';

const InputList = ({ onChanged, name, defaultState }) => {
    const [list, setList] = useState(defaultState);

    const addInstruction = () => {
        let listPrev = [...list];
        listPrev.push("");
        onChanged({
            target : 
            {
                name, 
                value: [...listPrev ]
            }
        });
        setList([...listPrev ]);
    }
    
    const removeInstruction = (index) => {
        let listPrev = [...list];
        listPrev.splice(index, 1)
        onChanged({
            target : 
            {
                name, 
                value: [...listPrev ]
            }
        });
        setList([...listPrev ]);
    }

    const handleChange = (e) => {
        let listPrev = [...list];
        listPrev[e.target.name] = e.target.value;
        onChanged({
            target : 
            {
                name, 
                value: [...listPrev ]
            }
        });
        setList([...listPrev ]);
    }
     useEffect(() => {
            if(defaultState) {
                setList([ ...defaultState ])
            }
        }, [defaultState]);

    return(
        <div className={inputStyles.section}>
            {list?.map((value, index) => (
                <li className={inputStyles.section}>
                    <img src={checkIcon} alt="check" className={inputStyles.icon}/>
                    <textarea className={inputStyles.textarea} rows="8" cols="80"
                        name={index}
                        value={value}
                        defaultValue={value}
                        onChange={handleChange}
                    />
                    <img src={deleteIcon} alt="remove" className={inputStyles.icon} onClick={() => removeInstruction(index)}/>
                </li>
                ))}
                <li  className={inputStyles.section}>
                    <img src={checkIcon} alt="check" className={inputStyles.icon}/>
                    <button className={inputStyles.button} onClick={addInstruction}>Add New</button>
                </li>
        </div>)
}

export default InputList;