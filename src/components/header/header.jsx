'use client';
import { FaGithub, FaLinkedin, FaLaptopCode } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUserAlt, FaProjectDiagram, FaBriefcase, FaTrophy } from 'react-icons/fa';

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
    experience: '/experience',
    achievements: '/achievements',
  };

  return (
    <div className="w-full px-3 sm:px-6 pt-4">
      <div
        ref={headerRef}
        className="max-w-6xl mx-auto rounded-full border border-cyan-500/30 bg-gray-900/70 backdrop-blur-md shadow-lg shadow-cyan-500/5 px-6 sm:px-8 py-3 flex items-center justify-between"
      >
        <div className={`text-white text-base sm:text-lg md:text-xl font-bold whitespace-nowrap flex items-center space-x-2 transition-all duration-1000 ease-out delay-200 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <FaLaptopCode className="text-cyan-400 text-xl sm:text-2xl" />
          <span>&lt;Full-stack Developer/&gt;</span>
        </div>

        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center space-x-10 text-sm md:text-base">
            {Object.entries(routes).map(([routeName, routePath]) => {
              const isActive = pathname === routePath;

              return (
                <li
                  key={routeName}
                  className={`transition-all duration-1000 ease-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <Link
                    href={routePath}
                    className={`font-medium transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {routeName.charAt(0).toUpperCase() + routeName.slice(1)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className="flex md:hidden flex-1 justify-center">
          <ul className="flex flex-wrap justify-evenly space-x-4 text-xs">
            {Object.entries(routes).map(([routeName, routePath]) => {
              const isActive = pathname === routePath;
              return (
                <li key={routeName}>
                  <Link
                    href={routePath}
                    className={`inline-block transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {{
                      home: <FaHome size={19} />,
                      about: <FaUserAlt size={19} />,
                      projects: <FaProjectDiagram size={19} />,
                      experience: <FaBriefcase size={19} />,
                      achievements: <FaTrophy size={19} />
                    }[routeName]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-row items-center space-x-3 sm:space-x-4">
          <a
            href="https://www.linkedin.com/in/alisher-sayed-07a54a237/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 transition-all duration-300 ease-in-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/bumble469/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-cyan-400 hover:text-cyan-400 hover:scale-105 transition-all duration-300 ease-in-out ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FloatingHeader;
