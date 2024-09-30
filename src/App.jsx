import { useState } from 'react'
import tecoraLogo from './assets/Tecora logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={tecoraLogo} className="logo" alt="React logo" />
      </div>
      <h1>Tecora</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Click me {count}
        </button>
      </div>
      <p className="read-the-docs">
        Coming Soon, Please be Patient!<br></br>
        You can click the above in the mean time.
      </p>
    </>
  )
}

export default App
