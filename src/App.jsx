import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar.jsx'
import Element from './components/element.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Element /> 
    </>
  )
}

export default App
