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
      <div className="bg-gray-900/90 p-8 rounded-xl w-11/12 md:w-2/3 max-w-4xl max-h-[96vh] overflow-y-auto relative">
        <button
          onClick={() => handleClose()}
          className="cursor-pointer absolute top-4 right-4 text-white text-3xl"
        >
          &times;
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
                             bg-gradient-to-r from-blue-800 to-blue-900
                             text-white shadow-md hover:scale-105 transition cursor-pointer"
                >
                  <HiOutlineVideoCamera size={18} />
                  View Video
                </button>
              )}

              {!assistantAwake ? (
                <button
                  disabled
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full
                             bg-gray-700 text-gray-300 cursor-not-allowed"
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
                             bg-gradient-to-r from-emerald-500 to-green-600
                             text-white shadow-md hover:scale-105 transition cursor-pointer"
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
              className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700"
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
                          border border-red-400/40 hover:border-red-300
                          rounded-md px-3 py-1.5
                          transition-colors duration-200"
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
