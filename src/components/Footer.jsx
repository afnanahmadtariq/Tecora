import logo from '../assets/Tecora logo.svg'
import arrow from '../assets/icons/arrow.svg'
import facebook from '../assets/icons/facebook black.1.svg'
import twitter from '../assets/icons/twitter black.1.svg'
import linkedin from '../assets/icons/linkedin black.1.svg'
import insta from '../assets/icons/insta.svg'
import './Footer.css'

function Footer() {

  return (
    <footer>
        <div id='foot-box'>
            <div id='trademark'>
                <img src={logo} alt="" />
                <h1 id='tecora'>Tecora</h1>
            </div>
            <ul>
                <li>Explore</li>
                <li>Projects</li>
                <li>My Querries</li>
                <li>Top Experts</li>
            </ul>
            <div id='contact'>
                <p>Subscribe</p>
                <div className='contact-container'>
                    <input
                        type="text"
                        placeholder="Get product updates"
                        className="updates"
                    />
                    <span className="action-buttion"><img src={arrow}alt="search" /></span>
                </div>
                <div id='socials'>
                    <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={linkedin} alt="" />
                    <img src={insta} alt="" />
                </div>
            </div>
        </div>
        <p id='copyright'>© 2024 Tecora. All Rights Reserved</p>
    </footer>
  )
}

export default Footer
