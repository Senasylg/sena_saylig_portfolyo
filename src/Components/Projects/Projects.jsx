import React from 'react'
import './Projects.css'
import theme_pattern from '../../assets/pattern_blue_small.png'
import projects_data from "../../assets/projects_data";
import arrow_icon from '../../assets/arrow_icon.svg'

const Projects = () => {
    return (
        <div id="projects" className="projects">
            <div className="projects-title">
                <h1>Projelerim</h1>
                <img src={theme_pattern} alt=""/>
            </div>
            <div className="projects-container">
                {projects_data.map((project, index) => {
                    return <img key={index} src={project.p_img} alt=""/>
                })}
            </div>
            <div className="projects-showMore">
                <p>Daha Fazlasını Göster</p>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
    )
}

export default Projects