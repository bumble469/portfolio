import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import {
  HiOutlineSparkles,
  HiOutlineVideoCamera,
  HiOutlineMoon,
  HiOutlineArrowPath,
  HiOutlineTrash,
} from "react-icons/hi2";
import qaApi from "../../../lib/qaApi";
import { TypeAnimation } from 'react-type-animation';

const ProjectModal = ({
  name,
  image,
  videoUrl,
  features,
  techstack,
  goals,
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [assistantAwake, setAssistantAwake] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantExplanation, setAssistantExplanation] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setCheckingHealth(true);
    setAssistantAwake(false);

    qaApi
      .get("/health", { timeout: 25000 })
      .then((res) => {
        if (res.status === 200) {
          setAssistantAwake(true);
        }
      })
      .catch(() => {
        setAssistantAwake(false);
      })
      .finally(() => {
        setCheckingHealth(false);
      });
  }, [isOpen]);

  const assistantExplain = () => {
    setAssistantLoading(true);
    setAssistantExplanation("");

    qaApi.post("/api/ask", {
      question: `Explain the project ${name} in detail.`,
    })
      .then((res) => {
        setAssistantExplanation(res.data.answer);
      })
      .catch((err) => {
        console.error("Assistant error:", err);
      })
      .finally(() => {
        setAssistantLoading(false);
      });
  };

  const handleClose = () => {
    setShowVideo(false);
    setAssistantAwake(false);
    setAssistantLoading(false);
    setAssistantExplanation("");
    onClose();
  };

  const clearExplanation = () => {
    setAssistantExplanation("");
  };

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
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative my-auto w-full max-w-5xl max-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl border border-cyan-500/30 bg-gray-900/95 shadow-2xl shadow-cyan-500/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              aria-label="Close dialog"
              className="cursor-pointer absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-900/70 border border-gray-700/70 text-gray-300 hover:text-white hover:border-cyan-400/60 transition-all duration-300 z-10"
            >
              <X size={16} />
            </button>

            <div className="overflow-y-auto project-scrolling p-6 sm:p-8">
              {!showVideo ? (
                <>
                  <Image
                    src={image}
                    alt="Project"
                    width={800}
                    height={450}
                    className="rounded-lg w-full"
                  />

                  <div className="flex justify-center mt-6 gap-4">
                    {videoUrl && (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full
                                   bg-gray-800/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/30
                                   text-blue-300 hover:text-blue-200 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
                      >
                        <HiOutlineVideoCamera size={18} />
                        View Video
                      </button>
                    )}

                    {!assistantAwake ? (
                      <button
                        disabled
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full
                                   bg-gray-800/40 border border-gray-700 text-gray-500 cursor-not-allowed"
                      >
                        {checkingHealth ? (
                          <HiOutlineArrowPath className="animate-spin" size={18} />
                        ) : (
                          <HiOutlineMoon size={18} />
                        )}
                        Waking Assistant…
                      </button>
                    ) : (
                      <button
                        disabled={assistantLoading}
                        onClick={assistantExplain}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full
                                   bg-gray-800/60 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/30
                                   text-emerald-400 hover:text-emerald-300 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
                      >
                        {assistantLoading ? (
                          <HiOutlineArrowPath className="animate-spin" size={18} />
                        ) : (
                          <HiOutlineSparkles size={18} />
                        )}
                        Explain with Assistant
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <video controls className="w-full h-auto rounded-lg">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="mt-4 py-2 px-5 bg-gray-800/60 border border-gray-700/50 text-gray-300 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer"
                  >
                    Back to Image
                  </button>
                </>
              )}

              <div className="mt-8 text-white space-y-4">
                {assistantExplanation ? (
                  <>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <HiOutlineSparkles /> Assistant Explanation
                    </p>
                    <TypeAnimation
                      key={assistantExplanation}
                      sequence={[assistantExplanation]}
                      speed={85}
                      cursor={true}
                      wrapper="p"
                      className="leading-relaxed whitespace-pre-line text-gray-100"
                    />

                    <button
                      onClick={clearExplanation}
                      className="mt-4 cursor-pointer flex items-center gap-2 text-sm
                                text-red-400 hover:text-red-300
                                border border-red-500/30 hover:border-red-400 bg-gray-800/60 hover:bg-red-900/20
                                rounded-full px-4 py-2
                                transition-all duration-300"
                    >
                      <HiOutlineTrash size={16} />
                      Clear Explanation
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col w-full text-justify gap-y-4 text-white">
                    <div>
                      <p className="text-lg font-semibold">Goals:</p>
                      <p>{goals}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Features:</p>
                      <ul className="list-disc list-inside text-justify space-y-1">
                        {features.split(',').map((feature, index) => (
                          <li key={index}>{feature.trim()}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Tech Stack:</p>
                      <p>{techstack}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
