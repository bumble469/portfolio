"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Eye } from 'lucide-react';
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import ProjectModal from "./components/project_detail_modal";
import project1 from '../../assets/images/project1.png';
import project2 from '../../assets/images/project2.png';
import project3 from '../../assets/images/project3.png';
import project4 from '../../assets/images/project4.png';
import project5 from '../../assets/images/project5.png';
import project6 from '../../assets/images/project6.png';
import project7 from '../../assets/images/project7.png';
import project8 from '../../assets/images/project8.png';
import Footer from "../../components/footer/footer.jsx";

const projects = [
  {
    name: "Restaurant Website",
    features: "OTP login, User profile management, Seamless session based cart management with order bill handling, Dynamic menu and specials section",
    techStack: "ASP.NET, MS SQL",
    goal: "Deliver a dynamic and responsive online food ordering platform...",
    image: project1,
    link: "http://foodrestaurant.somee.com/index.aspx",
    videoUrl: "/project1.mp4"
  },
  {
    name: "Education & Internship Portal",
    features: "Clean UI with responsive design for displaying opportunities.",
    techStack: "ReactJS, Vanilla CSS",
    goal: "Frontend portal for internship applications and education tracking.",
    image: project2,
    link: "https://reactapp-93a287.netlify.app/",
    videoUrl: null
  },
  {
    name: "Pet Donation Landing Page",
    features: "Visually engaging and user-friendly pet donation layout.",
    techStack: "ReactJS, Bootstrap",
    goal: "Encourage pet adoption and support animal welfare.",
    image: project3,
    link: "https://moonlit-genie-18a3cf.netlify.app/",
    videoUrl: null
  },
  {
    name: "Student Academic Tracker",
    features: "ML predictions for attendance risk and marks...",
    techStack: "ReactJS, Material-UI, SQL Server, Express, ML",
    goal: "To provide real-time academic tracking for parents...",
    image: project4,
    link: "https://psat-parent-webapp.netlify.app/",
    videoUrl: "/project4.mp4"
  },
  {
    name: "Unite: Real-Time Chat App",
    features: "OTP signup, Real-time messaging, Friend system, File sharing",
    techStack: "React (Vite), Node.js, Socket.IO, PostgreSQL",
    goal: "Enable seamless real-time communication...",
    image: project5,
    link: "https://unite-chatwebapp.netlify.app/",
    videoUrl: "/project5.mp4"
  },
  {
    name: "Docuvault: E-Document Storage",
    features: "Efficient file storage, AI-powered generation, secure sharing",
    techStack: "FastAPI (JWT), React (Vite), MongoDB, Google Gemini API",
    goal: "Provide a secure and intelligent platform for document management...",
    image: project6,
    link: "https://docuvault-web-site.vercel.app/",
    videoUrl: "/project6.mp4"
  },
  {
    name: "WeCaterers: Catering Reservation System",
    features: "Browse and book caterers, Manage carts and place orders, Rate caterers, Caterers manage profiles and menus, Dedicated user and caterer dashboards, Secure JWT-based authentication, Role-based access control for users, caterers, and admins, Email OTP verification for added security, Admin dashboard for monitoring and oversight",
    techStack: "NextJS, Prisma ORM, PostgreSQL, Tailwind CSS",
    goal: "Create a comprehensive catering reservation system...",
    image: project7,
    link: "https://we-caterers-website.vercel.app/",
    videoUrl: "/project7.mp4"
  },
  {
    name: "Leather Boutique Website",
    features: "Product filtering, OTP login, Admin panel",
    techStack: "React (Vite), Express.js, MongoDB",
    goal: "Develop a premium online leather store...",
    image: project8,
    link: "",
    videoUrl: ""
  },
];

const FloatingProjects = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeItems, setFadeItems] = useState(Array(projects.length).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsRef = useRef(null);
  const [modalContent, setModalContent] = useState({
    image: '',
    features: '',
    techStack: '',
    goal: '',
    videoUrl: ''
  });

  const openModal = (image, features, techStack, goal, videoUrl) => {
    setModalContent({ image, features, techStack, goal, videoUrl });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setFadeIn(entry.isIntersecting),
        { threshold: 0.5 }
      );
  
      if (projectsRef.current) observer.observe(projectsRef.current);
      return () => {
        if (projectsRef.current) observer.unobserve(projectsRef.current);
      };
    }, []);

  return (
    <>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={modalContent.image}
        features={modalContent.features}
        techstack={modalContent.techStack}
        goals={modalContent.goal}
        videoUrl={modalContent.videoUrl}
      />
      <div
       ref={projectsRef}
        id="projects"
          className="w-full mt-46 md:mt-50 lg:mt-29 max-w-7xl mx-auto px-4 sm:px-6 py-3 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
        >
        <h2 className="text-2xl text-center text-white font-semibold mb-2">Projects</h2>
        <div className="flex flex-wrap gap-4 ">
          {/* Row 1 */}
          <div className="flex project-scrolling overflow-x-auto space-x-4 mx-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900" style={{ maxWidth: "calc(100vw - 100px)" }}>            
            {projects.slice(0, Math.ceil(projects.length / 2)).map((project, index) => (
              <div
                key={index}
                className={`relative min-w-[300px] bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${fadeIn ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 translate-y-20 duration-1000'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={250}
                    className="object-cover w-full h-48"
                  />
                  {!project.link == "" ? <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <div className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 p-1 rounded-lg">
                      <FiExternalLink className="inline-block ml-1 text-sm" />
                    </div>
                  </Link>:""}
                </div>
                <div className="text-white text-center text-sm font-semibold py-3">
                  {project.name}
                </div>
                <div className="absolute bottom-2 left-2 bg-gray-600 hover:bg-gray-700 p-1 rounded-full">
                  <Eye
                    className="h-4 w-4 text-white cursor-pointer"
                    onClick={() =>
                      openModal(project.image, project.features, project.techStack, project.goal, project.videoUrl)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex mx-auto project-scrolling mt-2 overflow-x-auto space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900" style={{ maxWidth: "calc(100vw - 100px)" }}>
            {projects.slice(Math.ceil(projects.length / 2)).map((project, index) => (
              <div
                key={index}
                className={`relative min-w-[300px] bg-gray-800 rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 ${fadeIn ? 'opacity-100 translate-y-0 duration-1000' : 'opacity-0 -translate-y-20 duration-1000'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={250}
                    className="object-cover w-full h-48"
                  />
                  {!project.link == "" ? <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <div className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 p-1 rounded-lg">
                      <FiExternalLink className="inline-block ml-1 text-sm" />
                    </div>
                  </Link>:""}
                </div>
                <div className="text-white text-center text-sm font-semibold py-3">
                  {project.name}
                </div>
                <div className="absolute bottom-2 left-2 bg-gray-600 hover:bg-gray-700 p-1 rounded-full">
                  <Eye
                    className="h-4 w-4 text-white cursor-pointer"
                    onClick={() =>
                      openModal(project.image, project.features, project.techStack, project.goal, project.videoUrl)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FloatingProjects;
