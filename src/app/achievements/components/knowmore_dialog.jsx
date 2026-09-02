"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CalendarDays, CheckCircle2 } from "lucide-react";

const KnowMoreDialog = ({ isOpen, onClose, data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!data || !mounted) return null;

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
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative my-auto w-full max-w-xl max-h-[calc(100dvh-2rem)] overflow-hidden rounded-2xl border border-cyan-500/30 bg-gray-900/95 shadow-2xl shadow-cyan-500/10 flex flex-col"
          >
            {/* Header */}
            <div className="relative shrink-0">
              {data.image && (
                <div className="relative w-full h-36 sm:h-44">
                  <Image src={data.image} alt={data.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                </div>
              )}

              <button
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-900/70 border border-gray-700/70 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400/60 transition-all duration-300 z-10"
              >
                <X size={16} />
              </button>

              <div className={`px-6 ${data.image ? "-mt-10 relative" : "pt-6"}`}>
                <h3 className="text-white font-bold text-lg sm:text-xl leading-snug">
                  {data.title}
                </h3>
                {data.date && (
                  <p className="flex items-center gap-1.5 text-cyan-400 text-xs sm:text-sm font-medium mt-1.5">
                    <CalendarDays size={14} />
                    {data.date}
                  </p>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto project-scrolling px-6 py-4 space-y-4 min-h-0">
              {data.description && (
                <p className="text-gray-300 text-sm leading-relaxed text-justify">
                  {data.description}
                </p>
              )}

              {data.details && data.details.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-cyan-400 font-semibold mb-2.5">
                    What I learned / did
                  </h4>
                  <ul className="space-y-2">
                    {data.details.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
                        <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            {data.link && (
              <div className="shrink-0 border-t border-gray-800 px-6 py-4">
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  View credential
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default KnowMoreDialog;
