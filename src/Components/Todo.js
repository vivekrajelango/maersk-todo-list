import React, { useEffect, useState } from "react";

const prevRecord = [{"id":29,"todo":"Make own LEGO creation","completed":false}]

const Todo=()=>{
    const [todoList, setTodoList] = useState();
    const [addedList, setAddedList] = useState(prevRecord);
    const [limit, setLimit] = useState(5);

    useEffect(()=>{
        fetch(`https://dummyjson.com/todos?limit=${limit}`)
            .then(res=>res.json())
            .then(res=>{ 
                setTodoList(res.todos);
            })
    },[])

    const todoHandler=(e)=>{
        const indexId = e.target.value;

        const newItem = todoList.filter(item=>item.id == indexId);
        setAddedList([...addedList, {...newItem[0]}])

        setTodoList((current)=>{
            return current.filter((item)=> item.id != indexId)
        })
    }
    return(
        <div className="main">
            <h4 className="text-center">I did it</h4>
            <div className="added-List pt-2">
                <div className="d-flex flex-column flex-lg-row justify-content-center">
                {addedList ? addedList.map((item)=>{
                    return <div key={item.id} className="card">
                                <div className="card-body">
                                    <p className="card-text">{item.todo}</p>
                                </div>
                            </div>
                }) : ''}
                </div>
            </div>
            <h4 className="text-center mt-3">To Do</h4>
            <div className="todo-List">
                    {todoList ? todoList.map((item)=>{
                        return <div key={item.id} className="todo-Items d-flex">
                                <input type="checkbox" value={item.id} className="me-1" onChange={todoHandler}/>
                                <label className="d-inline-block text-truncate" style={{'maxWidth': '250px'}}>{item.id}. {item.todo}</label>
                            </div>
                    }) : ''}
            </div>
            <h4 className=" my-2 text-center">Task Board by Vivek Raj Elango</h4>
        </div>
    )
}

export default Todo;