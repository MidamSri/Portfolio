  import React, { useEffect, useRef } from 'react';
  import { ArrowDown } from 'lucide-react';

  const Hero = () => {
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Handle parallax effect
    useEffect(() => {
      const handleScroll = () => {
        if (parallaxRef.current) {
          const scrollY = window.scrollY;
          parallaxRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle the reveal animation for elements (trigger every time they come into view)
    useEffect(() => {
      const revealElements = document.querySelectorAll('.reveal');

      const reveal = () => {
        revealElements.forEach((element: HTMLElement) => {
          const windowHeight = window.innerHeight;
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;

          // Check if element is in view
          if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');  // Add animation class when in view
          } else {
            element.classList.remove('active');  // Remove animation class when out of view
          }
        });
      };

      window.addEventListener('scroll', reveal);
      // Trigger once on load
      reveal();

      return () => window.removeEventListener('scroll', reveal);
    }, []);

    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden parallax">
        <div className="parallax-bg bg-gradient-to-b from-blue-50 to-white" ref={parallaxRef}></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 reveal">
              Built to Think. <span className="text-primary block">Designed to Feel.</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 mb-8 reveal" style={{ transitionDelay: '100ms' }}>
              Multi-Awesome developer and interaction designer blending machine learning, computer vision,
              and intuitive design to build digital products that are both smart and seamless.
            </p>

            <div className="reveal" style={{ transitionDelay: '200ms' }}>
              <a href="#projects" className="apple-button group inline-flex items-center gap-2">
                View Projects
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </div>

            {/* Floating design elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div
              className="absolute -bottom-8 -right-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
              style={{ animationDelay: '2s' }}
            ></div>
          </div>
        </div>

        {/* Scroll indicator with clickable scroll functionality */}
        <a
          href="#projects"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer group"
        >
          <span className="text-sm text-foreground/60 mb-2 group-hover:text-primary transition-colors">
            Scroll
          </span>
          <ArrowDown className="h-5 w-5 text-foreground/60 group-hover:text-primary transition-colors" />
        </a>
      </section>
    );
  };

  export default Hero;
