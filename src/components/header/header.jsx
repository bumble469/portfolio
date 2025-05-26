'use client';
import { FaGithub, FaLinkedin, FaLaptopCode } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FloatingHeader = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const headerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFadeIn(true);
          if (headerRef.current) observer.unobserve(headerRef.current);
        }
      },
      { threshold: 0.4 }
    );

    if (headerRef.current) observer.observe(headerRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  const routes = {
    home: '/',
    about: '/about',
    projects: '/projects',
    achievements: '/achievements',
  };

  return (
    <div
      ref={headerRef}
      className="absolute top-6 right-6 left-6 max-w-7xl mx-auto border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md px-4 sm:px-6 py-3 rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
    >
      <div className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-between w-full gap-y-4">
        <div className={`text-white text-base sm:text-lg md:text-xl font-bold whitespace-nowrap flex items-center space-x-2 transition-all duration-1000 ease-out delay-200 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <FaLaptopCode className="text-cyan-400 text-xl sm:text-2xl" />
          <span>&lt;Full-stack Developer/&gt;</span>
        </div>

        <nav className="w-full sm:w-auto md:flex md:flex-1 justify-center">
          <ul className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6 text-xs sm:text-sm md:text-base">
            {Object.entries(routes).map(([routeName, routePath], i) => {
              const isActive = pathname === routePath;

              return (
                <li
                  key={routeName}
                  className={`transition-all duration-1000 ease-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <Link
                    href={routePath}
                    className={`
                      relative 
                      px-1 pb-1
                      font-medium
                      text-white
                      transition duration-300
                      hover:text-cyan-400 
                      hover:border-cyan-400 
                      hover:border-b-2
                      ${isActive ? 'border-b-2 border-cyan-400' : 'border-b-2 border-transparent'}
                    `}
                  >
                    {routeName.charAt(0).toUpperCase() + routeName.slice(1)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-row items-center space-x-4 sm:space-x-3">
          <a
            href="https://github.com/bumble469/"
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-cyan-500 hover:bg-cyan-600 text-white px-3 sm:px-4 py-2 rounded-md font-semibold shadow transition duration-300 ease-in-out flex items-center space-x-2 text-sm transition-all duration-1000 ease-out delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
    </div>
  );
};

export default FloatingHeader;
