"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineVideoCamera,
  HiOutlineMoon,
  HiOutlineArrowPath,
  HiOutlineTrash,
} from "react-icons/hi2";
import { FiExternalLink } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import qaApi from "../../../lib/qaApi";

// Shared detail content used by both the desktop right-panel and the
// mobile dialog, so there's a single source of truth for a project's
// video/assistant/goals/features/tech-stack presentation.
const ProjectDetailContent = ({ project, variant = "panel" }) => {
  const { name, image, videoUrl, features, techStack, goal, link } = project;

  const [showVideo, setShowVideo] = useState(false);
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
    // re-check whenever the project this content represents changes
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

  return (
    <div>
      {!showVideo ? (
        <div className="relative group rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 pointer-events-none z-10" />
          <Image
            src={image}
            alt={name}
            width={800}
            height={450}
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      ) : (
        <div>
          <video controls autoPlay className="w-full h-auto rounded-xl">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={() => setShowVideo(false)}
            className="mt-4 py-2 px-5 bg-gray-800/60 border border-gray-700/50 text-gray-300 rounded-full hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-pointer text-sm"
          >
            Back to Image
          </button>
        </div>
      )}

      {isPanel && (
        <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">{name}</h3>
      )}

      <div className="flex flex-wrap gap-3 mt-5">
        {videoUrl && !showVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/60 border border-blue-500/30 hover:border-blue-400 hover:bg-blue-900/30 text-blue-300 hover:text-blue-200 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer text-sm"
          >
            <HiOutlineVideoCamera size={16} />
            Play Video
          </button>
        )}

        {link ? (
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/60 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/30 text-cyan-300 hover:text-cyan-200 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer text-sm">
              <FiExternalLink size={16} />
              Visit Project
            </div>
          </Link>
        ) : null}

        {!assistantAwake ? (
          <button
            disabled
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/40 border border-gray-700 text-gray-500 cursor-not-allowed text-sm"
          >
            {checkingHealth ? (
              <HiOutlineArrowPath className="animate-spin" size={16} />
            ) : (
              <HiOutlineMoon size={16} />
            )}
            Waking Assistant…
          </button>
        ) : (
          <button
            disabled={assistantLoading}
            onClick={assistantExplain}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gray-800/60 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/30 text-emerald-400 hover:text-emerald-300 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer text-sm"
          >
            {assistantLoading ? (
              <HiOutlineArrowPath className="animate-spin" size={16} />
            ) : (
              <HiOutlineSparkles size={16} />
            )}
            Explain with Assistant
          </button>
        )}
      </div>

      <div className="mt-8 text-white space-y-5">
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
              className="mt-2 cursor-pointer flex items-center gap-2 text-sm text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400 bg-gray-800/60 hover:bg-red-900/20 rounded-full px-4 py-2 transition-all duration-300"
            >
              <HiOutlineTrash size={16} />
              Clear Explanation
            </button>
          </>
        ) : (
          <>
            <div>
              <p className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-1">Goal</p>
              <p className="text-gray-200 leading-relaxed">{goal}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">Highlights</p>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 list-disc list-inside text-gray-200">
                {features.split(",").map((feature, index) => (
                  <li key={index} className="leading-snug">{feature.trim()}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {techStack.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 border border-gray-700 text-gray-200 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailContent;