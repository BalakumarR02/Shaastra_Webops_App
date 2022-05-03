import React, { useState } from 'react'
import Formto from "./Formto"
import Todo from "./Todo"
import Tfilter from "./Tfilter"
import Tsearch from "./Tsearch"

function TList() {
    const [todos, setTodos] = useState([]);
    const [sel, setSel] = useState("All");
    const [search, setSearch] = useState("");
    let searchTodo;
    const addTodos = todo => {
        if (!todo.text) {
            return;
        }
        const newUpdate = [todo, ...todos];
        setTodos(newUpdate);
    }
    const removeTodo = (id) => {
        let newList = todos.filter((todo, index) => {
            return todo.id !== id
        })
        setTodos(newList);
    }
    const editTodo = (id, value) => {
        if (!value) {
            return;
        }
        setTodos(todos => todos.map(todo => (todo.id === id ? value : todo)));
    }
    const searchChange = (e) => {
        setSearch(e.target.value);
    }

    const compTodo = (id) => {
        let newList = todos.map((todo) => {
            if (todo.id === id) {
                todo.isComp = !todo.isComp;
            }
            return todo;
        })
        setTodos(newList);

    }
    const selChange = (e) => {
        setSel(e.target.value)
    }
    return (

        <div className='todo-body'>
            <div className='row'>
                <h1 className='todo-head'>To-do List</h1>

                <Formto onSubmit={addTodos} />
                <div className='col-12 filters'>
                    <Tfilter sel={sel} selChange={selChange} />
                    <Tsearch search={search} searchChange={searchChange} />
                </div>

                <Todo todos={todos} filt={sel} search={search} compTodo={compTodo} editTodo={editTodo} removeTodo={removeTodo} />
            </div>


        </div>

    )
}

export default TList