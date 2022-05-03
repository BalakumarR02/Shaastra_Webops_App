import { React, useState } from 'react'

function Tfilter(props) {
    return (
        <div>
            <select class="todo-filter" value={props.sel} onChange={props.selChange}>
                <option value="All">ALL</option>
                <option value="Completed">COMPLETED</option>
                <option value="Active">ACTIVE</option>
            </select>
        </div>
    )
}

export default Tfilter