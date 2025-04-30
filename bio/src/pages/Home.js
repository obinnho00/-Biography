import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Home.css';
import '../style/Resent-work.css';
import '../style/Tutorials.css';
import '../style/Research-section.css';
import '../style/personal_works-section.css';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaBars } from 'react-icons/fa';

function Homepage() {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [visited, setVisited] = useState({ number: 0 });
  const [loadAllData, setLoadAllData] = useState(false);
  const [introductionData, setIntroductionData] = useState([]);
  const [researchData, setResearchData] = useState([]);
  const [tutorialData, setTutorialData] = useState([]);
  const [personalWorkData, setPersonalWorkData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const [aboutMeData, setAboutMeData] = useState([]);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        // Make all API requests concurrently
        const [introduction, research, tutorial, personalWork, work, aboutMe] = await Promise.all([
          axios.get("http://localhost:8000/introduction"),
          axios.get("http://localhost:8000/research"),
          axios.get("http://localhost:8000/tutorial"),
          axios.get("http://localhost:8000/personal_work"),
          axios.get("http://localhost:8000/work"),
          axios.get("http://localhost:8000/about_me"),
        ]);

        // Set the fetched data to state
        setIntroductionData(introduction.data.error ? [] : introduction.data);
        setResearchData(research.data.error ? [] : research.data);
        setTutorialData(tutorial.data.error ? [] : tutorial.data);
        setPersonalWorkData(personalWork.data.error ? [] : personalWork.data);
        setWorkData(work.data.error ? [] : work.data);
        setAboutMeData(aboutMe.data.error ? [] : aboutMe.data);

        // Mark data as loaded
        setLoadAllData(true);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    // Only increment the visited count if data has loaded and it's the first time this session
    if (loadAllData && !localStorage.getItem('visited')) {
      setVisited((prevVisited) => ({ number: prevVisited.number + 1 }));
      localStorage.setItem('visited', true);  // Store the visited state in localStorage
    }
  }, [loadAllData]);

  const Handle_nav = (e) => {
    const navButton = e.target.getAttribute('data-section');
    // Add navigation logic here if needed
  };

  return (
    <div className='main-page'>

      <div className="welcome">
        <span id="welcome-page-display">Software Engineer</span>
        <h1 className="Name" id="full-name-display">Obi Arum</h1>
        <h2 className='introduction'>
          {introductionData.length > 0 ? introductionData[0].description : 'Loading introduction...'}
        </h2>
        <button className='News-Article' onClick={Handle_nav}>Article</button>
        <button className='Info' onClick={Handle_nav}>Info</button>
      </div>

      <div className="about-container">
        <div className="about-left">
          <img src="/image0.png" alt="Isaac Arum" className="about-image" />
          <div className="social-icons">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className='social-icon'>
              <FaGithub size={30} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className='social-icon'>
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

        <div className="about-right">
          <h1 className="about-title">About Me</h1>
          <p className="about-description">
            {aboutMeData.length > 0 ? aboutMeData[0].description : 'Loading about me...'}
          </p>
        </div>
      </div>

      <div className='Research'>
        <h1 className='Research-title'>Research Interest</h1>
        <div className="Research-grid">
          {researchData.map((research, val) => (
            <div className="Research-card" key={val}>
              <img src={process.env.PUBLIC_URL + '/' + research.image_path} alt={research.title} className="card-image" />
              <div className="Research-header">{research.title}</div>
              <div className="Research-description">
                <em>{research.description}</em>
              </div>
              <div className="Research-video">
                <video src={process.env.PUBLIC_URL + '/' + research.video_path} controls className="video-box" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='Works'>
        <h1 className='section-title'>Recent</h1>
        <div className="works-grid">
          {workData.map((work, index) => (
            <div className="work-card" key={index}>
              <img src={process.env.PUBLIC_URL + '/' + work.image_path} alt={work.title} className="recent-work-image" />
              <h2 className="work-title">{work.title}</h2>
              <p className="work-description">{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="personal-work_header">Personal Works</div>
          <div className='personal-work'>
            {personalWorkData.map((item, index) => (
              <div className="personal-work-container" key={index}>
                <header className="personal-work-header">{item.header}</header>
                <nav className="personal-work-nav">{item.project_type}</nav>
                <section className="personal-work-section">{item.description}</section>
                <aside className="tools-used">Tools: {item.tools_used}</aside>
                
                {/* Video content (local video file handling) */}
                <article className="video-content">
                  {item.video_content && (
                    <video width="100%" height="auto" controls className="video-box">
                      <source src={process.env.PUBLIC_URL + `/videos/${item.video_content}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </article>

                <footer className="footer-content-links">
                  {/* Handle GitHub links */}
                  {Array.isArray(item.github_links) ? (
                    item.github_links.map((link, i) => (
                      <a key={i} href={link} className="github-button">
                        Link {i + 1}
                      </a>
                    ))
                  ) : (
                    <a href={item.github_links} className="github-button">
                      Links
                    </a>
                  )}
                </footer>
              </div>
            ))}
          </div>

          <div className='HandsOnStudy'>
            <h1 className='HandsOnStudy-title'>Familiar Tools</h1>
            <div className="HandsOnStudy-grid">
              {tutorialData.map((research, val) => (
                <div className="HandsOnStudy-card" key={val}>
                   <div className="HandsOnStudy-header">{research.title}</div>
                  <div className="HandsOnStudy-description">
                    <em>{research.description}</em>
                  </div>
                  <div className="HandsOnStudy-video">
                    <video src={process.env.PUBLIC_URL + '/' + research.video_path} controls className="video-box" />
                  </div>
                </div>
              ))}
            </div>
          </div>



      
    </div>
  );
}

export default Homepage;
