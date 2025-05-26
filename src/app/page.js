'use client';
import { useState, useRef, useEffect } from "react";
import myimage from '../assets/images/myimage.jpg';
import myimage1 from '../assets/images/myimage1.jpg';
import Image from 'next/image';
import ResumeModal from '../components/header/components/resumemodal.jsx';
import Footer from "../components/footer/footer.jsx";
export default function Home() {
  const [frontImage, setFrontImage] = useState('first');
  const [isResumeOpen, setIsResumeModalOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
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

  return(
    <div
      ref={homeRef}
      className={`min-h-fit px-8 mt-46 md:mt-50 lg:mt-29 p-4 max-w-screen-xl mx-auto w-full transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-y-6">
        <div className={`w-full md:w-1/2 md:pr-8 transition-all duration-1000 ease-out delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-3 sm:space-y-0">
            <h2 className={`text-2xl sm:text-3xl text-white font-semibold text-center sm:text-left transition-all duration-1000 ease-out delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
            <a href='mailto:alishersayed100@gmail.com' className="!text-xs sm:text-base text-cyan-300 cursor-pointer font-medium hover:text-cyan-500 transition-all duration-300 transform hover:scale-105">
              <span className="text-xs">📧</span> alishersayed100@gmail.com
            </a>
            <a href='tel:+917977876006' className="!text-xs sm:text-base text-cyan-300 cursor-pointer font-medium hover:text-cyan-500 transition-all duration-300 transform hover:scale-105">
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

        <div className={`relative w-[350px] h-[320px] perspective z-30 sm:z-10 order-first sm:order-last transition-all duration-1000 ease-out delay-100 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
      {isResumeOpen && (
        <ResumeModal
          onClose={() => setIsResumeModalOpen(false)}
          isOpen={isResumeOpen}
        />
      )}
      <Footer />
    </div>
  )
}

