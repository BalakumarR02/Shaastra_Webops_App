import React, { useState } from 'react'
import Formto from "./Formto";
import { AiOutlineCloseCircle, AiFillEdit } from 'react-icons/ai'

function Todo(props) {

    const [edit, setEdit] = useState({
        id: null,
        value: '',
        isComp: false
    });
    const submitEdit = (value) => {
        props.editTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        })
    };
    if (edit.id && !edit.isComp) {
        return <Formto onSubmit={submitEdit} edit={edit} />
    }
    let todoList = props.todos.filter((todo) => {
        if (props.filt === "All") {
            return todo;
        }
        else if (props.filt === "Completed") {
            if (todo.isComp)
                return todo;

        }
        else {
            if (!todo.isComp)
                return todo;
        }

    })
    todoList = todoList.filter((todo) => {
        return ((todo.text).includes(props.search))

    })
    return (todoList.length ? (todoList.map((todo, index) => (

        <div className='row d-flex justify-content-center' >
            <div className={todo.isComp ? 'comp todo-row' : 'todo-row'} key={index}>
                <div className='d-inline' key={todo.id} onClick={() => { props.compTodo(todo.id) }}>
                    {todo.text}
                </div>
                <div className="icons">
                    <AiFillEdit className='edit_i' onClick={() => setEdit({ id: todo.id, value: todo.text, isComp: todo.isComp })} />
                    <AiOutlineCloseCircle className='remove_i' onClick={() => props.removeTodo(todo.id)} />
                </div>

            </div>
        </div >


    )))
        : (
            <div>

            </div>
        )


    )
}

export default Todo