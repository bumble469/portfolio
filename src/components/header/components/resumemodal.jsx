import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ResumeModal = ({ onClose, isOpen }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative my-auto w-full max-w-5xl h-[85dvh] max-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl border border-cyan-500/30 bg-gray-900/95 shadow-2xl shadow-cyan-500/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 shrink-0">
              <h3 className="text-white font-bold text-base sm:text-lg">Resume</h3>
              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full bg-gray-900/70 border border-gray-700/70 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400/60 transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-auto project-scrolling">
              <iframe
                src="/resume.pdf"
                width="100%"
                height="100%"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ResumeModal;
