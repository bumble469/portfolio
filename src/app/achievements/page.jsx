"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { Info, GraduationCap, Users } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import avishkarimage from "../../assets/images/avishkarimage.jpg";
import shpimage from "../../assets/images/shpimage.jpg";
import anubhavimage from "../../assets/images/anubhavimage.png";
import KnowMoreDialog from "./components/knowmore_dialog";

const certifications = [
  {
    title: "UI/UX Design (META)",
    description: "Learned key UI/UX principles, including design thinking, wireframing, and prototyping. Gained hands-on experience with the Figma design tool.",
    date: "July 2024",
    link: "https://coursera.org/share/1b5279f1a2837d9180c84cd750a49692",
    details: [
      "Applied design thinking to move from user research to problem framing.",
      "Built low-fidelity wireframes before moving into high-fidelity mockups.",
      "Created interactive prototypes and component libraries in Figma.",
      "Practiced usability heuristics and iterating designs from feedback.",
    ],
  },
  {
    title: "React Basics (META)",
    description: "Covered ReactJS essentials like components, props, state, and hooks, enabling the creation of interactive and reusable UI elements.",
    date: "May 2024",
    link: "https://coursera.org/share/1c6e9b255607ab19f1a4fd986897cf31",
    details: [
      "Built reusable functional components with props-driven composition.",
      "Managed local component state and side effects with hooks like useState/useEffect.",
      "Practiced conditional rendering and list rendering patterns.",
      "Structured small interactive UIs the way production React apps are organized.",
    ],
  },
  {
    title: "HTML, CSS and JavaScript for Web Developers (Johns Hopkins University)",
    description: "Built responsive web pages using HTML, CSS, and JavaScript, and implemented dynamic features with DOM manipulation and Bootstrap.",
    date: "December 2023",
    link: "https://coursera.org/share/7d98053fe32cf06a8845b0b9f6a0f4c5",
    details: [
      "Structured semantic HTML and responsive layouts with CSS and Bootstrap.",
      "Manipulated the DOM directly with vanilla JavaScript.",
      "Handled browser events to build interactive page behavior.",
      "Learned responsive design fundamentals for different screen sizes.",
    ],
  },
];

