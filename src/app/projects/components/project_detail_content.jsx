"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineVideoCamera,
  HiOutlineMoon,
  HiOutlineArrowPath,
  HiOutlineTrash,
} from "react-icons/hi2";
import { FiExternalLink } from "react-icons/fi";
import {
  LayoutGrid,
  ListChecks,
  Layers,
  CalendarDays,
  GraduationCap,
  Compass,
  ArrowRight,
  MonitorSmartphone,
  Server,
  Database,
  BrainCircuit,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import qaApi from "../../../lib/qaApi";

const INFO_TABS = [
  { id: "overview", label: "Overview", icon: <LayoutGrid size={14} /> },
  { id: "highlights", label: "Highlights", icon: <ListChecks size={14} /> },
  { id: "stack", label: "Tech Stack", icon: <Layers size={14} /> },
  { id: "future", label: "Future Scope", icon: <Compass size={14} /> },
];

// Tech-stack category presentation — order defines the arrow flow.
const STACK_CATEGORIES = [
  { key: "frontend", label: "Frontend", icon: <MonitorSmartphone size={13} />, accent: "cyan" },
  { key: "backend", label: "Backend", icon: <Server size={13} />, accent: "emerald" },
  { key: "database", label: "Database", icon: <Database size={13} />, accent: "amber" },
  { key: "ml", label: "ML", icon: <BrainCircuit size={13} />, accent: "violet" },
];

const ACCENT_CLASSES = {
  cyan: { border: "border-cyan-500/30", text: "text-cyan-300", chipBorder: "border-cyan-500/30 hover:border-cyan-400", chipBg: "hover:bg-cyan-900/20" },
  emerald: { border: "border-emerald-500/30", text: "text-emerald-300", chipBorder: "border-emerald-500/30 hover:border-emerald-400", chipBg: "hover:bg-emerald-900/20" },
  amber: { border: "border-amber-500/30", text: "text-amber-300", chipBorder: "border-amber-500/30 hover:border-amber-400", chipBg: "hover:bg-amber-900/20" },
  violet: { border: "border-violet-500/30", text: "text-violet-300", chipBorder: "border-violet-500/30 hover:border-violet-400", chipBg: "hover:bg-violet-900/20" },
};

// Splits a blob of prose into readable bullet points. Prefers splitting on
// sentence boundaries; falls back to comma-separated fragments for short,
// list-like strings that aren't full sentences.
const toPoints = (text) => {
  if (!text) return [];
  const bySentence = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (bySentence.length > 1) return bySentence;
  return text
    .split(/,\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
};

const PointList = ({ text, twoCol = false }) => {
  const points = toPoints(text);
  return (
    <ul className={`list-disc list-outside pl-5 space-y-2 text-gray-200 text-sm sm:text-base leading-relaxed text-justify ${twoCol ? "sm:columns-2 sm:gap-x-8" : ""}`}>
      {points.map((point, i) => (
        <li key={i} className="break-words [&:not(:last-child)]:mb-2">
          {point}
        </li>
      ))}
    </ul>
  );
};

// Grouped, arrow-connected tech stack display. Falls back to a flat chip
// list (from the comma-separated techStack string) when a project doesn't
// provide the categorized `stack` object.
const StackDisplay = ({ techStack, stack }) => {
  const groups = stack
    ? STACK_CATEGORIES.filter((cat) => stack[cat.key] && stack[cat.key].length > 0)
    : [];

  if (groups.length === 0) {
    return (
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {techStack.split(",").map((tech, index) => (
          <span
            key={index}
            className="bg-gray-800 border border-gray-700 text-gray-200 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
          >
            {tech.trim()}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 justify-center sm:justify-start">
      {groups.map((cat, i) => {
        const accent = ACCENT_CLASSES[cat.accent];
        const items = stack[cat.key];
        return (
          <React.Fragment key={cat.key}>
            <div className={`rounded-xl border ${accent.border} bg-gray-800/50 px-3 py-2.5`}>
              <div className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold mb-1.5 ${accent.text}`}>
                {cat.icon}
                {cat.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item, idx) => (
                  <span
                    key={idx}
                    className={`bg-gray-900/60 border ${accent.chipBorder} ${accent.chipBg} text-gray-200 text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full transition-colors duration-300`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {i < groups.length - 1 && (
              <ArrowRight className="hidden sm:block text-gray-600 shrink-0" size={16} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Shared detail content used by both the desktop right-panel and the
// dialog. variant "panel" never plays the video inline — Play Video opens
// the dialog instead. variant "dialog" plays the video inline and, while
// playing, hides every other bit of project info/links.
const ProjectDetailContent = ({ project, variant = "panel", onPlayVideo, startWithVideo = false }) => {
  const { name, videoUrl, features, techStack, stack, goal, link, date, milestone, futureScope } = project;

  const [showVideo, setShowVideo] = useState(variant === "dialog" && startWithVideo);
  const [activeTab, setActiveTab] = useState("overview");
  const [assistantAwake, setAssistantAwake] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [assistantLoading, setAssistantLoading] = useState(false);
  const [assistantExplanation, setAssistantExplanation] = useState("");

  useEffect(() => {
    setCheckingHealth(true);
    setAssistantAwake(false);

    qaApi
      .get("/health", { timeout: 25000 })
      .then((res) => {
        if (res.status === 200) setAssistantAwake(true);
      })
      .catch(() => setAssistantAwake(false))
      .finally(() => setCheckingHealth(false));
  }, [name]);

  const assistantExplain = () => {
    setAssistantLoading(true);
    setAssistantExplanation("");

    qaApi
      .post("/api/ask", { question: `Explain the project ${name} in detail.` })
      .then((res) => setAssistantExplanation(res.data.answer))
      .catch((err) => console.error("Assistant error:", err))
      .finally(() => setAssistantLoading(false));
  };

  const clearExplanation = () => setAssistantExplanation("");
  const isPanel = variant === "panel";

  const handlePlayVideo = () => {
    if (isPanel && onPlayVideo) {
      onPlayVideo();
    } else {
      setShowVideo(true);
    }
  };

  // While the video is playing (dialog only), show nothing else.
  if (showVideo) {
    return (
      <div>
        <video controls autoPlay className="w-full h-auto rounded-xl">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={() => setShowVideo(false)}
          className="mt-4 py-2 px-5 bg-gray-800/60 border border-gray-700/50 text-gray-300 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer text-sm"
        >
          Back to Details
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">{name}</h3>

      {/* Subheading row: date/milestone on the left, action icons to the right */}
      <div className="flex items-center justify-between gap-3 flex-wrap mt-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {date && (
            <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400">
              <CalendarDays size={14} className="text-cyan-400" />
              {date}
            </span>
          )}
          {milestone && (
            <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
              <GraduationCap size={12} />
              {milestone}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {videoUrl && (
            <button
              onClick={handlePlayVideo}
              aria-label="Play video"
              title="Play Video"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/30 text-blue-300 hover:text-blue-200 transition-all duration-300 cursor-pointer"
            >
              <HiOutlineVideoCamera size={15} />
            </button>
          )}

          {link ? (
            <Link href={link} target="_blank" rel="noopener noreferrer">
              <div
                aria-label="Visit project"
                title="Visit Project"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/60 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/30 text-cyan-300 hover:text-cyan-200 transition-all duration-300 cursor-pointer"
              >
                <FiExternalLink size={14} />
              </div>
            </Link>
          ) : null}

          {!assistantAwake ? (
            <button
              disabled
              title="Waking Assistant…"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/40 border border-gray-700 text-gray-500 cursor-not-allowed"
            >
              {checkingHealth ? (
                <HiOutlineArrowPath className="animate-spin" size={15} />
              ) : (
                <HiOutlineMoon size={15} />
              )}
            </button>
          ) : (
            <button
              disabled={assistantLoading}
              onClick={assistantExplain}
              aria-label="Explain with Assistant"
              title="Explain with Assistant"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/60 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/30 text-emerald-400 hover:text-emerald-300 transition-all duration-300 cursor-pointer"
            >
              {assistantLoading ? (
                <HiOutlineArrowPath className="animate-spin" size={15} />
              ) : (
                <HiOutlineSparkles size={15} />
              )}
            </button>
          )}
        </div>
      </div>

      {assistantExplanation ? (
        <div className="mt-6 text-white space-y-3">
          <p className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <HiOutlineSparkles /> Assistant Explanation
          </p>
          <TypeAnimation
            key={assistantExplanation}
            sequence={[assistantExplanation]}
            speed={85}
            cursor={true}
            wrapper="p"
            className="leading-relaxed whitespace-pre-line text-gray-100 text-sm sm:text-base text-justify"
          />
          <button
            onClick={clearExplanation}
            className="mt-1 cursor-pointer flex items-center gap-2 text-sm text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400 bg-gray-800/60 hover:bg-red-900/20 rounded-full px-4 py-2 transition-all duration-300"
          >
            <HiOutlineTrash size={15} />
            Clear Explanation
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center gap-1 mt-6 mb-4 bg-gray-800/60 border border-gray-700/50 rounded-full p-1 w-fit mx-auto">
            {INFO_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId={`project-tab-pill-${variant}`}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-h-[160px]">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <PointList text={goal} />
                </motion.div>
              )}

              {activeTab === "highlights" && (
                <motion.div
                  key="highlights"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <PointList text={features} twoCol />
                </motion.div>
              )}

              {activeTab === "stack" && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <StackDisplay techStack={techStack} stack={stack} />
                </motion.div>
              )}

              {activeTab === "future" && (
                <motion.div
                  key="future"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {futureScope ? (
                    <PointList text={futureScope} />
                  ) : (
                    <p className="text-gray-500 leading-relaxed text-sm sm:text-base italic">
                      No future scope notes yet for this project.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetailContent;
