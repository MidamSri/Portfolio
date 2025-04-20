import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Mic, Headphones, Brush, GitHub } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  detailedDescription: string;
  techStack: string[];
  icon: React.ReactNode;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Flappy Bird Game",
    category: "Game Development",
    description: "A fun and addictive flappy bird game built with React and simple animations.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    detailedDescription: "",
    techStack: ["React", "CSS", "JavaScript"],
    icon: <Brush className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Voice Assistant",
    category: "AI/ML",
    description: "Real-time assistant using computer vision, speech recognition, and multithreading to help with daily tasks.",
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    detailedDescription: `Developed a real-time, intelligent voice assistant capable of interpreting and responding to diverse voice commands. Integrated computer vision to recognize objects and faces, enabling interaction based on real-world elements. Implemented multithreading to allow seamless multitasking, such as performing reminders while listening to commands. Included functional modules like setting reminders, running a stopwatch, and general-purpose assistance. Ensured adaptability by using modular design, allowing easy expansion of assistant capabilities.`,
    techStack: ["Python", "TensorFlow", "OpenCV", "Multithreading", "Speech Recognition"],
    icon: <Mic className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Emotion-Aware Speech Translation",
    category: "AI/ML",
    description: "Preserves emotional tone in real-time speech translation using GenAI and voice synthesis.",
    image: "https://unsplash.com/photos/yellow-and-white-round-plastic-toy-zYdYz7JlevE", // Updated image URL
    link: "#",
    detailedDescription: `Created a speech translation system that preserved the original speaker’s emotional tone and vocal nuances. Employed deep learning models for voice synthesis to maintain speaker identity across languages. Leveraged GenAI to enhance expressiveness and natural delivery in translated speech. Enabled real-time translation across multiple languages, improving accessibility for global users. Optimized system for low-latency processing, suitable for real-time communication apps.`,
    techStack: ["Python", "TensorFlow", "GenAI", "Speech Synthesis", "Deep Learning"],
    icon: <Headphones className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Real-Time Lip Reading",
    category: "AI/ML",
    description: "Lip-reading model for speech recognition in noisy environments using TensorFlow and CUDA.",
    image: "https://images.unsplash.com/photo-1581453226801-6d0b99e39de0?q=80&w=2070&auto=format&fit=crop", // Updated image URL
    link: "#",
    detailedDescription: `Building a system that interprets spoken words through visual lip movement analysis especially in noisy or muted environments. Leveraging deep learning and CUDA acceleration to enable near real-time inference from video input. Targeting use cases in accessibility for the hearing- and speech-impaired and surveillance in silent zones.`,
    techStack: ["Python", "TensorFlow", "CUDA", "Deep Learning", "Lip Reading"],
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    id: 5,
    title: "Smart Fashion Recommender & Virtual Try-On",
    category: "AR + AI",
    description: "Recommender system using weather + fashion APIs, machine learning, and AR-based virtual try-ons.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop",
    link: "#",
    detailedDescription: `Designed and developed a smart fashion assistant app that analyzes a user's wardrobe to generate outfit suggestions. Built a custom machine learning model that factors in real-time weather data and current fashion trends to suggest clothing combinations. Integrated Augmented Reality (AR) to enable users to virtually try on outfits, enhancing the pre-selection experience. Pulled live fashion data from online sources and curated trend-based suggestions to keep recommendations relevant. Focused on user personalization and daily utility, making the tool ideal for fashion-conscious users and practical wear planning.`,
    techStack: ["Python", "ARKit", "Machine Learning", "Fashion APIs", "Weather API"],
    icon: <Brush className="h-6 w-6 text-primary" />,
  }
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const categories = ['all', 'Game Development', 'AI/ML', 'AR + AI'];

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === activeCategory);

  useEffect(() => {
    setCurrentProject(null);
  }, [activeCategory]);

  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setIsGameActive(false);
    }, 400);
  };

  const handleLaunchGame = () => {
    setIsGameActive(true);
  };

  return (
    <section id="projects" className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A showcase of digital experiences designed with a focus on interaction, emotion, and cognition.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${activeCategory === category ? "bg-primary text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="tilt-card overflow-hidden rounded-2xl shadow-sm border border-gray-100 relative transform transition-transform duration-300 hover:scale-105"
            >
              <div className="tilt-card-inner transition-transform duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {project.icon}
                    <span className="text-sm font-medium text-primary">{project.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="text-xs text-gray-500 py-1 px-2 rounded-lg bg-gray-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleProjectClick(project)}
                    className="flex items-center gap-1.5 text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    View Project <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
