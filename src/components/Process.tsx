
import React, { useEffect, useRef } from 'react';
import { Brain, Users, PenTool, LayoutGrid } from 'lucide-react';

interface ProcessStep {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    title: "Research & Analysis",
    description: "Understanding user needs through cognitive analysis and emotional mapping techniques.",
    icon: Brain,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "User Exploration",
    description: "Identifying emotional touchpoints and contextual adaptation opportunities.",
    icon: Users,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Interaction Design",
    description: "Creating multimodal experiences with adaptable interfaces and natural interactions.",
    icon: PenTool,
    color: "bg-teal-50 text-teal-600"
  },
  {
    title: "Prototyping & Testing",
    description: "Building working prototypes to test cognitive load and emotional engagement.",
    icon: LayoutGrid,
    color: "bg-orange-50 text-orange-600"
  }
];

const Process = () => {
  const processRef = useRef<HTMLDivElement>(null);
  
  // Animate the process steps line when they come into view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-progress');
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    if (processRef.current) {
      observer.observe(processRef.current);
    }
    
    return () => {
      if (processRef.current) {
        observer.unobserve(processRef.current);
      }
    };
  }, []);

  return (
    <section id="process" className="section bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Design Process</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A human-centered approach that integrates cognitive principles and emotional design.
          </p>
        </div>
        
        <div ref={processRef} className="relative mt-20 mb-10 reveal" style={{transitionDelay: '100ms'}}>
          {/* Process timeline line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-0.5 bg-gray-200 -translate-x-1/2 md:translate-x-0">
            <div className="h-0 bg-primary w-full transition-all duration-1000 ease-out animate-progress" style={{animationDuration: '1.5s', animationFillMode: 'forwards'}}></div>
          </div>
          
          <div className="space-y-16 md:space-y-24 relative">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-center gap-6 md:gap-10`}>
                {/* Process step circle */}
                <div className="flex-shrink-0 -order-1 md:order-none relative z-10">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-md`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                </div>
                
                {/* Process step content */}
                <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-md transform transition-all duration-500 ${index % 2 === 0 ? 'hover:-translate-y-2' : 'hover:translate-y-2'}`}>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-foreground/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Process metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 reveal" style={{transitionDelay: '200ms'}}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-primary mb-1">95%</div>
            <div className="text-sm text-foreground/70">User Satisfaction</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-primary mb-1">10+</div>
            <div className="text-sm text-foreground/70">Projects Completed</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-primary mb-1">80%</div>
            <div className="text-sm text-foreground/70">Task Efficiency</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-primary mb-1">1</div>
            <div className="text-sm text-foreground/70">Year Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
