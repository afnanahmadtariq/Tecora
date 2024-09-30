import { useState } from 'react'
import tecoraLogo from './assets/Tecora logo.svg'
import Home from './Home';
import './App.css'



function App() {
  const [count, setCount] = useState(0)
  const [showHome, setShowHome] = useState(false); // State to track if Home should be shown

  if (showHome) {
    return <Home />; // Render the Home component if state is true
  }

  return (
    <div className='root'>
      <div>
          <img src={tecoraLogo} className="logo" alt="Tecora logo" onClick={() => setShowHome(true)} // Set state to true to switch to Home
          style={{ cursor: 'pointer' }}/>
      </div>
      <h1 className='name'>Tecora</h1>
      <div className="card">
        <button className="gradient-signup-button" onClick={() => setCount((count) => count + 1)}>
          Click me {count}
        </button>
      </div>
      <p className="read-the-docs">
        Coming Soon, Please be Patient!<br></br>
        You can click the above in the mean time.
      </p>
    </div>
  )
}

export default App
