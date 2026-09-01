import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
  const [showVideo, setShowVideo] = useState(false);
  const [assistantAwake, setAssistantAwake] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantExplanation, setAssistantExplanation] = useState("");
  
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

  if (!isOpen) return null;

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

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 p-8 rounded-2xl w-11/12 md:w-2/3 max-w-4xl max-h-[96vh] overflow-y-auto relative shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        <button
          onClick={() => handleClose()}
          className="cursor-pointer absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/60 border border-gray-700 hover:border-cyan-500/50 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-400 transition-all duration-300 z-10"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>

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
  );
};

export default ProjectModal;
