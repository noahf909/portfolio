import { useState, useEffect } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header 
      className="header-nav fixed top-0 left-0 right-0 py-5"
      style={{ 
        zIndex: 9999,
        backgroundColor: scrolled ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(2px)'
      }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-center">
          <ul className="flex items-center">
            {['HOME', 'ABOUT', 'EXPERIENCE', 'PROJECTS', 'CONTACT'].map((item) => (
              <li key={item} className="nav-item mx-4 md:mx-6">
                <a
                  href={`#${item === 'HOME' ? 'hero' : item.toLowerCase()}`}
                  className="text-black hover:text-gray-600 transition-colors uppercase text-sm md:text-base tracking-wider py-2 px-1 block"
                  style={{ 
                    fontFamily: 'Adobe Myungjo Std',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    letterSpacing: '0.4em',
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
