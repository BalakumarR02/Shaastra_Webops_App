import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';


function Formto(props) {
    const [item, setItem] = useState("");
    const handleChange = (e) => {
        setItem(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            id: uuid(),
            text: item
        });
        setItem('');
    }

    return (
        <div>
            <form className='todo-form' onSubmit={handleSubmit}>
                {props.edit ? (
                    <>
                        <div className='row'>
                            <div className='col-12'>
                                <input className='todo-input' type="text" placeholder='Edit Todo' name="addTodo" value={item} onChange={handleChange} />
                                <button className='btn btn-primary todo-button'> Submit</button>
                            </div>


                        </div>
                    </>
                ) : (
                    <>
                        <div className='row'>
                            <div className='col-12'>
                                <input className='todo-input' type="text" placeholder='Add Todo' name="addTodo" value={item} onChange={handleChange} />
                                <button className='btn btn-primary todo-button'> Submit</button>
                            </div>



                        </div>
                    </>

                )}
            </form>
        </div >
    )
}

export default Formto