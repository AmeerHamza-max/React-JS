import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ClassBasedComponent from './Day2/class-based-component'
import FunctionalComponent from './Day2/functional-component'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>Hello React from react app</h1>
     <ClassBasedComponent />
     <FunctionalComponent />
    </>
  )
}

export default App
