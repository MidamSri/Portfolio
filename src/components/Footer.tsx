import React, { useState, useEffect } from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  // Simulate live visitor count (local storage + random increments)
  useEffect(() => {
    const storedCount = localStorage.getItem('visitorCount');
    const initialCount = storedCount ? parseInt(storedCount, 10) : 120 + Math.floor(Math.random() * 50);

    setVisitorCount(initialCount);

    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setVisitorCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem('visitorCount', newCount.toString());
          return newCount;
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand/Identity */}
          <div>
            <h2 className="text-lg font-display font-semibold text-primary mb-4">
              Midam
            </h2>
            <p className="text-foreground/70 text-sm mb-6">
              Creating meaningful digital experiences that connect on a human level.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  Projects
                </a>
              </li>
              <li>
                <a href="#process" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  Process
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Featured projects */}
          <div>
            <h3 className="text-base font-semibold mb-4">Featured Projects</h3>
            <ul className="space-y-2">
              <li>
                <a href="#flappy" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  Flappy Bird Game
                </a>
              </li>
              <li>
                <a href="#wellness" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  Lip-Reading
                </a>
              </li>
              <li>
                <a href="#echo" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  Ai Voice Assistant
                </a>
              </li>
              <li>
                <a href="#nebula" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                Smart Fashion Recommender & Virtual Try-On
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-base font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-foreground/70 text-sm">
                New Delhi, India
              </li>
              <li>
                <a href="mailto:srimidam@gmail.com" className="text-foreground/70 hover:text-primary transition-colors text-sm hover-link">
                  srimidam@gmail.com
                </a>
              </li>
              <li className="text-foreground/70 text-sm">
                +91 739 005 7777
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-200">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {currentYear} John Designer. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-foreground/60">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 pulse"></div>
            <span>{visitorCount} people visited this portfolio today</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
