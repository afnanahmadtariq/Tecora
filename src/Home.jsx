import Header from './components/Header'
import Nav from './components/nav'
import tecoraLogo from './assets/Tecora logo.svg'
import './Home.css'

function Home() {

  return (
    <>
      <Header /> 
      <Nav />
      <div className='main'>
        <div>
            <img src={tecoraLogo} className="main-logo" alt="React logo" />
        </div>
        <h1 className='name'>Tecora</h1>
      </div>
    </>
  )
}

export default Home
