"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProjectDetailContent from "./project_detail_content";

const ProjectModal = ({
  name,
  image,
  videoUrl,
  features,
  techstack,
  goals,
  link,
  date,
  milestone,
  isOpen,
  onClose,
  startWithVideo = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative my-auto w-full max-w-5xl max-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl border border-cyan-500/30 bg-gray-900/95 shadow-2xl shadow-cyan-500/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="cursor-pointer absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-900/70 border border-gray-700/70 text-gray-300 hover:text-white hover:border-cyan-400/60 transition-all duration-300 z-10"
            >
              <X size={16} />
            </button>

            <div className="overflow-y-auto project-scrolling p-6 sm:p-8">
              <ProjectDetailContent
                key={`${name}-${startWithVideo}`}
                project={{ name, image, videoUrl, features, techStack: techstack, goal: goals, link, date, milestone }}
                variant="dialog"
                startWithVideo={startWithVideo}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;