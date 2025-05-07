"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Eye } from 'lucide-react'; // Import Eye icon
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectModal from "./components/project_detail_modal";
import project1 from '../../assets/images/project1.png';
import project2 from '../../assets/images/project2.png';
import project3 from '../../assets/images/project3.png';
import project4 from '../../assets/images/project4.png';
import project5 from '../../assets/images/project5.png';
import project6 from '../../assets/images/project6.png';
import project7 from '../../assets/images/project7.png';

const projects = [
  {
    name: "Restaurant Website",
    features: "OTP login, user profiles, and seamless cart and order management.",
    techStack: "ASP.NET, MS SQL",
    goal: "Provide a dynamic and responsive food ordering platform.",
    image: project1,
    link: "http://restaurantwebsite.somee.com/index.aspx",
  },
  {
    name: "Education & Internship Portal",
    features: "Clean UI with responsive design for displaying opportunities.",
    techStack: "ReactJS, Vanilla CSS",
    goal: "Frontend portal for internship applications and education tracking.",
    image: project2,
    link: "https://reactapp-93a287.netlify.app/",
  },
  {
    name: "Pet Donation Landing Page",
    features: "Visually engaging and user-friendly pet donation layout.",
    techStack: "ReactJS, Bootstrap",
    goal: "Encourage pet adoption and support animal welfare.",
    image: project3,
    link: "https://moonlit-genie-18a3cf.netlify.app/",
  },
  {
    name: "Student Academic Tracker",
    features: "ML predictions, parent dashboard, secure APIs, and performance/attendance tracking.",
    techStack: "ReactJS, MUI, SQL Server, custom API, ML (Voting Ensemble + Linear Regression)",
    goal: "Provide real-time academic tracking and predictive insights for parents.",
    image: project4,
    link: "https://psat-parent-webapp.netlify.app/",
  },
  {
    name: "Unite: Real-Time Chat App",
    features: "OTP signup, real-time messaging, rooms, profiles, and file sharing.",
    techStack: "React (Vite), Node.js, Socket.IO, PostgreSQL",
    goal: "Enable real-time communication and collaboration.",
    image: project5,
    link: "https://unitewebapp.netlify.app/",
  },
  {
    name: "Docuvault: E-Document Storage",
    features: "Expiring links, storage monitoring, AI-based code generation, activity logs.",
    techStack: "FastAPI (JWT), React (Vite), MongoDB Atlas, Google Gemini API",
    goal: "Offer a secure and intelligent platform for document management.",
    image: project6,
    link: "https://docuvault-web-site.vercel.app/",
  },
  {
    name: "Leather Boutique Website",
    features: "Product filtering, OTP-based authentication, cart, secure admin panel.",
    techStack: "React (Vite), Express.js, MongoDB Compass",
    goal: "Develop a premium online leather store with product management.",
    image: project7,
    link: "",
  },
];

const FloatingProjects = () => {
  const [fadeItems, setFadeItems] = useState(Array(projects.length).fill(false));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ image: '', features: '', techStack: '', goal: '' });

  const openModal = (image, features, techStack, goal) => {
    setModalContent({ image, features, techStack, goal });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeItems(Array(projects.length).fill(true));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {/* Project Modal */}
    <ProjectModal
    isOpen={isModalOpen}
    onClose={closeModal}
    image={modalContent.image}
    features={modalContent.features}
    techstack={modalContent.techStack}
    goals={modalContent.goal}
  />
    <motion.div
        id="projects"
      className="absolute bg-gray-900/40 backdrop-blur-md border-2 border-gray-800/50 px-6 py-6 rounded-xl shadow-lg z-50 top-590 md:top-310 right-5 left-5"
    >
      <h2 className="text-2xl text-center text-white font-semibold mb-2">Projects</h2>
      <div className="flex flex-wrap gap-4">
        {/* Row 1 */}
        <div className="flex scrollbar-hidden overflow-x-auto space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {projects.slice(0, Math.ceil(projects.length / 2)).map((project, index) => (
            <motion.div
              key={index}
              className="relative min-w-[300px] bg-gray-800 rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
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
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <div className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 p-1 rounded-full">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
              </div>
              <div className="text-white text-center text-sm font-semibold py-3">
                {project.name}
              </div>

              {/* View Details Icon */}
              <div className="absolute bottom-2 left-2 bg-gray-600 hover:bg-gray-700 p-1 rounded-full">
                <Eye
                  className="h-4 w-4 text-white cursor-pointer"
                  onClick={() => openModal(project.image, project.features, project.techStack, project.goal)}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex overflow-x-auto scrollbar-hidden space-x-4 w-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {projects.slice(Math.ceil(projects.length / 2)).map((project, index) => (
            <motion.div
              key={index}
              className="relative min-w-[300px] bg-gray-800 rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
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
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  <div className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 p-1 rounded-full">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </Link>
              </div>
              <div className="text-white text-center text-sm font-semibold py-3">
                {project.name}
              </div>

              {/* View Details Icon */}
              <div className="absolute bottom-2 left-2 bg-gray-600 hover:bg-gray-700 p-1 rounded-full">
                <Eye
                  className="h-4 w-4 text-white"
                  onClick={() => openModal(project.image, project.features, project.techStack, project.goal)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div></>
  );
};

export default FloatingProjects;
