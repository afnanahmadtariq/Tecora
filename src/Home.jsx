import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import tecoraLogo from './assets/Tecora logo.svg'
import peeps from './assets/2peeps.png'
import team from './assets/team.png'
import guidance from './assets/services/guidance.svg'
import qna from './assets/services/qna.svg'
import project from './assets/services/project.svg'
import collab from './assets/services/collab.svg'
import feed from './assets/services/feed.svg'
import resource from './assets/services/resource.svg'
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
        <div className='description'>
          <h1 className='caption'>Welcome to Tecora <br />Cumminications</h1>
          <p>Unlock real-time advice from industry experts and professionals. Whether you&apos;re seeking <br />
          answers to tough questions or looking to collaborate on projects, Tecora connects you <br />
          with the right minds to help you learn, grow, and succeed</p>
          <div><button className="gradient-signup-button" >Sign up</button></div>
        </div>
        <h1>Our Mission</h1>
        <div className='description des2'>
          <img src={peeps} alt="" />
          <p id='para2'>
            At Tecora, our mission is to empower individuals and communities by connecting 
            learners with experts in real-time. We believe that knowledge is most valuable when shared, 
            and our platform provides a space where questions can be asked, insights can be shared, and 
            collaborations can thrive. Whether you&apos;re a student seeking guidance or a professional looking 
            to share your expertise, Tecora is here to facilitate your journey of growth and discovery.
          </p>
        </div>
        <h1>Our Services</h1>
        <div className='description des3'>
          <div>
            <img src={guidance} alt="" />
            <img src={qna} alt="" />
            <img src={project} alt="" />
          </div>
          <div>
            <img src={collab} alt="" />
            <img src={feed} alt="" />
            <img src={resource} alt="" />
          </div>
        </div>
        <div className='description team'>
          <h1>Our Team</h1>
          <img src={team} alt="" />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