const extracurriculars = [
  {
    title: "Science Honors Program (SHP)",
    description: "Learning research ethics, report writing, and methodologies.",
    date: "2023 - 2025",
    image: shpimage,
    details: [
      "Studied research ethics and responsible conduct of research.",
      "Practiced structured academic report writing.",
      "Learned research methodologies used across scientific disciplines.",
      "Collaborated with peers across a multi-year cohort program.",
    ],
  },
  {
    title: "Anubhav Research Convention",
    description: "Presented research 'Bridging the Gap'.",
    date: "February 2025",
    image: anubhavimage,
    details: [
      "Presented original research titled 'Bridging the Gap' to a panel of judges.",
      "Practiced distilling technical work into a concise public presentation.",
      "Answered live Q&A on the research methodology and findings.",
    ],
  },
  {
    title: "Avishkar Research Convention",
    description: "Presented research 'Bridging the Gap'.",
    date: "December 2024",
    image: avishkarimage,
    details: [
      "Presented the same research at a state-level research convention.",
      "Refined the presentation and poster based on prior convention feedback.",
      "Engaged with fellow researchers presenting across disciplines.",
    ],
  },
  {
    title: "Rotaract Club of KC",
    description: "General Body Member; participated in meetings and events.",
    date: "August 2022",
    details: [
      "Participated as a General Body Member in regular club meetings.",
      "Volunteered in community service and college events organized by the club.",
      "Built collaboration and organizing experience outside the classroom.",
    ],
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
  const [mobileTab, setMobileTab] = useState("certifications");
  const [dialogData, setDialogData] = useState(null);

  const openDialog = (data) => setDialogData(data);
  const closeDialog = () => setDialogData(null);

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
        className="w-full mb-4 relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gray-800/40 backdrop-blur-md p-4 sm:p-8 shadow-lg group hover:shadow-cyan-500/10 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/5 pointer-events-none z-0" />

        {/* Mobile: compact single row */}
        <div className="relative z-10 flex sm:hidden items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            <FaTrophy className="text-cyan-400 text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm leading-tight truncate">MAH MCA CET 2026</h3>
            <p className="text-gray-400 text-[11px] mt-0.5">Top percentile among state candidates</p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="text-center">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-sm font-extrabold leading-none">99.79</p>
              <p className="text-gray-500 text-[8px] mt-0.5 uppercase tracking-wide">%ile</p>
            </div>
            <div className="text-center border-l border-gray-700/60 pl-2.5">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 text-sm font-extrabold leading-none">72</p>
              <p className="text-gray-500 text-[8px] mt-0.5 uppercase tracking-wide">State</p>
            </div>
          </div>
        </div>

        {/* Desktop / tablet: full layout */}
        <div className="relative z-10 hidden sm:flex sm:items-start md:items-center gap-6 sm:gap-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <FaTrophy className="text-cyan-400 text-3xl" />
          </div>

          <div className="flex-1 text-left">
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

      {/* Mobile tab switcher */}
      <motion.div variants={itemVariants} className="flex md:hidden items-center gap-2 mb-5 bg-gray-800/60 border border-gray-700/50 rounded-full p-1 w-fit mx-auto">
        {[
          { id: "certifications", label: "Certifications", icon: <GraduationCap size={16} /> },
          { id: "extracurricular", label: "Extracurricular", icon: <Users size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              mobileTab === tab.id ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {mobileTab === tab.id && (
              <motion.span
                layoutId="achievements-tab-pill"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -z-10"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 mt-2 w-full">
        {/* Certifications */}
        <motion.div
          variants={itemVariants}
          className={`${mobileTab === "certifications" ? "flex" : "hidden"} md:flex bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 flex-1 flex-col shadow-md`}
        >
          <h4 className="text-center font-bold text-white mb-5 text-xl tracking-tight items-center justify-center gap-3 hidden md:flex">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50"></span>
            Certifications
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50"></span>
          </h4>
          <div className="grid grid-cols-1 gap-4 flex-grow overflow-y-auto project-scrolling pr-2 max-h-[55vh] sm:max-h-[60vh]">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group relative bg-gray-800/60 p-4 rounded-xl shadow-sm text-white hover:bg-gray-800/80 hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-700/50 hover:border-cyan-500/50 hover:shadow-[0_8px_20px_rgba(6,182,212,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                <div className="relative">
                  <h5 className="text-base font-bold text-gray-100 leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                    {cert.title}
                  </h5>
                  <p className="text-sm mt-2 text-justify text-gray-400 leading-relaxed line-clamp-3">{cert.description}</p>
                </div>

                <div className="relative flex items-center justify-between mt-4">
                  <p className="text-xs font-medium text-cyan-500">{cert.date}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openDialog({ ...cert })}
                      className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-cyan-300 border border-cyan-500/30 rounded-full px-3 py-1 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300"
                    >
                      <Info size={13} />
                      Know more
                    </button>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open credential"
                      className="text-gray-500 hover:text-cyan-400 hover:translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Extracurricular */}
        <motion.div
          variants={itemVariants}
          className={`${mobileTab === "extracurricular" ? "flex" : "hidden"} md:flex bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 flex-1 flex-col shadow-md`}
        >
          <h4 className="text-center font-bold text-white mb-5 text-xl tracking-tight items-center justify-center gap-3 hidden md:flex">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50"></span>
            Extracurricular
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50"></span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow overflow-y-auto project-scrolling pr-2 max-h-[55vh] sm:max-h-[60vh]">
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
                <p className="text-xs mt-1.5 text-gray-400 leading-relaxed line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between mt-auto pt-3">
                  <p className="text-[11px] font-medium text-cyan-500">{item.date}</p>
                  <button
                    onClick={() => openDialog({ ...item })}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300 border border-cyan-500/30 rounded-full px-2.5 py-1 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all duration-300"
                  >
                    <Info size={12} />
                    Know more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <KnowMoreDialog isOpen={!!dialogData} onClose={closeDialog} data={dialogData} />
    </motion.div>
  );
};

export default FloatingAchievements;
