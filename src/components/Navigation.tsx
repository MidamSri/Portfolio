
import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Context-aware greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Play sound on navigation click (if enabled)
  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio('/navigation-click.mp3');
      audio.volume = 0.2;
      audio.play().catch(err => console.error('Audio failed to play:', err));
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('soundEnabled', newState.toString());
      return newState;
    });
  };

  // Load sound preference from localStorage
  useEffect(() => {
    const savedSoundPreference = localStorage.getItem('soundEnabled');
    if (savedSoundPreference !== null) {
      setSoundEnabled(savedSoundPreference === 'true');
    }
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="text-lg font-display font-semibold text-primary" onClick={playSound}>
            Midam Srivastava
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="hover-link text-foreground/80 hover:text-foreground" onClick={playSound}>About</a>
            <a href="#projects" className="hover-link text-foreground/80 hover:text-foreground" onClick={playSound}>Projects</a>
            <a href="#process" className="hover-link text-foreground/80 hover:text-foreground" onClick={playSound}>Process</a>
            <a href="#contact" className="hover-link text-foreground/80 hover:text-foreground" onClick={playSound}>Contact</a>
            
            {/* Sound toggle */}
            <button 
              onClick={toggleSound} 
              className="text-foreground/60 hover:text-foreground"
              aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
            
            {/* Context-aware greeting */}
            <span className="text-sm text-foreground/60 font-light hidden lg:inline-block">{greeting}</span>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <nav className="flex flex-col items-center space-y-8 text-xl">
          <a 
            href="#about" 
            className="hover-link text-foreground/80 hover:text-foreground"
            onClick={() => { playSound(); setIsOpen(false); }}
          >
            About
          </a>
          <a 
            href="#projects" 
            className="hover-link text-foreground/80 hover:text-foreground"
            onClick={() => { playSound(); setIsOpen(false); }}
          >
            Projects
          </a>
          <a 
            href="#process" 
            className="hover-link text-foreground/80 hover:text-foreground"
            onClick={() => { playSound(); setIsOpen(false); }}
          >
            Process
          </a>
          <a 
            href="#contact" 
            className="hover-link text-foreground/80 hover:text-foreground"
            onClick={() => { playSound(); setIsOpen(false); }}
          >
            Contact
          </a>
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 w-32 justify-center">
            <button 
              onClick={toggleSound} 
              className="text-foreground/60 hover:text-foreground"
              aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
