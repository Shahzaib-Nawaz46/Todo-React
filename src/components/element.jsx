import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from 'react';


const element = props => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [isEditing ,setediting] = useState(false);
  const [editindex,setindex] = useState(null)

  function handleChange(event) {
    setValue(event.target.value);
    console.log(value);
  }

  function handleSubmit(event) {
      if (!value.trim()) return;
      
      if(isEditing){
        const updated = [...todos];
        updated[editindex] = value

        setTodos(updated)
        localStorage.getItem("todo",JSON.stringify(updated))
        setediting(false);
        setindex(null);
        setValue("");

      } else {

        setTodos([...todos,value]);
        setValue("");
      }
  }

  function startEditing(index) {
  setValue(todos[index]);   // put the todo into input field
  setediting(true);
  setindex(index);
}

  
  // saving todos to local storage
  useEffect(()=>{
     if(todos.length ===0) return ;
    const saved = localStorage.setItem("todos",JSON.stringify(todos));
    if(saved){    
      console.log(todos,"by useeefect");

    }

  },[todos]);

  // getting todos from local storage
  useEffect(()=>{
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if(savedTodos){
     console.log(savedTodos,"getting from local storage");
      setTodos(savedTodos);
      
    }
  },[]);

  //removing item from local storage and ui
  function removetodo(todo){
    const removed = todos.filter((item)=> item !== todo);
    localStorage.setItem("todos",JSON.stringify(removed));
    setTodos(removed);
    console.log(todos,"removed item");
  }

  //editing item 
  function editing(item,index){
    const edit = localStorage.getItem("todos")
    edit[index] = item
    

  }
  return (
    <div className='flex flex-col align-center items-center  p-7  w-full font-sans  '>
      <div className='border w-1/2 p-5 rounded-lg shadow-lg text-center min-h-[80vh] '>
        <h1 className='font-bold text-2xl'>iTask-Manage Your todo at one Place</h1>
        <h3 className='font-bold text-lg flex p-2'>Add a Todo</h3>
        <input className='w-[80%] border rounded-2xl p-1.5' type="text" placeholder='Enter your todos' value={value} onChange={handleChange} />
        <button className='bg-purple-800 p-2 px-6 mx-2 rounded-3xl text-white font-semibold' onClick={handleSubmit}>Save</button>


        <div className='flex gap-2 m-2 p-2 '>
          <input type="checkbox" name="" id="" />
          <p className='font-medium'> Show finished Task</p>
        </div>

        <div className=' mx-4 h-[0.01rem] bg-black ' > </div>
        <h2 className='flex p-2 m-2 font-semibold text-lg'>Your Todos</h2>


        

           {todos.map((todo,index) =>(
            <div key = {index} className='flex m-2 p-1 gap-2 w-full'>
          <input type="checkbox" name="" id="" />
          <p className='flex'>{todo}</p>


          <FaEdit className='ml-auto' size={22} color="blue"   onClick={() => startEditing(index)}/>
          <FaTrash className='' size={22} color="red" onClick={()=> removetodo(todo)} />
        </div>
           ))}



      </div>

    </div>
  )
}



export default element