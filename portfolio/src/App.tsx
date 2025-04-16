import {useEffect, useRef} from 'react';
import Header from './components/layout/Header';
import './App.css';
// import Lenis from '@studio-freight/lenis'; // REMOVED Lenis import
import React, { Suspense, lazy } from 'react';
// import { animate } from "framer-motion"; // Import animate

// Import the font
import './assets/fonts.css';

// Debounce Utility Function (keep this from previous step)
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), waitFor);
  };
}

// Lazy load section components
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));

function App() {
  const heroRef = useRef(null); // Ref for the hero section content positioning
  const backgroundRef = useRef(null); // Ref for the Vanta background element

  // --- NEW: Add navigation click handler for snap scrolling ---
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      e.preventDefault(); // Prevent default instant jump
      
      // Get the target section ID from the href attribute
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.slice(1); // Remove the # character
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Use a small setTimeout to create a microtask
          // This allows the browser to handle the scroll as a separate event
          // which helps the CSS snap behavior work properly
          setTimeout(() => {
            // Scroll to element with smooth behavior to engage CSS snap
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }, 10);
        }
      }
    };
    
    // Add click handlers to all navigation links
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });
    
    // Clean up event listeners on unmount
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  // Initialize Vanta.js clouds effect on the background element
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };

    let vantaEffect: any = null;

    const initVanta = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js');
        
        // Target the backgroundRef for Vanta
        if (window.VANTA && backgroundRef.current) {
          vantaEffect = window.VANTA.CLOUDS({
            el: backgroundRef.current,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: window.innerHeight,
            minWidth: window.innerWidth,
            highlightColor: 0x9ec7f7,
            midtoneColor: 0x5a7aaa,
            lowlightColor: 0x1a3c59,
            baseColor: 0xadc2db,
            speed: 0.8,
            zoom: 0.3
          });
          
          if (vantaEffect.renderer) {
            vantaEffect.renderer.setSize(window.innerWidth, window.innerHeight);
            // Ensure Vanta canvas stays in the background
            vantaEffect.renderer.domElement.style.zIndex = '-1';
          }
          
          // Debounced resize handler
          const handleResize = debounce(() => {
            if (vantaEffect) {
              vantaEffect.setOptions({
                minHeight: window.innerHeight,
                minWidth: window.innerWidth
              });
              if (vantaEffect.renderer) {
                vantaEffect.renderer.setSize(window.innerWidth, window.innerHeight);
              }
            }
          }, 250);
          
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }
      } catch (error) {
        console.error("Failed to initialize Vanta effect:", error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  // REMOVED: Extra useEffect for forcing header styles

  return (
    <div className="App w-full overflow-x-hidden"> {/* Prevent horizontal overflow */}
      {/* Fixed background element for Vanta */}
      <div 
        ref={backgroundRef}
        className="fixed top-0 left-0 w-screen h-screen z-[-1]" 
        id="background-effect"
      ></div>

      {/* Header - Stays fixed via CSS */}
      <Header />
      
      {/* Hero Section - Now part of the normal scroll flow */}
      <section 
        id="hero" 
        ref={heroRef} // Ref still useful if needed for other logic
        className="h-screen w-full relative flex items-center justify-center" // Use flex to center content
      >
        {/* Content container for Hero */}
        <div 
          className="relative z-10 text-center" // Use relative positioning and z-index
          // Removed inline fixed positioning styles
        >
          <h1 
            style={{ 
              fontFamily: 'Adobe Myungjo Std',
              fontStyle: 'normal',
              fontWeight: 400,
              color: '#000000',
              letterSpacing: '0.09em', // Adjusted spacing if needed
              fontSize: '7rem', // Adjusted size if needed
              margin: 0,
              padding: 0,
              textTransform: 'uppercase',
              lineHeight: '1.5',
            }}
          >
            NOAH FUHRMAN
          </h1>
          
          <p 
            style={{ 
              fontFamily: 'Adobe Myungjo Std',
              fontStyle: 'normal',
              fontWeight: 400,
              color: '#000000',
              letterSpacing: '0.4em',
              fontSize: '1.5rem',
              margin: 0,
              padding: 0
            }}
          >
            (ASPIRING)SOFTWARE ENGI(⎌ℕ⎌)EER
          </p>
        </div>
      </section>
      
      {/* Content sections container - follows Hero */}
      <div id="content-sections">
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
          <About />
          <Experience />
          <Projects />
          <Contact />
        </Suspense>
      </div>
    </div>
  );
}

// Add TypeScript declaration for VANTA
declare global {
  interface Window {
    VANTA: {
      CLOUDS: (options: any) => any;
    };
  }
}

export default App; 