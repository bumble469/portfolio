'use client';
import { useState, useRef, useEffect } from "react";
import myimage from '../assets/images/myimage.png';
import myimage1 from '../assets/images/myimage1.png';
import Image from 'next/image';
import ResumeModal from '../components/header/components/resumemodal.jsx';
import qaApi from "@/lib/qaApi";
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { FiChevronDown } from 'react-icons/fi';

const photos = [myimage, myimage1];

const skills = [
  'React', 'Next.js', 'Node.js', 'Express', 'Flask',
  'MongoDB', 'MySQL', 'PostgreSQL', 'Tailwind CSS', 'Git',
];

export default function Home() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isResumeOpen, setIsResumeModalOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const homeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFadeIn(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (homeRef.current) observer.observe(homeRef.current);
    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current);
    };
  }, []);

  useEffect(() => {
    qaApi.get('/health')
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={homeRef}
      className={`px-6 sm:px-10 md:px-14 py-3 md:py-4 max-w-screen-xl mx-auto w-full min-h-[calc(100svh-96px)] flex items-center transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'} `}
    >
      <div className="grid md:grid-cols-2 items-center gap-y-8 w-full">
        <div className={`order-2 md:order-1 transition-all duration-1000 ease-out delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-400 mb-1 text-center md:text-left">Hi I am</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-1 text-center md:text-left">
            Alisher Sayed
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-400 leading-tight mb-3 text-center md:text-left">
            Full-stack Developer
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <a
              href="mailto:alishersayed100@gmail.com"
              aria-label="Email"
              className="group flex items-center h-8 rounded-full bg-gray-800 text-gray-300 hover:text-cyan-400 transition-colors duration-300 overflow-hidden px-2"
            >
              <HiOutlineMail size={20} className="shrink-0" />
              <span className="max-w-0 group-hover:max-w-[220px] group-hover:ml-2 overflow-hidden whitespace-nowrap text-xs transition-all duration-500 ease-in-out">
                alishersayed100@gmail.com
              </span>
            </a>
            <a
              href="tel:+917977876006"
              aria-label="Phone"
              className="group flex items-center h-8 rounded-full bg-gray-800 text-gray-300 hover:text-cyan-400 transition-colors duration-300 overflow-hidden px-2"
            >
              <HiOutlinePhone size={20} className="shrink-0" />
              <span className="max-w-0 group-hover:max-w-[160px] group-hover:ml-2 overflow-hidden whitespace-nowrap text-xs transition-all duration-500 ease-in-out">
                +91 7977876006
              </span>
            </a>
          </div>

          <p className="text-sm text-gray-300 mb-4 max-w-md mx-auto md:mx-0 text-center md:text-left line-clamp-2">
            Full-stack developer skilled in React, Node.js, Express, and Flask, building responsive web apps end to end.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 mb-5">
            <a
              onClick={() => setIsResumeModalOpen(true)}
              className="btn-shine bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.04] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 px-5 py-2.5 rounded-md font-medium cursor-pointer text-white"
            >
              View Resume
            </a>
            <a
              href="mailto:alishersayed100@gmail.com"
              className="btn-shine border border-gray-500 hover:border-cyan-400 hover:scale-[1.04] hover:text-cyan-300 transition-all duration-300 px-5 py-2.5 rounded-md font-medium text-white"
            >
              Contact Me
            </a>
          </div>

          <div className="bg-gray-800/70 rounded-lg px-5 py-3 max-w-xl mx-auto md:mx-0 flex items-start gap-4">
            <div className="flex divide-x divide-gray-700 justify-center md:justify-start shrink-0">
              <div className="pr-6 text-center md:text-left">
                <p className="text-cyan-400 text-lg font-bold">8+</p>
                <p className="text-gray-400 text-xs whitespace-nowrap">Projects</p>
              </div>
              <div className="pl-6 text-center md:text-left">
                <p className="text-cyan-400 text-lg font-bold">10+</p>
                <p className="text-gray-400 text-xs whitespace-nowrap">Skills</p>
              </div>
            </div>

            <div className="border-l border-gray-700 pl-4 flex-1 min-w-0">
              <div
                className="flex flex-wrap content-start gap-1.5 overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: showAllSkills ? '54px' : '24px' }}
              >
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-700/80 text-cyan-400 text-[11px] font-medium px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setShowAllSkills((prev) => !prev)}
                className="mt-1 flex items-center gap-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                {showAllSkills ? 'Show less' : 'View all'}
                <FiChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${showAllSkills ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className={`order-1 md:order-2 relative flex justify-center items-end transition-all duration-1000 ease-out delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full bg-gray-800/60 -z-0" />

          <div className="relative w-[260px] h-[340px] sm:w-[380px] sm:h-[480px]">
            {photos.map((photo, index) => (
              <Image
                key={index}
                src={photo}
                alt="Alisher Sayed"
                className={`absolute inset-0 z-10 w-full h-full object-contain object-bottom transition-opacity duration-700 ease-in-out ${
                  index === activePhoto ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-2 flex gap-2 z-20">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePhoto(index)}
                aria-label={`Show photo ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activePhoto ? 'bg-cyan-400 w-5' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {isResumeOpen && (
        <ResumeModal
          onClose={() => setIsResumeModalOpen(false)}
          isOpen={isResumeOpen}
        />
      )}
    </div>
  )
}
