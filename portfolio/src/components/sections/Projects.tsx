import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Project One",
      description: "A brief description of project one and its features.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/yourusername/project-one"
    },
    {
      title: "Project Two",
      description: "A brief description of project two and its features.",
      technologies: ["Node.js", "Express", "MongoDB"],
      link: "https://github.com/yourusername/project-two"
    },
    {
      title: "Project Three",
      description: "A brief description of project three and its features.",
      technologies: ["Python", "Django", "PostgreSQL"],
      link: "https://github.com/yourusername/project-three"
    }
  ];

  return (
    <section 
      id="projects" 
      className="min-h-screen flex items-center justify-center bg-white"
    >
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl mb-12 text-center"
          style={{ 
            fontFamily: 'Adobe Myungjo Std',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          PROJECTS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl mb-3" style={{ fontFamily: 'Adobe Myungjo Std' }}>{project.title}</h3>
              <p className="mb-4">{project.description}</p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
