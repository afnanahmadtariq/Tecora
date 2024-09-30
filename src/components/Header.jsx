import search from '../assets/icons/search.svg'
import './Header.css'

function Header() {

  return (
    <header>
        <h1 id='tecora'>Tecora</h1>
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search..."
                className="search-input"
            />
            <span className="search-icon"><img src={search}alt="search" /></span>
        </div>
        <button className="gradient-signup-button" >
          Sign up
        </button>
    </header>
  )
}

export default Header
