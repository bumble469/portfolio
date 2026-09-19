"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { FolderKanban, Search, X, Filter, Eye } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import ProjectModal from "./components/project_detail_modal";
import ProjectDetailContent from "./components/project_detail_content";
import project1 from "../../assets/images/project1.png";
import project2 from "../../assets/images/project2.png";
import project3 from "../../assets/images/project3.png";
import project4 from "../../assets/images/project4.png";
import project5 from "../../assets/images/project5.png";
import project6 from "../../assets/images/project6.png";
import project7 from "../../assets/images/project7.png";
import project8 from "../../assets/images/project8.png";
import { ChevronUp, ChevronDown } from "lucide-react";

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
    features: "Smart dashboard with real-time semester insights, attendance statistics, recent exam updates, strong and weak subjects, low attendance alerts, upcoming events with infographics, performance page with all semester data, daily attendance tables, detailed marks table with infographics, marks prediction using linear regression based on current and past two semesters, attendance risk forecasting using last 5 weeks data with trends by teacher, lecture type, timing and day, day-wise prediction for upcoming timetable, teacher chat module for direct messaging, feedback page for parents, student profile with academic and personal info, multi-language support in 5 languages",
    techStack: "ReactJS, Material-UI, SQL Server, Express, ML",
    goal: "To provide real-time academic tracking for parents...",
    image: project4,
    link: "https://psat-parent-webapp.netlify.app/",
    videoUrl: "/project4.mp4"
  },
  {
    name: "Unite: Real-Time Chat App",
    features: "OTP signup, Real-time messaging, Friend request system, File sharing in private chats, Public and private rooms with real-time event handling",
    techStack: "React (Vite), Node.js, Socket.IO, PostgreSQL",
    goal: "Enable seamless real-time communication...",
    image: project5,
    link: "https://unite-chatwebapp.netlify.app/",
    videoUrl: "/project5.mp4"
  },
  {
    name: "Docuvault: E-Document Storage",
    features: "Efficient file storage, AI-powered generation, Secure sharing, Document size compression for effective storage, Previews, Dummy Aadhar linking for unlocking features after registering, Supports multiple documents with content viewing and filtering, Profile management and activity log for tracking, Gemini API key integrated to generate documents based on user prompts, Built-in prompt engineering to generate documents by parsing HTML using React libraries allowing downloads, File sharing with expiry limits",
    techStack: "FastAPI (JWT), React (Vite), MongoDB, Google Gemini API",
    goal: "Provide a secure and intelligent platform for document management...",
    image: project6,
    link: "https://docuvault-web-site.vercel.app/",
    videoUrl: "/project6.mp4"
  },
  {
    name: "WeCaterers: Catering Reservation System",
    features: "Browse and book caterers, Manage carts and place orders, Rate caterers, Caterers manage profiles and menus, Dedicated user and caterer dashboards, Secure JWT-based authentication, Role-based access control for users caterers admins, Email OTP verification for added security, Admin dashboard for monitoring and oversight",
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

// Known database/storage keywords — anything in a project's techStack that
// matches one of these (case-insensitive) is treated as a "Database" filter
// option; everything else is treated as a "Language/Framework" option.
const DATABASE_KEYWORDS = [
  "mongodb",
  "postgresql",
  "postgres",
  "mysql",
  "ms sql",
  "sql server",
  "sqlite",
  "firebase",
  "redis",
];

const isDatabaseTag = (tag) =>
  DATABASE_KEYWORDS.some((db) => tag.toLowerCase().includes(db));

const allTechTags = Array.from(
  new Set(
    projects.flatMap((p) => p.techStack.split(",").map((t) => t.trim()))
  )
);

const languageOptions = allTechTags.filter((tag) => !isDatabaseTag(tag)).sort();
const databaseOptions = allTechTags.filter((tag) => isDatabaseTag(tag)).sort();

const FloatingProjects = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const projectsRef = useRef(null);
  const [modalContent, setModalContent] = useState({
    name: "",
    image: "",
    features: "",
    techStack: "",
    goal: "",
    videoUrl: "",
    link: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleLanguage = (lang) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const toggleDatabase = (db) => {
    setSelectedDatabases((prev) =>
      prev.includes(db) ? prev.filter((d) => d !== db) : [...prev, db]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLanguages([]);
    setSelectedDatabases([]);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedLanguages.length > 0 || selectedDatabases.length > 0;

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const haystack = `${project.name} ${project.features} ${project.techStack} ${project.goal}`.toLowerCase();
      const matchesSearch = query === "" || haystack.includes(query);

      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((lang) => project.techStack.includes(lang));

      const matchesDatabase =
        selectedDatabases.length === 0 ||
        selectedDatabases.some((db) => project.techStack.includes(db));

      return matchesSearch && matchesLanguage && matchesDatabase;
    });
  }, [searchQuery, selectedLanguages, selectedDatabases]);

  const openModal = (project) => {
    setModalContent(project);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

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

  // Keep the active index valid whenever the filtered list changes shape.
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredProjects.length, searchQuery, selectedLanguages, selectedDatabases]);

  const total = filteredProjects.length;
  const activeProject = total > 0 ? filteredProjects[activeIndex] : null;

  const goPrev = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // shortest signed circular distance from activeIndex to index
  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const visibleRange = 1;

  return (
    <>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        name={modalContent.name}
        image={modalContent.image}
        features={modalContent.features}
        techstack={modalContent.techStack}
        goals={modalContent.goal}
        videoUrl={modalContent.videoUrl}
        link={modalContent.link}
      />

      <div
        ref={projectsRef}
        id="projects"
        className="w-full sm:mt-8 md:mt-12 max-w-7xl mx-auto px-4 sm:px-6 py-3 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col"
      >
        <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4 mb-3 sm:mb-6">
          <h2
            className={`text-xl sm:text-2xl lg:text-3xl text-center text-white font-bold tracking-tight flex items-center justify-center gap-2 transition-all duration-500 ${fadeIn ? "opacity-100 translate-x-0 duration-1000" : "opacity-0 -translate-x-10 duration-1000"
              }`}
          >
            <FolderKanban className="text-cyan-400" size={24} />
            Projects
          </h2>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              aria-label="Toggle search"
              className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${showSearch || searchQuery
                  ? "bg-cyan-500/15 border-cyan-400/60 text-cyan-300"
                  : "bg-gray-800/70 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
            >
              <Search size={16} />
            </button>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              aria-label="Toggle filters"
              className={`relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${showFilters || selectedLanguages.length > 0 || selectedDatabases.length > 0
                  ? "bg-cyan-500/15 border-cyan-400/60 text-cyan-300"
                  : "bg-gray-800/70 border-gray-700 text-gray-300 hover:border-gray-600"
                }`}
            >
              <Filter size={16} />
              {(selectedLanguages.length > 0 || selectedDatabases.length > 0) && (
                <span className="absolute -top-1 -right-1 bg-cyan-400 text-gray-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {selectedLanguages.length + selectedDatabases.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ---------- Search + Filters ---------- */}
        <div className="w-full max-w-3xl mx-auto mb-4 sm:mb-6 flex flex-col gap-2.5">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, tech, or feature..."
                className="w-full bg-gray-800/70 border border-gray-700 focus:border-cyan-400/60 focus:outline-none text-gray-100 placeholder-gray-500 text-sm rounded-full pl-9 pr-9 py-2.5 transition-colors duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {showFilters && (
            <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
              <div>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Language / Framework
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => toggleLanguage(lang)}
                      className={`text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${selectedLanguages.includes(lang)
                          ? "bg-cyan-500/20 border-cyan-400/70 text-cyan-300"
                          : "bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-500"
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] sm:text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                  Database
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {databaseOptions.map((db) => (
                    <button
                      key={db}
                      onClick={() => toggleDatabase(db)}
                      className={`text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${selectedDatabases.includes(db)
                          ? "bg-emerald-500/20 border-emerald-400/70 text-emerald-300"
                          : "bg-gray-900/60 border-gray-700 text-gray-300 hover:border-gray-500"
                        }`}
                    >
                      {db}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="self-start text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <X size={13} />
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {total === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24 gap-3">
            <p className="text-gray-300 font-medium">No projects match your search or filters.</p>
            <button
              onClick={clearFilters}
              className="text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* ---------- Desktop: 50/50 split ---------- */}
            <div
              className={`hidden md:grid grid-cols-2 gap-4 lg:gap-8 items-start mb-4 transition-all duration-1000 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              {/* Left: vertical, movie-poster style card roller */}
              <div className="relative h-[clamp(420px,68dvh,720px)] flex flex-col items-center justify-center">
                <button
                  onClick={goPrev}
                  aria-label="Previous project"
                  className="absolute top-1 z-30 bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 p-2 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>

                <div className="relative w-full h-full overflow-hidden" style={{ perspective: "1200px" }}>
                  {filteredProjects.map((project, index) => {
                    const offset = getOffset(index);
                    const absOffset = Math.abs(offset);

                    if (absOffset > visibleRange) return null;

                    const isActive = offset === 0;
                    const spacing = "clamp(70px, 14dvh, 140px)";
                    const translateY = `calc(${offset} * ${spacing})`;
                    const scale = isActive ? 1 : 0.8;
                    const opacity = isActive ? 1 : 0.35;
                    const blur = isActive ? 0 : 3;
                    const zIndex = 20 - absOffset;

                    return (
                      <button
                        key={project.name}
                        onClick={() => setActiveIndex(index)}
                        className={`absolute top-1/2 left-1/2 w-[min(320px,80vw)] sm:w-[min(380px,46vw)] md:w-[min(340px,36vw)] lg:w-[450px] rounded-2xl overflow-hidden transition-all duration-500 ease-out text-left ${isActive
                            ? "ring-2 ring-cyan-400/70 shadow-2xl shadow-cyan-500/30 cursor-default"
                            : "ring-1 ring-gray-800/80 cursor-pointer"
                          }`}
                        style={{
                          transform: `translate(-50%, -50%) translateY(${translateY}) scale(${scale})`,
                          opacity,
                          filter: `blur(${blur}px)`,
                          zIndex,
                          pointerEvents: absOffset > visibleRange ? "none" : "auto",
                        }}
                      >
                        <div className="relative w-full aspect-[16/10] bg-gray-900">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                          {isActive && (
                            <div className="absolute top-3 right-3 bg-cyan-500/90 text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                              Featured
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p
                              className={`font-bold text-white leading-tight line-clamp-2 transition-all duration-300 ${isActive ? "text-lg" : "text-sm"
                                }`}
                            >
                              {project.name}
                            </p>

                            {isActive && (
                              <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {project.techStack.split(",").slice(0, 3).map((tech, i) => (
                                  <span
                                    key={i}
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full"
                                  >
                                    {tech.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={goNext}
                  aria-label="Next project"
                  className="absolute bottom-1 z-30 bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 p-2 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              {/* Right: detailed info for the active project */}
              <div className="h-[clamp(420px,68dvh,720px)] overflow-y-auto project-scrolling pr-1">
                {activeProject && (
                  <ProjectDetailContent key={activeProject.name} project={activeProject} variant="panel" />
                )}
              </div>
            </div>

            {/* ---------- Mobile: vertical card roller, opens dialog ---------- */}
            <div
              className={`md:hidden relative h-[clamp(300px,54dvh,460px)] flex flex-col items-center justify-center mb-4 transition-all duration-1000 ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            >
              <button
                onClick={goPrev}
                aria-label="Previous project"
                className="absolute top-0 z-30 bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 p-1.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
              >
                <ChevronUp className="h-4 w-4" />
              </button>

              <div className="relative w-full h-full overflow-hidden" style={{ perspective: "1200px" }}>
                {filteredProjects.map((project, index) => {
                  const offset = getOffset(index);
                  const absOffset = Math.abs(offset);

                  if (absOffset > visibleRange) return null;

                  const isActive = offset === 0;
                  const spacing = "clamp(60px, 13dvh, 110px)";
                  const translateY = `calc(${offset} * ${spacing})`;
                  const scale = isActive ? 1 : 0.8;
                  const opacity = isActive ? 1 : 0.35;
                  const blur = isActive ? 0 : 3;
                  const zIndex = 20 - absOffset;

                  return (
                    <div
                      key={project.name}
                      onClick={() => !isActive && setActiveIndex(index)}
                      className={`absolute top-1/2 left-1/2 w-[82vw] xs:w-[78vw] sm:w-[380px] rounded-2xl overflow-hidden transition-all duration-500 ease-out ${isActive
                          ? "ring-2 ring-cyan-400/70 shadow-2xl shadow-cyan-500/30"
                          : "ring-1 ring-gray-800/80 cursor-pointer"
                        }`}
                      style={{
                        transform: `translate(-50%, -50%) translateY(${translateY}) scale(${scale})`,
                        opacity,
                        filter: `blur(${blur}px)`,
                        zIndex,
                        pointerEvents: absOffset > visibleRange ? "none" : "auto",
                      }}
                    >
                      <div className="relative w-full aspect-[16/10] bg-gray-900">
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

                        {isActive && (
                          <div className="absolute top-3 left-3 bg-cyan-500/90 text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                            Featured
                          </div>
                        )}

                        {isActive && (
                          <div className="absolute top-2.5 right-2.5 flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(project);
                              }}
                              aria-label="View project details"
                              className="bg-gray-900/60 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-200 hover:text-cyan-300 p-2 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
                            >
                              <Eye size={16} />
                            </button>
                            {project.link !== "" && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label="Visit project"
                                className="bg-gray-900/60 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-200 hover:text-cyan-300 p-2 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
                              >
                                <FiExternalLink size={15} />
                              </a>
                            )}
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-3.5">
                          <p
                            className={`font-bold text-white leading-tight line-clamp-2 transition-all duration-300 ${isActive ? "text-base" : "text-sm"
                              }`}
                          >
                            {project.name}
                          </p>

                          {isActive && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {project.techStack.split(",").slice(0, 3).map((tech, i) => (
                                <span
                                  key={i}
                                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={goNext}
                aria-label="Next project"
                className="absolute bottom-0 z-30 bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 p-1.5 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FloatingProjects;
