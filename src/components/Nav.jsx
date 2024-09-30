import explore from '../assets/icons/explore.svg'
import projects from '../assets/icons/projects.svg'
import queries from '../assets/icons/queries.svg'
import topics from '../assets/icons/topics.svg'
import experts from '../assets/icons/experts.svg'
import tecora from '../assets/icons/tecora-page.svg'
import './Nav.css'

function Nav() {

  return (
    <div className='nav'>
        <ul>
            <li><img src={explore}alt="search" />Explore</li>
            <li><img src={projects}alt="projects" />Projects</li>
            <li><img src={queries}alt="queries" />Queries</li>
            <li><img src={topics}alt="topics" />Topics</li>
            <li><img src={experts}alt="experts" />Top Experts</li>
            <li><img src={tecora}alt="tecora" /><p id='tecora-page'>Tecora</p></li>
        </ul>
    </div>
  )
}

export default Nav
