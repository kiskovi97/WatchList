import { useState, useEffect } from 'react';
import InputList from './InputList';
import inputStyles from './Input.module.css'
import deleteIcon from '../../logos/bin.png';

const InputListList = ({ onChanged, name, defaultState }) => {
    const [list, setList] = useState(defaultState);

    const addInstruction = () => {
        let listPrev = [...list];
        listPrev.push({ title: "Ingredients", list: []});
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
    const handleTitleChange = (e) => {
        let listPrev = [...list];
        listPrev[e.target.name].title = e.target.value;
        onChanged({
            target : 
            {
                name, 
                value: [...listPrev ]
            }
        });
        setList([...listPrev ]);
    }

    const handleListChange = (e) => {
        let listPrev = [...list];
        listPrev[e.target.name].list = e.target.value;
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
        <div>
            {list?.map((value, index) => (
                <div>
                    <div className={inputStyles.header}>
                        <img src={deleteIcon} alt="remove" className={inputStyles.icon} onClick={() => removeInstruction(index)}/>
                        <input className={inputStyles.text}
                            type="text"
                            name={index}
                            value={value.title}
                            defaultValue={value.title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <InputList name={index} 
                            defaultState={value.list}
                            onChanged={handleListChange} />
                </div>
                ))}
                <button className={inputStyles.button} onClick={addInstruction}>Add</button>
        </div>)
}

export default InputListList;