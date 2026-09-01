"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FloatingAchievements = () => {
  const achievementsRef = useRef(null);
  const isInView = useInView(achievementsRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={achievementsRef}
      id="achievements"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full sm:mt-8 md:mt-12 overflow-x-auto project-scrolling max-w-7xl mx-auto px-4 sm:px-6 py-4 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
    >
      <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl mt-4 mb-6 text-center text-white font-bold tracking-tight flex items-center justify-center gap-2">
        <FaTrophy className="text-cyan-400" size={24} />
        Achievements
      </motion.h2>

      {/* MAH MCA CET Card */}
      <motion.div
        variants={itemVariants}
        className="w-full mb-4 relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gray-800/40 backdrop-blur-md p-6 sm:p-8 shadow-lg group hover:shadow-cyan-500/10 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/5 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 sm:gap-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <FaTrophy className="text-cyan-400 text-3xl" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">MAH MCA CET 2026</h3>
            <p className="text-gray-300 text-sm md:text-base mt-1.5 leading-relaxed">Secured a position in the top percentile among all state candidates, demonstrating strong analytical and technical aptitude.</p>
          </div>

          <div className="flex gap-4 sm:gap-8 flex-wrap justify-center mt-4 sm:mt-0">
            <div className="text-center px-2">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-3xl font-extrabold tracking-tight">99.79</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider font-semibold">Percentile</p>
            </div>
            <div className="text-center px-4 border-x border-gray-700/60">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-3xl font-extrabold tracking-tight">94</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider font-semibold">All India Rank</p>
            </div>
            <div className="text-center px-2">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-3xl font-extrabold tracking-tight">72</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider font-semibold">State Rank</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 mt-2 w-full">
        {/* Certifications */}
        <motion.div variants={itemVariants} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 flex-1 flex flex-col shadow-md">
          <h4 className="text-center font-bold text-white mb-5 text-xl tracking-tight flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50"></span>
            Certifications
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50"></span>
          </h4>
          <div className="grid grid-cols-1 gap-4 flex-grow overflow-y-auto project-scrolling pr-2 max-h-[50vh] sm:max-h-[60vh]">
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gray-800/60 p-4 rounded-xl shadow-sm text-white hover:bg-gray-800/80 hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-700/50 hover:border-cyan-500/50 hover:shadow-[0_8px_20px_rgba(6,182,212,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                <div>
                  <h5 className="text-base font-bold text-gray-100 flex items-start justify-between gap-3 leading-snug">
                    <span className="group-hover:text-cyan-400 transition-colors duration-300">{cert.title}</span>
                    <FiExternalLink className="mt-1 shrink-0 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </h5>
                  <p className="text-sm mt-2 text-justify text-gray-400 leading-relaxed">{cert.description}</p>
                </div>
                <p className="text-xs mt-4 font-medium text-cyan-500">{cert.date}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Extracurricular */}
        <motion.div variants={itemVariants} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 flex-1 flex flex-col shadow-md">
          <h4 className="text-center font-bold text-white mb-5 text-xl tracking-tight flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50"></span>
            Extracurricular
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50"></span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow overflow-y-auto project-scrolling pr-2 max-h-[50vh] sm:max-h-[60vh]">
            {extracurriculars.map((item, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/60 p-4 rounded-xl shadow-sm text-white flex flex-col border border-gray-700/50 hover:border-cyan-500/50 hover:-translate-y-1 hover:bg-gray-800/80 hover:shadow-[0_8px_20px_rgba(6,182,212,0.1)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                {item.image ? (
                  <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden border border-gray-700/50 group-hover:border-cyan-500/30 transition-colors duration-300">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 mb-3 rounded-lg bg-gray-700/50 border border-gray-600/50 flex items-center justify-center text-4xl font-bold text-gray-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors duration-300">
                    {item.title.charAt(0)}
                  </div>
                )}
                <h5 className="text-sm font-bold text-gray-100 leading-snug group-hover:text-cyan-400 transition-colors duration-300">{item.title}</h5>
                <p className="text-xs mt-1.5 text-gray-400 leading-relaxed">{item.description}</p>
                <p className="text-[11px] mt-3 font-medium text-cyan-500 mt-auto">{item.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingAchievements;
