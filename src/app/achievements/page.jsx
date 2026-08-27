"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import avishkarimage from "../../assets/images/avishkarimage.jpg";
import shpimage from "../../assets/images/shpimage.jpg";
import anubhavimage from "../../assets/images/anubhavimage.png";

const certifications = [
  {
    title: "UI/UX Design (META)",
    description: "Learned key UI/UX principles, including design thinking, wireframing, and prototyping. Gained hands-on experience with the Figma design tool.",
    date: "July 2024",
    link: "https://coursera.org/share/1b5279f1a2837d9180c84cd750a49692",
  },
  {
    title: "React Basics (META)",
    description: "Covered ReactJS essentials like components, props, state, and hooks, enabling the creation of interactive and reusable UI elements.",
    date: "May 2024",
    link: "https://coursera.org/share/1c6e9b255607ab19f1a4fd986897cf31",
  },
  {
    title: "HTML, CSS and JavaScript for Web Developers (Johns Hopkins University)",
    description: "Built responsive web pages using HTML, CSS, and JavaScript, and implemented dynamic features with DOM manipulation and Bootstrap.",
    date: "December 2023",
    link: "https://coursera.org/share/7d98053fe32cf06a8845b0b9f6a0f4c5",
  },
];

const extracurriculars = [
  {
    title: "Science Honors Program (SHP)",
    description: "Learning research ethics, report writing, and methodologies.",
    date: "Ongoing",
    image: shpimage,
  },
  {
    title: "Anubhav Research Convention",
    description: "Presented research ‘Bridging the Gap’.",
    date: "February 2025",
    image: anubhavimage,
  },
  {
    title: "Avishkar Research Convention",
    description: "Presented research ‘Bridging the Gap’.",
    date: "December 2024",
    image: avishkarimage,
  },
  {
    title: "Rotaract Club of KC",
    description: "General Body Member; participated in meetings and events.",
    date: "August 2022",
  },
];

const FloatingAchievements = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const achievementsRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeIn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (achievementsRef.current) observer.observe(achievementsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={achievementsRef}
        id="achievements"
        className="w-full sm:mt-8 md:mt-12 overflow-x-auto project-scrolling max-w-7xl mx-auto px-4 sm:px-6 py-3 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
      >
        <h2 className={`text-2xl sm:text-3xl mt-4 mb-6 text-center text-white font-bold tracking-tight flex items-center justify-center gap-2 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}>
          <FaTrophy className="text-cyan-400" size={22} />
          Achievements
        </h2>

        <div
          className={`w-full mb-2 relative overflow-hidden rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-900/40 via-gray-800/60 to-blue-900/40 p-5 sm:p-6 shadow-lg transition-all duration-1000 ${
            fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/40 shrink-0">
              <FaTrophy className="text-cyan-300 text-2xl" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-semibold text-lg">MAH MCA CET 2026</p>
              <p className="text-gray-300 text-sm mt-1">Scored in the top percentile among all state candidates</p>
            </div>
            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
              <div className="text-center px-3">
                <p className="text-cyan-300 text-xl font-bold">99.79</p>
                <p className="text-gray-400 text-xs mt-0.5">Percentile</p>
              </div>
              <div className="text-center px-3 border-x border-gray-600/50">
                <p className="text-cyan-300 text-xl font-bold">94</p>
                <p className="text-gray-400 text-xs mt-0.5">All India Rank</p>
              </div>
              <div className="text-center px-3">
                <p className="text-cyan-300 text-xl font-bold">72</p>
                <p className="text-gray-400 text-xs mt-0.5">State Rank</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4 w-full">
          <div className="bg-gray-800/70 border border-gray-700/50 rounded-xl p-4 flex-1 flex flex-col shadow-md">
            <h4 className={`text-center font-semibold text-white mb-3 text-lg border-b border-gray-700 pb-2 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}>Certifications</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow overflow-y-auto project-scrolling max-h-[50vh] sm:max-h-[90vh]">
              {certifications.map((cert, index) => (
                <a
                  key={index}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-gray-700/80 p-3 rounded-lg shadow-md text-white hover:bg-gray-600 hover:shadow-cyan-500/10 hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col justify-between border border-transparent hover:border-cyan-500/30 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}
                >
                  <div>
                    <p className="text-sm font-semibold flex items-center justify-between gap-2">
                      <span>{cert.title}</span>
                      <FiExternalLink className="inline-block text-sm text-cyan-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </p>
                    <p className="text-xs mt-1 text-justify text-gray-300">{cert.description}</p>
                  </div>
                  <p className="text-xs mt-2 italic text-cyan-300/80">{cert.date}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/70 border border-gray-700/50 project-scrolling rounded-xl p-4 flex-1 flex flex-col overflow-y-auto max-h-[50vh] sm:max-h-[90vh] shadow-md">
            <h4 className={`text-center font-semibold text-white mb-3 text-lg border-b border-gray-700 pb-2 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}>Extracurricular</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
              {extracurriculars.map((item, index) => (
                <div
                  key={index}
                  className={`bg-gray-700/80 p-3 rounded-lg shadow-md text-white h-full flex flex-col border border-transparent hover:border-cyan-500/30 hover:-translate-y-0.5 hover:shadow-cyan-500/10 transition-all duration-300 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="rounded-md w-full h-36 object-cover mb-2"
                    />
                  ) : (
                    <div className="w-full h-36 mb-2 rounded-md bg-gray-600 flex items-center justify-center text-4xl font-bold text-gray-300">
                      {item.title.charAt(0)}
                    </div>
                  )}
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs mt-1 text-gray-300">{item.description}</p>
                  <p className="text-xs mt-1 italic text-cyan-300/80 mt-auto">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingAchievements;
