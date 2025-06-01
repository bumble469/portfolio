"use client";
import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../../components/footer/footer.jsx";

const experienceData = [
  {
    Position: "Full-Stack Developer",
    Institution: "Unified Mentor Pvt Ltd",
    Duration: "April 2025 - May 2025 (2 months)",
    Type: "Internship | Remote",
    Link: "https://www.unifiedmentor.com/verify-certificate/UMID19032524084",
    Certificate: "/internship/UMIntern.pdf",
    Description:
      "Worked on three Full-stack projects, where I tackled real-world challenges, integrated smart solutions, and delivered results under tight deadlines. " +
      "Followed a structured learning program with daily tasks, took on 1 basic and 2 advanced full-stack projects, gaining hands-on experience in frontend and backend development, " +
      "and submitting a final project with documentation as part of the internship deliverable.",
    Skills: ["WebSocket", "NextJS", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "FastAPI"],
  },
];

const FloatingExperience = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const experienceRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFadeIn(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (experienceRef.current) observer.observe(experienceRef.current);
    return () => {
      if (experienceRef.current) observer.unobserve(experienceRef.current);
    };
  }, []);

  const getGridClasses = () => {
    if (experienceData.length === 1) return "grid-cols-1";
    if (experienceData.length === 2) return "sm:grid-cols-2";
    return "sm:grid-cols-2 lg:grid-cols-3";
  };

  const openModal = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPdf(null);
  };

  return (
    <>
      <motion.div
        id="experience"
        ref={experienceRef}
        initial={{ opacity: 0, y: 50 }}
        animate={fadeIn ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full mt-44 sm:mt-48 md:mt-52 lg:mt-32 max-w-7xl mx-auto px-4 sm:px-6 py-4 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col items-center"
      >
        <h2 className="text-2xl text-center text-white font-semibold">
          Experience
        </h2>

        <div className={`w-full mt-8 grid gap-6 ${getGridClasses()} items-start`}>
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`bg-gray-800/60 p-5 rounded-xl shadow-md text-white flex flex-col justify-between ${
                experienceData.length === 1 ? "col-span-full" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{exp.Position}</h3>
                  <p className="text-sm text-gray-300">{exp.Institution}</p>
                </div>
                <div className="flex gap-4 ml-4">
                  <a
                    href={exp.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm flex items-center gap-1"
                  >
                    <ExternalLink size={16} /> Verify
                  </a>
                  <button
                    onClick={() => openModal(exp.Certificate)}
                    className="cursor-pointer text-green-400 hover:underline text-sm flex items-center gap-1"
                  >
                    <FileText size={16} /> Certificate PDF
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-2">
                <strong>Duration:</strong> {exp.Duration}
              </p>
              <p className="text-sm text-gray-400 mb-2">
                <strong>Type:</strong> {exp.Type}
              </p>

              <p className="text-sm mb-3 text-justify">{exp.Description}</p>

              {exp.Skills && exp.Skills.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-300 font-medium mb-1">Skills Learnt:</p>
                  <div className="flex flex-wrap gap-2" aria-label="Skills learnt in the experience">
                    {exp.Skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-blue-600/60 text-sm rounded-full text-white border border-blue-400 shadow-sm hover:scale-105 transition-transform"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
            <>
            {/* Disable background scroll when modal is open */}
            <style>{`body { overflow: hidden; }`}</style>

            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
            >
                <motion.div
                className="bg-gray-900 rounded-lg shadow-lg max-w-4xl w-full max-h-[85vh] p-4 relative pointer-events-auto overflow-hidden my-16"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                >
                <button
                    onClick={closeModal}
                    className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-white focus:outline-none"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>
                <h3 className="text-white text-lg mb-4">Certificate Preview</h3>
                <iframe
                    src={selectedPdf}
                    title="Certificate PDF Preview"
                    width="100%"
                    height="600"
                    className="rounded-md border border-gray-600"
                />
                </motion.div>
            </motion.div>
            </>
        )}
        </AnimatePresence>
      <Footer />
    </>
  );
};

export default FloatingExperience;
