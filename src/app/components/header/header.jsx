"use client"
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaLaptopCode } from 'react-icons/fa'; // Importing icons from React Icons
import { useEffect, useState } from 'react';
import myimage from '../../assets/images/myimage.jpg';
import myimage1 from '../../assets/images/myimage1.jpg';
import Image from 'next/image';
import ResumeModal from './components/resumemodal';

const FloatingHeader = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [frontImage, setFrontImage] = useState('first');
  const [isResumeOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="border-2 border-gray-800/50 fixed top-5 left-5 right-5 bg-gray-900/40 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg z-50 flex flex-col items-center justify-between">
      <div className='flex items-center justify-between w-full'>
        <div className="text-white text-lg md:text-xl font-bold whitespace-nowrap animate-glow flex items-center space-x-2">
            <FaLaptopCode className="text-cyan-400 text-2xl" /> {/* Full-stack Developer Icon */}
            <span>&lt;Full-stack Developer/&gt;</span>
        </div>
        {/* Center: Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-6 text-sm md:text-base">
            <li>
                <Link href="/" className="text-white hover:text-cyan-400 transition font-medium animate-glow">
                Home
                </Link>
            </li>
            <li>
                <Link href="/about" className="text-white hover:text-cyan-400 transition font-medium animate-glow">
                About
                </Link>
            </li>
            <li>
                <Link href="/projects" className="text-white hover:text-cyan-400 transition font-medium animate-glow">
                Projects
                </Link>
            </li>
            <li>
                <Link href="/achievements" className="text-white hover:text-cyan-400 transition font-medium animate-glow">
                Achievements
                </Link>
            </li>
            <li>
                <Link href="/contact" className="text-white hover:text-cyan-400 transition font-medium animate-glow">
                Contact
                </Link>
            </li>
            </ul>
        </nav>

        {/* Right: Buttons with icons */}
        <div className="flex space-x-3">
            <a
            href="https://github.com/your-github-id"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md font-semibold shadow transition duration-200 animate-glow-btn flex items-center space-x-2"
            >
            <FaGithub className="text-white" /> {/* GitHub Icon */}
            <span>View GitHub</span>
            </a>
            <a
            href="https://www.linkedin.com/in/your-linkedin-id"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-4 py-2 rounded-md font-semibold shadow transition duration-200 animate-glow-btn flex items-center space-x-2"
            >
            <FaLinkedin className="text-cyan-400" /> {/* LinkedIn Icon */}
            <span>Visit LinkedIn</span>
            </a>
        </div>
      </div>
      <div className={`mt-12 p-4 fadeIn ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 max-w-screen-xl mx-auto flex items-center justify-between w-full`}>
        <div className="flex items-center justify-between w-full">
          {/* Text Section */}
          <div className="w-1/2 pr-8 mr-auto">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl text-white font-semibold animate-glow">Alisher Sayed</h2>
              <a
                onClick={()=>setIsResumeModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium shadow-md hover:scale-105 transition-transform duration-300 animate-glow-btn"
              >
                View Resume
              </a>
            </div>
            <p className="text-sm text-gray-300 mt-2 text-justify">
            Aspiring full-stack developer with experience in React, Node.js, Express, and Flask. Skilled in building responsive web apps using HTML, CSS, Bootstrap, and ASP.NET. Proficient in Python, Java, Kotlin, and C#, with knowledge of Git, Android Studio, and databases like MySQL, MongoDB, and PostgreSQL.
            </p>
            {/* Skills row */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['React','Material-UI', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB','Express','Flask','FastAPI','MSSQL','PostgreSQL'].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-800 text-cyan-400 text-xs font-medium px-3 py-1 rounded-full shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="relative w-[350px] h-[320px] perspective">
            {/* First Card */}
            <div
              className={`absolute top-0 left-0 transition-all duration-500 ease-in-out transform ${
                frontImage === 'first'
                  ? 'z-20 scale-105 rotate-0'
                  : 'z-10 scale-95 -rotate-2'
              }`}
              onMouseEnter={() => setFrontImage('first')}
            >
              <Image
                src={myimage}
                alt="image1"
                className="rounded-3xl shadow-2xl cursor-pointer"
                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
              />
            </div>

            {/* Second Card */}
            <div
              className={`absolute top-5 left-20 transition-all duration-500 ease-in-out transform ${
                frontImage === 'second'
                  ? 'z-20 scale-105 rotate-0'
                  : 'z-10 scale-95 rotate-2'
              }`}
              onMouseEnter={() => setFrontImage('second')}
            >
              <Image
                src={myimage1}
                alt="image2"
                className="rounded-3xl shadow-2xl cursor-pointer"
                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
      {isResumeOpen && <ResumeModal onClose={()=>setIsResumeModalOpen(false)} />}
    </div>
  );
};

export default FloatingHeader;
