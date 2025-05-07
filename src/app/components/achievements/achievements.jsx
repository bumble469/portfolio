"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const certifications = [
  {
    title: "UI in Android (META)",
    description: "Jetpack Compose and Kotlin were taught.",
    date: "January 2025",
  },
  {
    title: "UI/UX Design (META)",
    description: "Design principles and Figma platform explored.",
    date: "July 2024",
  },
  {
    title: "Kotlin Fundamentals (META)",
    description: "Basic fundamentals of Kotlin covered.",
    date: "June 2024",
  },
  {
    title: "React Basics (META)",
    description: "States, components, and props in ReactJS.",
    date: "May 2024",
  },
  {
    title: "Web Development (Johns Hopkins University)",
    description: "HTML, CSS, JS, and dynamic websites.",
    date: "December 2023",
  },
];

const extracurriculars = [
  {
    title: "Science Honors Program (SHP)",
    description: "Learning research ethics, report writing, and methodologies.",
    date: "Ongoing",
    image: "/achievements/ai-finalist.jpg",
  },
  {
    title: "Anubhav Research Convention",
    description: "Presented research ‘Bridging the Gap’.",
    date: "February 2025",
    image: "/achievements/ai-finalist.jpg",
  },
  {
    title: "Avishkar Research Convention",
    description: "Presented research ‘Bridging the Gap’.",
    date: "December 2024",
    image: "/achievements/ai-finalist.jpg",
  },
  {
    title: "Rotaract Club of KC",
    description: "General Body Member; participated in meetings and events.",
    date: "August 2022",
    image: "/achievements/ai-finalist.jpg",
  },
];

const FloatingAchievements = () => {
  return (
    <motion.div
      id="projects"
      className="absolute bg-gray-900/40 backdrop-blur-md border-2 border-gray-800/50 px-6 py-6 rounded-xl shadow-lg z-50 top-735 md:top-455 right-5 left-5"
    >
      <h2 className="text-2xl text-center text-white font-semibold mb-2">Achievements</h2>

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        {/* Certifications Box */}
        <div className="bg-gray-800 rounded-xl p-4 flex-1">
          <h4 className="text-center font-semibold text-white mb-2">Certifications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg shadow-md text-white">
                <p className="text-sm font-semibold">{cert.title}</p>
                <p className="text-xs mt-1">{cert.description}</p>
                <p className="text-xs mt-1 italic text-gray-300">{cert.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extracurricular Box */}
        <div className="bg-gray-800 rounded-xl p-4 flex-1">
          <h4 className="text-center font-semibold text-white mb-2">Extracurricular</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {extracurriculars.map((item, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded-lg shadow-md text-white">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="rounded-md w-full h-36 object-cover mb-2"
                />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs mt-1">{item.description}</p>
                <p className="text-xs mt-1 italic text-gray-300">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingAchievements;
