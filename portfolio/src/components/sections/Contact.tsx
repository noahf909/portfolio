import React from 'react';

const Contact: React.FC = () => {
  return (
    <section 
      id="contact" 
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
          CONTACT
        </h2>
        <div className="max-w-2xl mx-auto">
          <p className="mb-8 text-lg text-center">
            Feel free to reach out to me for collaborations or opportunities.
          </p>
          <div className="flex flex-col space-y-4">
            <a 
              href="mailto:your.email@example.com" 
              className="text-xl hover:underline"
              style={{ fontFamily: 'Adobe Myungjo Std' }}
            >
              your.email@example.com
            </a>
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl hover:underline"
              style={{ fontFamily: 'Adobe Myungjo Std' }}
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl hover:underline"
              style={{ fontFamily: 'Adobe Myungjo Std' }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
