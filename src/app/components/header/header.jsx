"use client";
import { FaGithub, FaLinkedin, FaLaptopCode } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import myimage from '../../assets/images/myimage.jpg';
import myimage1 from '../../assets/images/myimage1.jpg';
import Image from 'next/image';
import ResumeModal from './components/resumemodal';
import $ from 'jquery';

const FloatingHeader = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [frontImage, setFrontImage] = useState('first');
  const [isResumeOpen, setIsResumeModalOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFadeIn(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const top = $(element).offset().top; 
      console.log("Scrolling to: ", top); 
      $('html, body').animate({
        scrollTop: top
      }, 700); 
    }
  };

  return (
    <>
      <div
        ref={headerRef}
        id="home"
        className="w-full max-w-7xl mx-auto border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md px-4 sm:px-6 py-3 rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
        >
        <div className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-between w-full gap-y-4">
          <div className={`text-white text-base sm:text-lg md:text-xl font-bold whitespace-nowrap flex items-center space-x-2 transition-all duration-1000 ease-out delay-200 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <FaLaptopCode className="text-cyan-400 text-xl sm:text-2xl" />
            <span>&lt;Full-stack Developer/&gt;</span>
          </div>

          <nav className="w-full sm:w-auto md:flex md:flex-1 justify-center">
            <ul className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 text-xs sm:text-sm md:text-base">
              {['home', 'about', 'projects', 'achievements'].map((div, i) => (
                <li
                  key={div}
                  className={`transition-all duration-1000 ease-out delay-${300 + i * 100} ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <a
                    href={`#${div}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(div);
                    }}
                    className="cursor-pointer"
                  >
                    {div.charAt(0).toUpperCase() + div.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-row items-center space-x-4 sm:space-x-3">
            <a
              href="https://github.com/bumble469/"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 py-2 rounded-md font-semibold shadow transition duration-300 ease-in-out flex items-center space-x-2 text-sm transition-all duration-1000 ease-out delay-400 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <FaGithub className="text-white" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alisher-sayed-07a54a237/"
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-3 sm:px-4 py-2 rounded-md font-semibold shadow transition duration-300 ease-in-out flex items-center space-x-2 text-sm transition-all duration-1000 ease-out delay-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <FaLinkedin className="text-cyan-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className={`mt-8 sm:mt-12 p-4 max-w-screen-xl mx-auto w-full transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-y-6">
            {/* Text Section */}
            <div className={`w-full md:w-1/2 md:pr-8 transition-all duration-1000 ease-out delay-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-3 sm:space-y-0">
                <h2 className={`text-2xl sm:text-3xl text-white font-semibold text-center sm:text-left transition-all duration-1000 ease-out delay-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Alisher Sayed
                </h2>
                <a
                  onClick={() => setIsResumeModalOpen(true)}
                  className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer transition-all duration-1000 ease-out delay-400 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  View Resume
                </a>
              </div>
              <div className={`flex gap-x-6 mt-4 transition-all duration-1000 ease-out delay-500 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <a className="!text-xs sm:text-base text-cyan-300 cursor-pointer font-medium hover:text-cyan-500 transition-all duration-300 transform hover:scale-105">
                  <span className="text-xs">📧</span> alishersayed100@gmail.com
                </a>
                <a className="!text-xs sm:text-base text-cyan-300 cursor-pointer font-medium hover:text-cyan-500 transition-all duration-300 transform hover:scale-105">
                  <span className="text-xs">📞</span> +91 7977876006
                </a>
              </div>
              <p className={`text-sm text-gray-300 mt-3 text-justify transition-all duration-1000 ease-out delay-600 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Aspiring full-stack developer with experience in React, Node.js, Express, and Flask. Skilled in building responsive web apps using HTML, CSS, Bootstrap, and ASP.NET. Proficient in Python, Java, Kotlin, and C#, with knowledge of Git, Android Studio, and databases like MySQL, MongoDB, and PostgreSQL.
              </p>

              <div className={`flex flex-wrap gap-2 mt-4 transition-all duration-1000 ease-out delay-700 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {[
                  'React', 'Material-UI', 'Next.js', 'Tailwind CSS',
                  'Node.js', 'MongoDB', 'Express', 'Flask',
                  'FastAPI', 'MSSQL', 'PostgreSQL',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-800 text-cyan-400 text-xs font-medium px-3 py-1 rounded-full shadow-sm transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Cards */}
            <div className={`relative w-[350px] h-[320px] perspective z-30 sm:z-10 order-first sm:order-last transition-all duration-1000 ease-out delay-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div
                className={`absolute top-0 left-0 transition-all duration-500 ease-in-out transform ${frontImage === 'first' ? 'z-20 scale-105 rotate-0' : 'z-10 scale-95 -rotate-2'}`}
                onMouseEnter={() => setFrontImage('first')}
              >
                <Image
                  src={myimage}
                  alt="image1"
                  className="rounded-3xl shadow-2xl cursor-pointer scale-80 md:scale-100 object-cover w-72 h-72 sm:w-80 sm:h-80 transition-transform duration-500"
                />
              </div>

              <div
                className={`absolute top-5 left-20 transition-all duration-500 ease-in-out transform ${frontImage === 'second' ? 'z-20 scale-105 rotate-0' : 'z-10 scale-95 rotate-2'}`}
                onMouseEnter={() => setFrontImage('second')}
              >
                <Image
                  src={myimage1}
                  alt="image2"
                  className="rounded-3xl shadow-2xl cursor-pointer scale-80 md:scale-100 object-cover w-72 h-72 sm:w-80 sm:h-80 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isResumeOpen && (
        <ResumeModal
          onClose={() => setIsResumeModalOpen(false)}
          isOpen={() => setIsResumeModalOpen(true)}
        />
      )}
    </>
  );
};

export default FloatingHeader;
