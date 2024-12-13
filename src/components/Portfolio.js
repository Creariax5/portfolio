"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Github, ExternalLink, Code, Coffee, Sparkles, Cloud, Gamepad } from 'lucide-react';

const Portfolio = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const projects = [
    {
      title: "Interactive Data Viz",
      description: "Play with data in real-time",
      icon: <Sparkles className="w-8 h-8" />,
      color: "bg-orange-100",
      hoverColor: "bg-orange-200",
      textColor: "text-orange-800",
      link: "/dataviz"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather tracking with detailed forecasts",
      icon: <Cloud className="w-8 h-8" />,
      color: "bg-purple-100",
      hoverColor: "bg-purple-200",
      textColor: "text-purple-800",
      link: "/weather"
    },
    {
      title: "Pokédex App",
      description: "Interactive Pokémon database with detailed stats and info",
      icon: <Gamepad className="w-8 h-8" />,
      color: "bg-red-100",
      hoverColor: "bg-red-200",
      textColor: "text-red-800",
      link: "/pokedex"
    },
    {
      title: "AI Playground",
      description: "Experiment with machine learning",
      icon: <Coffee className="w-8 h-8" />,
      color: "bg-blue-100",
      hoverColor: "bg-blue-200",
      textColor: "text-blue-800",
      link: "/ai"
    },
    {
      title: "Code Games",
      description: "Learn coding through play",
      icon: <Code className="w-8 h-8" />,
      color: "bg-green-100",
      hoverColor: "bg-green-200",
      textColor: "text-green-800",
      link: "/games"
    }
  ];

  const handleProjectClick = (link) => {
    router.push(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-bold mb-4 font-sans">FLO.DEV</h1>
        <p className="text-xl text-gray-600 font-mono">let&apos;s build something fun</p>
      </div>

      {/* Project Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`
              rounded-xl p-6 cursor-pointer transform transition-all duration-300
              ${project.color}
              ${hoveredCard === index ? `${project.hoverColor} scale-105` : ''}
              font-sans
            `}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleProjectClick(project.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleProjectClick(project.link);
              }
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${project.textColor}`}>
                {project.icon}
              </div>
              <ExternalLink className={`w-5 h-5 ${project.textColor}`} />
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${project.textColor}`}>
              {project.title}
            </h3>
            <p className={`${project.textColor}`}>
              {project.description}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Stats Section */}
      <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600 animate-pulse font-mono">
              42k
            </div>
            <div className="text-gray-600">Lines of Code</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-600 animate-pulse font-mono">
              128
            </div>
            <div className="text-gray-600">Github Commits</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-600 animate-pulse font-mono">
              15
            </div>
            <div className="text-gray-600">Projects Launched</div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {['JavaScript', 'React', 'Node.js', 'Python'].map((skill, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl text-center transform transition-all duration-300 hover:scale-105 cursor-pointer font-mono"
          >
            <div className="text-lg font-semibold text-gray-800">{skill}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <Link
          href="https://github.com/Creariax5"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-mono"
        >
          <Github className="w-6 h-6" />
          <span>Check out my code</span>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
