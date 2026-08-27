"use client";
import React, { useState, useEffect, useRef } from "react";
import drawing1 from '../../assets/images/drawing1.jpg';
import drawing2 from '../../assets/images/drawing2.jpg';
import drawing3 from '../../assets/images/drawing3.jpg';
import { Cpu, Code, Layers, Users, GraduationCap, Sparkles, UserRound } from 'lucide-react';
import Image from "next/image";

const FloatingAbout = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [topCard, setTopCard] = useState(2);

  const images = [drawing1, drawing2, drawing3];

  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFadeIn(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  return (
    <>
    <div
      id="about"
      ref={aboutRef}
      className="w-full sm:mt-8 md:mt-12 max-w-7xl mx-auto px-4 sm:px-6 py-4 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
    >
      <h2 ref={aboutRef} className={`text-2xl sm:text-3xl mt-4 mb-6 text-center text-white font-bold tracking-tight flex items-center justify-center gap-2 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'} transition-all duration-500`}>
        <UserRound className="text-cyan-400" size={24} />
        About <span className="text-cyan-400">Me</span>
      </h2>
      <p className={`text-gray-200 text-left text-justify text-sm md:text-base leading-relaxed max-w-4xl ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'} transition-all duration-500`}>
        Passionate full-stack developer with a strong ability to create dynamic, responsive web applications. Currently pursuing my MCA at Sardar Patel Institute of Technology, building on a Bachelor’s in Computer Science from Kishinchand Chellaram College (GPA: 10.0). Successfully led my team to complete our final-year project, utilizing React, Node.js, Express, and Flask for seamless front-to-back integration. Enthusiastic about developing smart solutions by blending design with functionality.
      </p>

      <div className="flex flex-col md:flex-row w-full gap-6 mt-6">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <h3 className={`text-xl text-white font-bold flex items-center gap-2 border-b border-cyan-500/30 pb-2 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'} transition-all duration-500`}>
            <GraduationCap className="text-cyan-400" size={22} /> Education
          </h3>
          <div className="space-y-4">
            <div className={`bg-gradient-to-r from-cyan-900/30 to-gray-800 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out flex space-x-4 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 border border-cyan-500/20 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'}`}>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-white font-semibold">MCA (Master of Computer Applications)</h4>
                  <span className="text-[10px] uppercase tracking-wide bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded-full">Current</span>
                </div>
                <p className="text-gray-400 text-sm">Sardar Patel Institute of Technology</p>
                <p className="text-gray-500 text-xs">Pursuing</p>
              </div>
            </div>

            <div className={`bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out flex space-x-4 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'}`}>
              <div className="flex flex-col">
                <h4 className="text-white font-semibold">Bachelor of Computer Science</h4>
                <p className="text-gray-400 text-sm">Kishinchand Chellaram College</p>
                <p className="text-gray-500 text-xs">2025 Graduate</p>
              </div>
              <p className="text-white text-sm ml-auto whitespace-nowrap">CGPA: 10.0</p>
            </div>

            <div className={`bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out flex space-x-4 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'}`}>
              <div className="flex flex-col">
                <h4 className="text-white font-semibold">HSC</h4>
                <p className="text-gray-400 text-sm">St. Xavier's College</p>
                <p className="text-gray-500 text-xs">2022 completed</p>
              </div>
              <p className="text-white text-sm ml-auto whitespace-nowrap">Percentage: 79.5</p>
            </div>

            <div className={`bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out flex space-x-4 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'}`}>
              <div className="flex flex-col">
                <h4 className="text-white font-semibold">CICSE</h4>
                <p className="text-gray-400 text-sm">Christ Church School</p>
                <p className="text-gray-500 text-xs">2020 completed</p>
              </div>
              <p className="text-white text-sm ml-auto whitespace-nowrap">Percentage: 94.6</p>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 space-y-6 mt-2 md:mt-0">
          <h3 className={`text-xl text-white font-bold flex items-center gap-2 border-b border-cyan-500/30 pb-2 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'} transition-all duration-500`}>
            <Sparkles className="text-cyan-400" size={20} /> Interests
          </h3>

          <div className={`bg-gray-800/80 border border-gray-700/50 rounded-lg p-4 shadow-lg transition duration-500 hover:border-cyan-500/30 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'}`}>
            <h4 className={`text-white text-lg font-semibold flex items-center gap-2`}>
              🎨 Sketch work
            </h4>
            <p className={`text-gray-300 text-sm mt-1 text-justify`}>
              I've always had a passion for bringing ideas to life, which started from my early love for sketching and digital art. These creative expressions laid the foundation for my journey into tech, where I combine artistic design with functional solutions.
            </p>

            <div className={`relative mt-4 h-44 w-full flex justify-center items-start ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'}`}>
              {images.map((img, i) => {
                const rotation = [-8, 0, 8][i]; 
                const translateX = (i - 1) * 60; 

                return (
                  <div
                    key={i}
                    onMouseEnter={() => setTopCard(i)}
                    className={`absolute w-40 h-40 rounded-lg overflow-hidden shadow-md transition-transform duration-300 cursor-pointer ${topCard === i ? "z-30 scale-105" : "z-10"}`}
                    style={{
                      transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Drawing ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 160px"
                      className="object-cover scale-75 sm:scale-100"
                    />

                  </div>
                );
              })}
            </div>
          </div>

          <div className={`md:w-full space-y-2 ${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'} transition-all duration-500`}>
            <div className="flex flex-row gap-2 overflow-hidden">
              <div className="scrolling-train flex gap-2">
                {[
                  { name: 'AI Integrated Solutions', icon: <Cpu className="text-xl" /> },
                  { name: 'Backend-Frontend Integration', icon: <Code className="text-xl" /> },
                  { name: 'Conceptual Designs', icon: <Layers className="text-xl" /> },
                  { name: 'Effective Collaboration', icon: <Users className="text-xl" /> },
                ].map((interest, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 text-white text-sm bg-gray-800 px-6 py-3 rounded-full shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {interest.icon} {interest.name}
                  </div>
                ))}

                {[
                  { name: 'AI Integrated Solutions', icon: <Cpu className="text-xl" /> },
                  { name: 'Backend-Frontend Integration', icon: <Code className="text-xl" /> },
                  { name: 'Conceptual Designs', icon: <Layers className="text-xl" /> },
                  { name: 'Effective Collaboration', icon: <Users className="text-xl" /> },
                ].map((interest, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className={`flex items-center gap-3 text-white text-sm bg-gray-800 px-6 py-3 rounded-full shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {interest.icon} {interest.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FloatingAbout;
