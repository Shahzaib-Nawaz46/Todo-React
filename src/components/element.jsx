import React from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from 'react';

const Element = () => {

  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [isEditing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [showFinished, setShowFinished] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!value.trim()) return;

    if (isEditing) {
      const updated = [...todos];
      updated[editIndex].text = value;
      setTodos(updated);

      setEditing(false);
      setEditIndex(null);
      setValue("");

    } else {
      setTodos([...todos, { text: value, completed: false }]);
      setValue("");
    }
  };

  const startEditing = (index) => {
    setValue(todos[index].text);
    setEditing(true);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const removeTodo = (index) => {
    const filtered = todos.filter((item, i) => i !== index);
    setTodos(filtered);
  };

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) {
      setTodos(saved);
    }
  }, []);

  //   REQUIRED FILTER
  const filteredTodos = showFinished
    ? todos.filter(t => t.completed === true)    // Only finished
    : todos.filter(t => t.completed === false);  // Only unfinished

  return (
    <div className='flex flex-col align-center items-center p-7 w-full font-sans'>
      <div className='border w-full p-5 rounded-lg shadow-lg text-center min-h-[80vh] sm:w-1/2'>

        <h1 className='font-bold text-lg'>iTask - Manage Your Todo</h1>
        <h3 className='font-bold text-lg flex p-2'>Add a Todo</h3>

        <input
          className='w-[80%] border rounded-2xl p-1.5'
          type="text"
          placeholder='Enter your todo'
          value={value}
          onChange={handleChange}
        />

        <button
          className='bg-purple-800 p-2 px-6 mx-2 mt-2 rounded-3xl text-white font-semibold'
          onClick={handleSubmit}
        >
          {isEditing ? "Update" : "Save"}
        </button>

        <div className='flex gap-2 m-2 p-2'>
          <input
            type="checkbox"
            checked={showFinished}
            onChange={() => setShowFinished(!showFinished)}
          />
          <p className='font-medium'>Show Finished Tasks</p>
        </div>

        <div className='mx-4 h-[0.01rem] bg-black'></div>
        <h2 className='flex p-2 m-2 font-semibold text-lg'>Your Todos</h2>

        {filteredTodos.map((todo, index) => (
          <div key={index} className='flex m-2 p-1 gap-2 w-full items-center'>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />

            <p className={`flex ${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.text}
            </p>

            <FaEdit
              className='ml-auto cursor-pointer'
              size={22}
              color="blue"
              onClick={() => startEditing(index)}
            />

            <FaTrash
              className='cursor-pointer'
              size={22}
              color="red"
              onClick={() => removeTodo(index)}
            />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Element;
