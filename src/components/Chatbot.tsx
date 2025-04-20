import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface Response {
  id: string;
  triggers: string[];
  response: string;
}

const botResponses: Response[] = [
  {
    id: 'greeting',
    triggers: ['hello', 'hi', 'hey', 'greeting'],
    response: "👋 Hey! I'm the portfolio assistant. I can tell you about Midam's projects, roles, or technical skills. What would you like to explore?"
  },
  {
    id: 'projects',
    triggers: ['projects', 'work', 'portfolio', 'assistant', 'speech', 'lip', 'fashion'],
    response: "Midam has worked on cutting-edge projects like a Real-Time Voice Assistant, Emotion-Aware Speech Translation, Lip Reading for Speech Recognition, and a Smart Fashion Recommender with Virtual Try-On. Want to dive into one of them?"
  },
  {
    id: 'skills',
    triggers: ['skills', 'abilities', 'tech stack', 'expertise', 'tools'],
    response: "Midam is skilled in Python, TensorFlow, machine learning, computer vision, multithreading, GenAI, AR, and API integration. He builds high-performance, real-time intelligent systems."
  },
  {
    id: 'process',
    triggers: ['process', 'methodology', 'approach', 'research'],
    response: "Midam’s process blends deep learning, real-time computing, and user-focused design. He emphasizes modularity, speed, and real-world application—especially in accessibility and interaction."
  },
  {
    id: 'contact',
    triggers: ['contact', 'hire', 'work', 'email', 'message'],
    response: "Want to get in touch with Midam? You can email him directly at srimidam@gmail.com. He’s currently open to exciting opportunities!"
  },
  {
    id: 'assistant',
    triggers: ['voice', 'assistant', 'real-time', 'multithreading'],
    response: "Midam built a real-time voice assistant using multithreading and computer vision. It recognizes objects and faces and performs tasks like reminders, stopwatches, and more with modular design."
  },
  {
    id: 'speech',
    triggers: ['emotion', 'speech', 'translation', 'genai'],
    response: "Midam’s Emotion-Aware Speech Translator maintains emotional tone and voice identity during multilingual translation. It uses GenAI to deliver expressive, real-time speech across languages."
  },
  {
    id: 'lip',
    triggers: ['lip', 'reading', 'silent', 'video'],
    response: "Midam’s Lip Reading System decodes speech from visual input using deep learning and CUDA acceleration—especially useful in noisy or silent zones for accessibility and surveillance."
  },
  {
    id: 'fashion',
    triggers: ['fashion', 'style', 'try-on', 'weather'],
    response: "Midam created a Smart Fashion Recommender that uses weather data, style trends, and wardrobe analysis to suggest outfits. With AR-based virtual try-on, it's both practical and stylish."
  },
  {
    id: 'roles',
    triggers: ['roles', 'responsibilities', 'positions', 'clubs', 'leadership'],
    response: "Midam is the Treasurer of SIGCHI IIITD, Project Manager at the Design Department, and a Project Developer at Cyfuse (Robotics Club). He balances design leadership with technical innovation."
  },
  {
    id: 'internship',
    triggers: ['intern', 'internship', 'skylabs'],
    response: "At Skylabs, Midam developed ML models and real-time image analysis software, achieving 95%+ accuracy in detecting age, gender, emotions, and skin conditions—boosting performance by 80%."
  },
  {
    id: 'fallback',
    triggers: [],
    response: "Hmm, I’m not sure I got that. You can ask about Midam's projects, skills, internships, or positions of responsibility. What would you like to know?"
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const speakText = (text: string) => {
    if (!isVoiceEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 2;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "👋 Hi there! I'm Midam's portfolio assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      speakText(welcomeMessage.text);
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const processedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(processedMessages);
      } catch (error) {
        console.error('Error parsing chat history:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const findResponse = (input: string): Response => {
    const lowercaseInput = input.toLowerCase();
    for (const response of botResponses) {
      if (response.triggers.some(trigger => lowercaseInput.includes(trigger))) {
        return response;
      }
    }
    return botResponses.find(response => response.id === 'fallback')!;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const audio = new Audio('/message-sent.mp3');
    audio.volume = 0.1;
    audio.play().catch(err => console.error('Audio failed to play:', err));

    setTimeout(() => {
      const response = findResponse(userMessage.text);
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      speakText(response.response);

      const botAudio = new Audio('/message-received.mp3');
      botAudio.volume = 0.1;
      botAudio.play().catch(err => console.error('Audio failed to play:', err));
    }, 1000 + Math.random() * 1000);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleClearChat = () => {
    const welcomeMessage: Message = {
      id: 'welcome',
      text: "👋 Hi there! I'm Midam's portfolio assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    localStorage.removeItem('chatHistory');
    speakText(welcomeMessage.text);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all duration-300",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 transform",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
        style={{ maxHeight: '500px' }}
      >
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <h3 className="font-medium">Portfolio Assistant</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsVoiceEnabled(prev => !prev)}
              className="text-white/80 hover:text-white"
              aria-label="Toggle Voice"
            >
              {isVoiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
            <button
              onClick={handleClearChat}
              className="text-white/80 hover:text-white"
              aria-label="Clear chat"
            >
              <span className="text-xs">Clear</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 h-80 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl p-3 animate-fade-in",
                    message.sender === 'user'
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-gray-100 text-foreground rounded-tl-none"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-60 text-right">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-foreground rounded-xl rounded-tl-none p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about projects, skills..."
              className="flex-1 px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            />
            <button
              type="submit"
              className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              aria-label="Send message"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
