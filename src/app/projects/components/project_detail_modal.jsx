import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProjectModal = ({ image, videoUrl, features, techstack, goals, isOpen, onClose }) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex justify-center items-center z-100 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}  // Start from scaled down and invisible
      animate={{ opacity: 1, scale: 1 }}   // Fade in with scale to normal size
      exit={{ opacity: 0, scale: 0.8 }}    // Fade out with scale down
      transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4 } }}  // Slow motion effect
    >
      <div className="project-scrolling bg-gray-900/90 p-8 rounded-xl w-11/12 md:w-2/3 max-w-4xl pointer-events-auto max-h-[96vh] overflow-y-auto">
        <div className="relative overflow-auto">
          <button
            onClick={() => {
              onClose();
              setShowVideo(false);
            }}
            className="absolute text-white right-0 top-0 text-3xl cursor-pointer"
          >
            &times;
          </button>

          <div className="mb-6 p-6">
            {!showVideo ? (
              <>
                <Image
                  src={image}
                  alt="Project"
                  className="object-cover w-full h-auto rounded-lg"
                  width={800}
                  height={450}
                />
                {videoUrl ? (
                  <button
                    onClick={() => setShowVideo(true)}
                    className="mt-4 py-2 px-6 cursor-pointer bg-gradient-to-r from-blue-800 to-blue-900 text-white font-medium rounded-md shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    🎬 View Video
                  </button>
                ) : null}

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
          </div>

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
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectModal;
