import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ResumeModal = ({ onClose, isOpen }) => {
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
      className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex justify-center items-center z-[100] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="bg-gray-900 p-6 rounded-xl w-11/12 md:w-2/3 max-w-4xl h-[90vh] pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute text-white right-4 top-2 text-3xl cursor-pointer z-10"
          >
            &times;
          </button>

          {/* Resume Viewer */}
          <div className="h-full pt-10 overflow-auto rounded-lg shadow-lg">
            <iframe
              src="/resume.pdf"
              width="100%"
              height="100%"
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeModal;
