"use client";
import React, {useRef,useState,useEffect} from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi"; // Link icon
import avishkarimage from "../../assets/images/avishkarimage.jpg";
import rckcimage from "../../assets/images/rckc.jpg";
import shpimage from "../../assets/images/shpimage.jpg";
import anubhavimage from "../../assets/images/anubhavimage.png";

const certifications = [
  {
    title: "UI in Android (META)",
    description: "Completed a course on building modern Android apps using Jetpack Compose and Kotlin, focusing on UI components, state management, and app navigation.",
    date: "January 2025",
    link: "https://coursera.org/share/67cb94f2fc420c58c9c3aa4b7d5b9b23",
  },
  {
    title: "UI/UX Design (META)",
    description: "Learned key UI/UX principles, including design thinking, wireframing, and prototyping. Gained hands-on experience with the Figma design tool.",
    date: "July 2024",
    link: "https://coursera.org/share/1b5279f1a2837d9180c84cd750a49692",
  },
  {
    title: "Kotlin Fundamentals (META)",
    description: "Studied Kotlin basics such as variables, functions, null safety, and OOP concepts, forming a solid foundation for Android development.",
    date: "June 2024",
    link: "https://coursera.org/share/65f296aace4807cb43ceed960c4d35fe",
  },
  {
    title: "React Basics (META)",
    description: "Covered ReactJS essentials like components, props, state, and hooks, enabling the creation of interactive and reusable UI elements.",
    date: "May 2024",
    link: "https://coursera.org/share/1c6e9b255607ab19f1a4fd986897cf31",
  },
  {
    title: "Web Development (Johns Hopkins University)",
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
    image: rckcimage,
  },
];

const FloatingAchievements = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const achievementsRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFadeIn(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (achievementsRef.current) observer.observe(achievementsRef.current);
    return () => {
      if (achievementsRef.current) observer.unobserve(achievementsRef.current);
    };
  }, []);
  
  return (
    <div
      ref={achievementsRef}
      id="achievements"
      className="w-full overflow-x-auto project-scrolling max-w-7xl mx-auto px-4 sm:px-6 py-3 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
      >
      <h2 className={`text-2xl text-center text-white font-semibold mb-2 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}>Achievements</h2>

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Certifications Box */}
        <div className="bg-gray-800 rounded-xl p-4 flex-1 flex flex-col">
          <h4 className={`text-center font-semibold text-white mb-2 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}>Certifications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow overflow-y-auto project-scrolling max-h-[50vh] sm:max-h-[90vh]">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gray-700 p-3 rounded-lg shadow-md text-white hover:bg-gray-600 transition-colors h-full flex flex-col justify-between ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}
              >
                <div>
                  <p className="text-sm font-semibold flex items-center justify-between">
                    {cert.title}
                    <FiExternalLink className="inline-block ml-1 text-sm" />
                  </p>
                  <p className="text-xs mt-1">{cert.description}</p>
                </div>
                <p className="text-xs mt-2 italic text-gray-300">{cert.date}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Extracurricular Box */}
        <div className="bg-gray-800 project-scrolling rounded-xl p-4 flex-1 flex flex-col overflow-y-auto max-h-[50vh] sm:max-h-[90vh]">
          <h4 className={`text-center font-semibold text-white mb-2 ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}>Extracurricular</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {extracurriculars.map((item, index) => (
              <div
                key={index}
                className={`bg-gray-700 p-3 rounded-lg shadow-md text-white h-full flex flex-col ${fadeIn ? 'opacity-100 transition-all duration-1000 transform scale-100' : 'opacity-0 transform scale-90 transition-all duration-1000'}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="rounded-md w-full h-36 object-cover mb-2"
                />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs mt-1">{item.description}</p>
                <p className="text-xs mt-1 italic text-gray-300 mt-auto">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAchievements;
