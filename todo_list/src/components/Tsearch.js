import React from 'react'

function Tsearch(props) {
    return (
        <div>
            <input className='todo-search' type="text" placeholder='Search Todo' name="searchTodo" value={props.search} onChange={props.searchChange} />
        </div>

    )
}

export default Tsearch