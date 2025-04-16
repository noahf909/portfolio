import React from 'react';

const Experience: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="min-h-screen flex items-center justify-center bg-white"
    >
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl mb-8 text-center"
          style={{ 
            fontFamily: 'Adobe Myungjo Std',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          EXPERIENCE
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'Adobe Myungjo Std' }}>Software Engineer</h3>
            <p className="text-xl mb-2">Company Name • 2022 - Present</p>
            <p className="mb-4">
              Developed and maintained web applications using React, TypeScript, and Node.js.
              Collaborated with cross-functional teams to deliver high-quality software solutions.
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Led the development of a customer-facing dashboard application</li>
              <li>Implemented responsive designs and improved application performance</li>
              <li>Participated in code reviews and mentored junior developers</li>
            </ul>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl mb-2" style={{ fontFamily: 'Adobe Myungjo Std' }}>Junior Developer</h3>
            <p className="text-xl mb-2">Previous Company • 2020 - 2022</p>
            <p className="mb-4">
              Assisted in the development of web applications and implemented responsive designs.
              Participated in code reviews and testing procedures.
            </p>
            <ul className="list-disc pl-5">
              <li>Contributed to front-end development using React and CSS</li>
              <li>Assisted in implementing API integrations and data visualization</li>
              <li>Participated in agile development processes and sprint planning</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
