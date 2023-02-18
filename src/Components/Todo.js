import React, { useEffect, useRef, useState } from "react";

import data from "../data";

const Todo=()=>{
    const [todoList, setTodoList] = useState();
    const [addedList, setAddedList] = useState(data);
    const [limit, setLimit] = useState(5);
    const [indexNum, setIndexNum] = useState();
    const [checked, setChecked] = useState(false);
    const modalRef = useRef();
    const checkRef = useRef();

    useEffect(()=>{
        fetch(`https://dummyjson.com/todos?limit=${limit}`)
            .then(res=>res.json())
            .then(res=>{ 
                setTodoList(res.todos);
            })
    },[])

    const todoHandler=(e,index)=>{
        const indexing = e.target.value;
        // console.log('cc', e.target.checked);
        setIndexNum(indexing);
        if(index!==0){
            modalRef.current.style.display = 'block';
        }
        else { 
            const newItem = todoList.filter(item=>item.id == indexing);
            setAddedList([...addedList, {...newItem[0]}])

            setTodoList((current)=>{
                return current.filter((item)=> item.id != indexing)
            })
        }
    }

    const closeModal=()=>{
        modalRef.current.style.display = 'none';
        setChecked(false)
        // checkRef.current.checked=false;
        // console.log('xx', checkRef.current.checked)
    }
    const confirmhandler=()=>{
        const newItem = todoList.filter(item=>item.id == indexNum);
        setAddedList([...addedList, {...newItem[0]}])

        setTodoList((current)=>{
            return current.filter((item)=> item.id != indexNum)
        })
        closeModal();
    }
    return(
        <>
        <div className="main">
            <h4 className="text-center">I did it!</h4>
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
                    {todoList ? todoList.map((item, index)=>{
                        return <div key={item.id} className="todo-Items d-flex">
                                <input type="checkbox" ref={checkRef} value={item.id} className="me-1" onChange={e=>todoHandler(e,index)} checked={checked}/>
                                <label className="d-inline-block text-truncate" style={{'maxWidth': '250px'}}>{index+1}. {item.todo}</label>
                            </div>
                    }) : ''}
            </div>
            <h4 className="my-5 text-center">Task Board by Vivek Raj Elango</h4>
        
        </div>
        <div className="modal fade show" ref={modalRef} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Warning</h5>
                </div>
                <div className="modal-body">
                Are you sure want to proceed without completing the previous tasks?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal} data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={confirmhandler}>Proceed</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Todo;