import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from 'react';


const element = props => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  function handleChange(event) {
    setValue(event.target.value);
    console.log(value);
  }

  function handleSubmit(event) {
    setTodos([value]);
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


        <div className='flex m-2 p-1 gap-2 w-full'>
          <input type="checkbox" name="" id="" />
          <p className='flex'>Sample Todo 1</p>


          <FaEdit className='ml-auto' size={22} color="blue" />
          <FaTrash className='' size={22} color="red" />
        </div>

           {todos.map((todo) =>(
            <div className='flex m-2 p-1 gap-2 w-full'>
          <input type="checkbox" name="" id="" />
          <p className='flex'>{todo}</p>


          <FaEdit className='ml-auto' size={22} color="blue" />
          <FaTrash className='' size={22} color="red" />
        </div>
           ))}



      </div>

    </div>
  )
}



export default element