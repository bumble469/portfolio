import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ProjectModal = ({ image, features, techstack, goals, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Lock the scroll on body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock the scroll when modal is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Clean up the effect when component is unmounted or modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex justify-center items-center z-100 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-gray-800 p-8 rounded-xl w-11/12 md:w-2/3 max-w-4xl pointer-events-auto">
        <div className="relative overflow-auto">
          <button
            onClick={onClose}
            className="absolute text-white right-0 top-0 text-3xl cursor-pointer"
          >
            &times;
          </button>
          <div className="mb-6 p-6">
            <Image
              src={image}
              alt="Project"
              className="object-cover w-full h-auto rounded-lg"
              width={800}
              height={450}
            />
          </div>
          {/* Columns Layout for Features, Tech Stack, and Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div>
              <p className="text-lg font-semibold">Features:</p>
              <p>{features}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Tech Stack:</p>
              <p>{techstack}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Goals:</p>
              <p>{goals}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectModal;
