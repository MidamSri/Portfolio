import React, { useEffect, useRef } from 'react';
import { Award, Lightbulb, Layers, Workflow } from 'lucide-react';

const Brain = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 0 19.5v-15A2.5 2.5 0 0 1 2.5 2h7z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h7a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 21.5 2h-7z" />
    <path d="M6 12h4" />
    <path d="M14 12h4" />
  </svg>
);

const Heart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

interface Skill {
  title: string;
  description: string;
  icon: React.ElementType;
}

const skills: Skill[] = [
  {
    title: "Machine Learning & AI",
    description: "Designing and building intelligent systems using advanced machine learning and AI algorithms.",
    icon: Layers
  },
  {
    title: "Robotics",
    description: "Developing robotics systems for real-world applications such as space debris detection and automated tasks.",
    icon: Workflow
  },
  {
    title: "Computer Vision",
    description: "Creating applications that interpret visual data using deep learning techniques and computer vision algorithms.",
    icon: Brain
  },
  {
    title: "Emotion-Aware Technology",
    description: "Building systems that understand and respond to human emotions through voice and visual cues.",
    icon: Heart
  }
];

const About = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          const scrollPosition = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
          const rotation = scrollPosition * 5;
          
          imageRef.current.style.transform = `perspective(1000px) rotateY(${rotation}deg)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 reveal">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                alt="Designer working at desk"
                className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300"
              />
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-80"></div>
              <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-80"></div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 reveal" style={{transitionDelay: '100ms'}}>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-0.5 w-10 bg-primary"></div>
              <span className="text-primary font-medium">About Me</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              I’m Midam, a tech enthusiast
            </h2>
            
            <p className="text-foreground/70 mb-6">
            I’m a machine learning and computer vision enthusiast with hands-on experience building real-time, intelligent systems. During my internship at Skylabs Solution, I developed high-accuracy image analysis tools that extract personal and health-related insights from user photos using a blend of custom and pre-trained ML models. I'm also actively involved in leadership roles, managing cross-functional design teams and curating tech-driven community events at IIITD.
            </p>
            
            <p className="text-foreground/70 mb-8">
              My interests span across designing intuitive user interfaces, building intelligent systems that understand emotions, and contributing to robotics that can solve real-world problems. As a Project Manager at IIITD’s Design Department, I am also focused on enhancing user experiences through the redesign of the department's website.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Award-Winning Projects</h3>
                <p className="text-foreground/70 text-sm">Recognized for innovative solutions in machine learning and robotics.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Lightbulb className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Passionate about Technology</h3>
                <p className="text-foreground/70 text-sm">Designing systems that adapt to human needs and contexts.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 reveal" style={{transitionDelay: '200ms'}}>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Specialized Skills</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-primary mb-4">
                  <skill.icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{skill.title}</h3>
                <p className="text-foreground/70 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
