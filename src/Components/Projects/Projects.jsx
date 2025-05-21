import React from 'react'
import './Projects.css'
import theme_pattern from '../../assets/pattern_blue_small.png'
import projects_data from "../../assets/projects_data"
import arrow_icon from '../../assets/arrow_icon.svg'

const Projects = () => {
    return (
        <div id="projects" className="projects">
            <div className="projects-title">
                <h1>Portfolyo</h1>
                <img src={theme_pattern} alt=""/>
            </div>
            <div className="projects-container">
                {projects_data.map((project, index) => (
                    <div key={index} className="project-card">
                        <div className="project-image-container">
                            <img src={project.p_img} alt={project.p_name} className="project-image"/>
                        </div>
                        <div className="project-info">
                            <h2>{project.p_name}</h2>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tools">
                                <strong>Kullanılan Programlar: </strong>
                                {project.tools.join(', ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="projects-showMore">
                <p>Daha Fazlasını Göster</p>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
    )
}

export default Projects
