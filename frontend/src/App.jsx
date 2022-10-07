import { useState } from 'react'
import Hero from './hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Hero />
      <h1>Make a commit.</h1>
      <button>Raise count</button>
    </div>
  )
}

export default App
