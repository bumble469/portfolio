"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { FolderKanban, Search, X, Filter, Eye, ChevronUp, ChevronDown } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import ProjectModal from "./components/project_detail_modal";
import ProjectDetailContent from "./components/project_detail_content";
import project1 from "../../assets/images/project1.png";
import project4 from "../../assets/images/project4.png";
import project5 from "../../assets/images/project5.png";
import project6 from "../../assets/images/project6.png";
import project7 from "../../assets/images/project7.png";
import project8 from "../../assets/images/project8.png";
import project9 from "../../assets/images/project9.png";

const LEVELS = {
  beginner: {
    label: "Beginner",

    ring: "ring-emerald-400/70",
    shadow: "shadow-emerald-500/30",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/90 text-gray-900",
  },
  intermediate: {
    label: "Intermediate",
    ring: "ring-amber-400/70",
    shadow: "shadow-amber-500/30",
    dot: "bg-amber-400",
    badge: "bg-amber-500/90 text-gray-900",
  },
  advanced: {
    label: "Advanced",
    ring: "ring-violet-400/70",
    shadow: "shadow-violet-500/30",
    dot: "bg-violet-400",
    badge: "bg-violet-500/90 text-gray-900",
  },
};

const projects = [
  {
    name: "FinanceFlow - Project & Event Management",
    date: "2026",
    year: "2026",

    about: "A full-stack project and event management platform designed to centralize planning, team collaboration, task management, and financial operations in a single workspace. Users can create and manage projects or events, define budgets, organize departments and phases, assign members and tasks, track progress through milestones, and manage income and expenses. The platform also provides role-based collaboration, invitations, notifications, task submissions, document management, expense approvals, and event-specific features such as ticketing, stalls, and attendee management.",

    features: "Implemented Google and credential-based authentication with secure user sessions. Built project and event creation with configurable budgets, team invitations, role-based permissions, departments, phases, task assignments, milestones, deadlines, extensions, and progress tracking. Added notifications for important project activities and task updates. Implemented a centralized finance flow supporting income, expenses, approvals, payment tracking, sponsorships, investments, donations, grants, merchandise, stall income, and client payments. Event-specific functionality includes ticket types, ticket bookings, attendee management, check-ins, stalls, and hardware/resource management.",

    techStack: "Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma, REST API",

    stack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Next.js", "REST API", "Prisma"],
      database: ["PostgreSQL"],
    },

    goal: "Build a unified workspace where teams can plan, execute, collaborate on, and financially manage projects and events without relying on separate tools for task management, team coordination, and financial tracking.",

    image: project9,
    link: "[https://finance-flow-ten-iota.vercel.app/](https://finance-flow-ten-iota.vercel.app/)",
    videoUrl: "",
    level: "advanced",

    futureScope: "Advanced financial analytics, automated reports, payment gateway integrations, recurring expenses, richer event analytics, and AI-assisted project planning and financial insights.",
  },

  {
    name: "Leather Website",
    date: "May 2025",
    year: "2025",
    features: "Engineered dynamic multi-attribute product filtering and interactive shopping cart workflows for seamless online purchasing. Integrated OTP verification during user registration to ensure secure account creation. Developed a protected administrative panel accessible exclusively via secret-key authentication, providing centralized control over product catalogs, inventory updates, and order management.",
    techStack: "React.js, Express.js, MongoDB",
    stack: {
      frontend: ["React.js"],
      backend: ["Express.js"],
      database: ["MongoDB"],
    },
    goal: "An e-commerce leather goods store with dynamic product filtering and cart workflows, OTP-based user verification, and a protected admin interface with secret-key access for catalog and order management.",
    image: project8,
    link: "",
    videoUrl: "",
    level: "beginner",
    futureScope: "Better project improvements overall, plus proper file storage for product images.",
  },

  {
    name: "WeCaterers: Catering Reservation",
    date: "May 2025",
    year: "2025",
    features: "Architected a multi-role catering marketplace with role-specific interfaces and JWT/OTP-secured access controls for Users, Caterers, and Admins. Developed a comprehensive Caterer Management Dashboard enabling full CRUD operations on menus and order status pipelines (Pending to Delivered). Built a user ordering pipeline featuring multi-criteria filtering, cart checkout, real-time order tracking, cancellation requests, and a 5-star rating system. Modeled relational schemas with Prisma ORM and utilized SQL triggers to automatically compute average caterer ratings and dynamic price ranges.",
    techStack: "Next.js, Prisma ORM, PostgreSQL, Tailwind CSS",
    stack: {
      frontend: ["Next.js", "Tailwind CSS"],
      backend: ["Prisma ORM"],
      database: ["PostgreSQL"],
    },
    goal: "To deliver a comprehensive, end-to-end catering reservation platform connecting customers and service providers through real-time reservation workflows. The system streamlines browsing, booking, and order placement while empowering administrators with platform monitoring tools and role-specific dashboards.",
    image: project7,
    link: "[https://we-caterers-website.vercel.app/](https://we-caterers-website.vercel.app/)",
    videoUrl: "/project7.mp4",
    level: "intermediate",
    futureScope: "More detailed information in dashboards, addition of online payments, and integration of Google APIs.",
  },

  {
    name: "Docuvault: Personal E-Document Storage",
    date: "Apr 2025 – May 2025",
    year: "2025",
    features: "Integrated the Google Gemini API via prompt engineering to automatically generate professional documents (resumes, offer letters) in structured HTML, convertible to downloadable PDF or Word files. Built backend document compression algorithms that reduce storage footprint by up to 50%, optimizing the 100MB storage quota per user alongside live in-browser previews. Created a Base64-encoded URL generation system enabling users to share time-bound, expiring access links for individual files. Implemented JWT session authentication, simulated identity verification via dummy Aadhar linking, and comprehensive activity logging for all uploads, edits, and deletions.",
    techStack: "React.js (Vite), FastAPI, MongoDB Atlas",
    stack: {
      frontend: ["React.js (Vite)"],
      backend: ["FastAPI"],
      database: ["MongoDB Atlas"],
    },
    goal: "To create a secure electronic document management wallet featuring integrated AI generation and optimized storage workflows. The platform provides users with compressed storage, live in-browser previews, expiring share links, and Gemini-API-powered document generation that turns prompts into formatted downloads.",
    image: project6,
    link: "[https://docuvault-web-site.vercel.app/](https://docuvault-web-site.vercel.app/)",
    videoUrl: "/project6.mp4",
    level: "intermediate",
    futureScope: "Improved way of storing documents, with version history and per-user storage limits.",
  },

  {
    name: "Unite: Real-Time Chat Web Application",
    date: "Apr 2025",
    year: "2025",
    features: "Engineered a low-latency, full-duplex real-time messaging platform using Socket.IO and WebSockets to support bidirectional message delivery and live unread message counts. Developed room creation tools for hosting open public discovery channels or locked private rooms accessible strictly via exact room name matching. Implemented a robust social networking pipeline including OTP-based onboarding, friend request search and acceptance, and user profile management. Supported direct file sharing by storing images and documents in binary and converting to Base64, alongside dynamic Light/Dark mode switching and emoji support.",
    techStack: "React.js (Vite), Express.js, Socket.IO, PostgreSQL",
    stack: {
      frontend: ["React.js (Vite)"],
      backend: ["Express.js", "Socket.IO"],
      database: ["PostgreSQL"],
    },
    goal: "To develop a scalable and secure real-time chat application enabling OTP-based onboarding, personalized friend networks, and public/private chat rooms. The platform aims to provide a seamless communication experience enriched with real-time messaging, file sharing, and live updates powered by Socket.IO.",
    image: project5,
    link: "[https://unite-chatwebapp.netlify.app/](https://unite-chatwebapp.netlify.app/)",
    videoUrl: "/project5.mp4",
    level: "intermediate",
    futureScope: "Improved coding practices, including stronger test coverage and cleaner separation of client and server logic.",
  },

  {
    name: "Student Academic Tracker with Machine Learning",
    date: "June 2024 – Feb 2025",
    year: "2024",
    milestone: "Graduation Project",
    features: "Developed a responsive academic tracking platform with an interactive Material-UI (MUI) dashboard to display semester attendance, strong/weak subjects, and exam marks. Implemented an ensemble Voting Classifier combining Logistic Regression and Decision Trees to forecast daily attendance risks based on 5-week historical trends, teacher probability, and lecture timings. Built a Ridge Regression with Cross-Validation (RidgeCV) model (achieving an R2 score of 0.96) to predict future semester marks and grade ranges. Engineered a custom hybrid security pipeline using RSA and AES encryption with random character noise insertion and interval shuffling to protect sensitive student records.",
    techStack: "ReactJS, MUI, Express.js, Python Flask, Microsoft SQL Server",
    stack: {
      frontend: ["ReactJS", "MUI"],
      backend: ["Express.js"],
      database: ["Microsoft SQL Server"],
      ml: ["Python Flask"],
    },
    goal: "To bridge the communication gap between parents, students, and educators by delivering a secure, real-time academic monitoring platform. The system empowers parents with ML-driven attendance risk warnings and marks predictions, all safeguarded by a multi-layer encrypted API and SQL Server database.",
    image: project4,
    link: "[https://psat-parent-webapp.netlify.app/](https://psat-parent-webapp.netlify.app/)",
    videoUrl: "/project4.mp4",
    level: "advanced",
    futureScope: "Chat system socket integration. Performance improvements.",
  },

  {
    name: "Restaurant Website",
    date: "2022",
    year: "2022",
    features: "Implemented secure OTP-based user login and comprehensive profile management to maintain authenticated user sessions. Built a robust session-based cart management system capable of handling dynamic pricing, order item additions, and seamless bill processing. Created a real-time dynamic menu browsing experience with interactive highlight sections specifically designed for daily specials and promotions.",
    techStack: "ASP.NET, C#, MS SQL Server, HTML/CSS",
    stack: {
      frontend: ["HTML/CSS"],
      backend: ["ASP.NET", "C#"],
      database: ["MS SQL Server"],
    },
    goal: "Deliver a dynamic and responsive online food ordering platform that provides customers with a seamless digital dining experience, complete with secure session management and efficient order handling.",
    image: project1,
    link: "[http://foodrestaurant.somee.com/index.aspx](http://foodrestaurant.somee.com/index.aspx)",
    videoUrl: "/project1.mp4",
    level: "beginner",
    futureScope: "Could add real-time order tracking, payment gateway integration, and a loyalty/rewards system. Currently lacks automated testing and could benefit from migrating the cart logic to a more scalable state pattern.",
  },
];

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
    date: "",
    milestone: "",
    autoPlay: false,
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

  const openModal = (project, autoPlay = false) => {
    setModalContent({ ...project, autoPlay });
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

  const getOffset = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const visibleRange = 1;

  // Shared poster-card renderer for both desktop and mobile rollers.
  const renderCard = (project, index, { widthClass, aspectClass, spacing }) => {
    const offset = getOffset(index);
    const absOffset = Math.abs(offset);
    if (absOffset > visibleRange) return null;

    const isActive = offset === 0;
    const translateY = `calc(${offset} * ${spacing})`;
    const scale = isActive ? 1 : 0.8;
    const opacity = isActive ? 1 : 0.35;
    const blur = isActive ? 0 : 3;
    const zIndex = 20 - absOffset;
    const level = LEVELS[project.level] || LEVELS.beginner;

    return (
      <div
        key={project.name}
        onClick={() => !isActive && setActiveIndex(index)}
        className={`absolute top-1/2 left-1/2 ${widthClass} rounded-2xl overflow-hidden transition-all duration-500 ease-out ${isActive
          ? `ring-2 ${level.ring} shadow-2xl ${level.shadow}`
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
        <div className={`relative w-full ${aspectClass} bg-gray-900`}>
          <Image src={project.image} alt={project.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

          {isActive && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${level.badge}`}>
                {level.label}
              </span>
            </div>
          )}

          {isActive && (
            <div className="absolute top-3 right-3 bg-gray-900/70 backdrop-blur-md border border-gray-600/50 text-gray-100 text-[10px] font-bold px-2.5 py-1 rounded-full">
              {project.year}
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
              <div className="flex items-center justify-between gap-2 mt-2.5">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.split(",").slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                {/* Mobile-only quick actions (desktop uses the right panel instead) */}
                <div className="flex items-center gap-1.5 md:hidden shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(project);
                    }}
                    aria-label="View project details"
                    className="bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-200 hover:text-cyan-300 p-1.5 rounded-full transition-all duration-300 cursor-pointer"
                  >
                    <Eye size={14} />
                  </button>
                  {project.link !== "" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Visit project"
                      className="bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-200 hover:text-cyan-300 p-1.5 rounded-full transition-all duration-300 cursor-pointer"
                    >
                      <FiExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

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
        date={modalContent.date}
        milestone={modalContent.milestone}
        startWithVideo={modalContent.autoPlay}
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
        <div className="w-full max-w-3xl mx-auto mb-4 sm:mb-5 flex flex-col gap-2.5">
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

        {/* ---------- Proficiency color key ---------- */}
        <div className="w-full max-w-7xl mx-auto mb-3 sm:mb-5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 font-semibold">
            Proficiency
          </span>
          {Object.values(LEVELS).map((level) => (
            <span key={level.label} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-300">
              <span className={`w-2 h-2 rounded-full ${level.dot}`} />
              {level.label}
            </span>
          ))}
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
              <div className="relative h-[clamp(420px,68dvh,720px)] flex flex-col items-center justify-center">
                <button
                  onClick={goPrev}
                  aria-label="Previous project"
                  className="absolute top-1 z-30 bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 p-2 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>

                <div className="relative w-full h-full overflow-hidden" style={{ perspective: "1200px" }}>
                  {filteredProjects.map((project, index) =>
                    renderCard(project, index, {
                      widthClass: "w-[min(320px,80vw)] sm:w-[min(380px,46vw)] md:w-[min(340px,36vw)] lg:w-[450px]",
                      aspectClass: "aspect-[16/10]",
                      spacing: "clamp(70px, 14dvh, 140px)",
                    })
                  )}
                </div>

                <button
                  onClick={goNext}
                  aria-label="Next project"
                  className="absolute bottom-1 z-30 bg-gray-900/70 backdrop-blur-md border border-gray-600/50 hover:bg-cyan-500/20 hover:border-cyan-400 text-gray-300 hover:text-cyan-300 p-2 rounded-full transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              <div className="h-[clamp(420px,68dvh,720px)] overflow-y-auto project-scrolling pr-1">
                {activeProject && (
                  <ProjectDetailContent
                    key={activeProject.name}
                    project={activeProject}
                    variant="panel"
                    onPlayVideo={() => openModal(activeProject, true)}
                  />
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
                {filteredProjects.map((project, index) =>
                  renderCard(project, index, {
                    widthClass: "w-[82vw] xs:w-[78vw] sm:w-[380px]",
                    aspectClass: "aspect-[16/10]",
                    spacing: "clamp(60px, 13dvh, 110px)",
                  })
                )}
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
