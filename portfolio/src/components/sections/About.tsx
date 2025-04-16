import React from 'react';

const About: React.FC = () => {
  return (
    <section 
      id="about" 
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
          ABOUT
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
            rhoncus ut eleifend nibh porttitor.
          </p>
          <p className="text-lg mb-6">
            Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl 
            tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor 
            posuere. Praesent id metus massa, ut blandit odio.
          </p>
          <p className="text-lg">
            Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. 
            Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
