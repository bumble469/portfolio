"use client";
import React, { useState, useEffect, useRef } from "react";
import myimage from '../../assets/images/myimage.jpg';
import myimage1 from '../../assets/images/myimage1.jpg';
import educationImage from '../../assets/images/education_image.jpeg';
import drawing1 from '../../assets/images/drawing1.jpg';
import drawing2 from '../../assets/images/drawing2.jpg';
import drawing3 from '../../assets/images/drawing3.jpg';
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Sparkles, UserRound, Code2, Briefcase,
  School, BookOpenCheck, Award, Network, KeyRound, MapPin, CalendarDays, Database
} from 'lucide-react';
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
  SiExpress, SiNodedotjs, SiFastapi, SiNextdotjs, SiVuetify, SiPython,
  SiGit, SiJsonwebtokens, SiSocketdotio, SiMysql,
  SiMongodb, SiPostgresql
} from 'react-icons/si';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/* ─────────────────────────── data ─────────────────────────── */

const TABS = ['education', 'skills', 'interests']

const educationTimeline = [
  {
    type: 'education',
    level: 'PG',
    levelFull: 'Post Graduation',
    board: 'MCA',
    boardColor: '#22d3ee',
    icon: <Award size={20} />,
    title: 'Master of Computer Applications',
    place: 'Sardar Patel Institute of Technology',
    period: '2026 – ',
    periodLabel: 'Proceeding',
    badge: 'Pursuing',
    badgeGradient: 'from-cyan-500 to-blue-600',
    percent: null,
    highlights: ['', 'MAH MCA CET 2026 Qualified'],
  },
  {
    type: 'gap',
    title: 'Employment',
    subtitle: 'MAH MCA CET 2026 Preparation',
    place: 'Worked while preparing for the MCA entrance exam',
    period: '2025 – 2026',
  },
  {
    type: 'education',
    level: 'Graduation',
    levelFull: 'Under Graduation',
    board: 'B.Sc. CS',
    boardColor: '#a78bfa',
    icon: <GraduationCap size={20} />,
    title: 'Bachelor of Computer Science',
    place: 'Kishinchand Chellaram College',
    period: '2022 – 2025',
    periodLabel: 'Completed',
    badge: 'Graduate',
    badgeGradient: 'from-violet-500 to-purple-600',
    percent: 100,
    statLabel: 'CGPA',
    statValue: '10.0',
    highlights: ['Final Year Project Lead', 'React · Node.js · Flask'],
  },
  {
    type: 'education',
    level: '12th',
    levelFull: 'Higher Secondary',
    board: 'HSC',
    boardColor: '#34d399',
    icon: <BookOpenCheck size={20} />,
    title: 'Higher Secondary Certificate',
    place: "St. Xavier's College",
    period: '2020 – 2022',
    periodLabel: 'Completed',
    percent: 79.5,
    statLabel: 'Percentage',
    statValue: '79.5%',
    highlights: ['Maharashtra HSC Board', 'Science Stream'],
  },
  {
    type: 'education',
    level: '10th',
    levelFull: 'Secondary School',
    board: 'ICSE',
    boardColor: '#fb923c',
    icon: <School size={20} />,
    title: 'Indian Certificate of Secondary Education',
    place: 'Christ Church School',
    period: '2020',
    periodLabel: 'Completed',
    percent: 94.6,
    statLabel: 'Percentage',
    statValue: '94.6%',
    highlights: ['CISCE Board', 'Distinction'],
  },
];

/* Skills split by domain per user's breakdown */
const skillCategories = [
  {
    title: 'Frontend',
    accent: '#38BDF8',
    gradient: 'from-sky-500/10 to-blue-600/5',
    skills: [
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E44D26' },
      { name: 'CSS3', icon: <SiCss3 />, color: '#264DE4' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F0DB4F' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'React.js', icon: <SiReact />, color: '#61DBFB' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#FFFFFF' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38BDF8' },
      { name: 'Vuetify', icon: <SiVuetify />, color: '#1867C0' },
    ],
  },
  {
    title: 'Backend',
    accent: '#34d399',
    gradient: 'from-emerald-500/10 to-teal-600/5',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#3C873A' },
      { name: 'Express.js', icon: <SiExpress />, color: '#FFFFFF' },
      { name: 'FastAPI', icon: <SiFastapi />, color: '#009688' },
    ],
  },
  {
    title: 'Programming',
    accent: '#fbbf24',
    gradient: 'from-yellow-500/10 to-amber-600/5',
    skills: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    ],
  },
  {
    title: 'Tools & APIs',
    accent: '#a78bfa',
    gradient: 'from-purple-500/10 to-violet-600/5',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#F1502F' },
      { name: 'REST API', icon: <Network size={22} />, color: '#22D3EE' },
      { name: 'JWT', icon: <SiJsonwebtokens />, color: '#FB015B' },
      { name: 'OAuth', icon: <KeyRound size={22} />, color: '#22D3EE' },
      { name: 'Socket.IO', icon: <SiSocketdotio />, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Databases',
    accent: '#fb7185',
    gradient: 'from-rose-500/10 to-pink-600/5',
    skills: [
      { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
      { name: 'MS SQL', icon: <Database size={22} />, color: '#CC2927' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#4DB33D' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
    ],
  },
];

const drawings = [drawing1, drawing2, drawing3];

/* ── Per-tab left-column content ── */
const leftContent = {
  education: {
    image: educationImage,
    alt: 'Education',
    borderColor: 'border-cyan-500/30',
    shadowColor: 'shadow-cyan-500/10',
    glowFrom: 'from-cyan-500/20',
    glowTo: 'to-blue-600/10',
    text: (
      <>
        <p>
          My journey into technology began during HSC, when I chose IT as an additional subject and was introduced to the basics of <span className="text-cyan-400 font-semibold">HTML, CSS, and JavaScript</span>. That small introduction sparked my interest in the field and eventually led me to pursue Computer Science at KC College.
        </p>
        <p>
          I have often been asked, “Why not engineering?” My belief has always been that a degree provides direction, but growth ultimately comes from how much you choose to learn, explore, and improve yourself. Throughout college, I performed well academically while using my free time to explore different areas and understand what I truly enjoyed. As my interest in development grew, I often took responsibility for the website projects in my presentation group.
        </p>
        <p>
          After graduation, I decided to pursue a master’s degree and began preparing for the MAH MCA CET. Securing a strong score, I started my MCA at <span className="text-cyan-400 font-semibold">Sardar Patel Institute of Technology</span>. I am now looking forward to learning, building, and discovering where this journey takes me next.
        </p>
      </>
    ),
  },
  skills: {
    image: myimage,
    alt: 'Alisher Sayed',
    borderColor: 'border-violet-500/30',
    shadowColor: 'shadow-violet-500/10',
    glowFrom: 'from-violet-500/20',
    glowTo: 'to-blue-600/10',
    text: (
      <>
        <p>
          I began with <span className="text-violet-400 font-semibold">HTML, CSS, and JavaScript</span>, which led me to explore <span className="text-violet-400 font-semibold">React, Express, and SQL Server</span> during my final-year project. Along the way, I explored Python for ML and statistical models and worked with MongoDB and FastAPI across different projects.
        </p>
        <p>
          As I gained experience, I moved towards <span className="text-violet-400 font-semibold">Next.js and Prisma</span> to understand modern development patterns and focus on cleaner, more efficient solutions. During my 6-month work experience, I worked with clients, learned Vue, and gained practical experience with authentication, PostgreSQL, and real-time events.
        </p>
        <p>
          Today, my primary development stack includes <span className="text-violet-400 font-semibold">React, Next.js, TypeScript, Express, REST APIs, PostgreSQL, and Tailwind CSS</span>, while I continue exploring better ways to build efficient and maintainable applications.
        </p>
      </>
    ),
  },
  interests: {
    image: myimage1,
    alt: 'Alisher Sayed — Interests',
    borderColor: 'border-emerald-500/30',
    shadowColor: 'shadow-emerald-500/10',
    glowFrom: 'from-emerald-500/20',
    glowTo: 'to-teal-600/10',
    text: (
      <>
        Beyond code I find joy in <span className="text-emerald-400 font-semibold">sketching & digital art</span>,
        turning rough concepts into clean visuals. I enjoy blending creative thinking with
        engineering — whether that&apos;s designing a UI from scratch, building AI-integrated
        tools, or collaborating with a team to ship something meaningful.
      </>
    ),
  },
};

const fadeUp = (fadeIn) =>
  `${fadeIn ? 'opacity-100 translate-x-0 duration-1000' : 'opacity-0 -translate-x-10 duration-1000'} transition-all duration-500`;

/* ─────────────── Animated circular progress stat ─────────────── */
const CircularStat = ({ percent, statValue, statLabel, color = '#22d3ee' }) => {
  const [progress, setProgress] = useState(0);
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const isUnknown = percent == null;
  const offset = isUnknown
    ? circumference                                          // empty ring
    : circumference - (Math.min(progress, 100) / 100) * circumference;
  const gradId = `cg-${(statLabel ?? 'unknown').replace(/\s/g, '')}`;

  useEffect(() => {
    if (!isUnknown) {
      const t = setTimeout(() => setProgress(percent), 300);
      return () => clearTimeout(t);
    }
  }, [percent, isUnknown]);

  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <div className="relative w-16 h-16 animate-[float_3s_ease-in-out_infinite]">
        <svg viewBox="0 0 60 60" className="w-16 h-16 -rotate-90">
          {/* Track ring */}
          <circle
            cx="30" cy="30" r={radius} fill="none"
            stroke={isUnknown ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}
            strokeWidth="5"
            strokeDasharray={isUnknown ? '6 5' : undefined}
          />
          {/* Progress ring — hidden when unknown */}
          {!isUnknown && (
            <circle
              cx="30" cy="30" r={radius} fill="none"
              stroke={`url(#${gradId})`} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
            />
          )}
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {isUnknown ? (
            <span className="text-lg font-bold animate-pulse" style={{ color }}>
              ?
            </span>
          ) : (
            <span className="text-[10px] font-bold text-white leading-none">{statValue}</span>
          )}
        </div>
      </div>
      <span className="text-[9px] text-gray-500 whitespace-nowrap tracking-wide uppercase">
        {isUnknown ? 'Pursuing' : statLabel}
      </span>
    </div>
  );
};

/* ─────────────── Board badge pill ─────────────── */
const BoardBadge = ({ label, color }) => (
  <span
    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border"
    style={{ color, borderColor: color + '55', background: color + '15' }}
  >
    {label}
  </span>
);

/* ─────────────── Single education card ─────────────── */
const EducationCard = ({ item }) => {
  const isPursuing = item.badge === 'Pursuing';
  return (
    <div
      className={`relative overflow-hidden rounded-xl border transition-all duration-500 ease-in-out hover:scale-[1.02] ${isPursuing
        ? 'bg-gradient-to-br from-cyan-900/30 via-gray-800/90 to-gray-900 border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/20'
        : 'bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700/50 hover:shadow-md hover:shadow-blue-500/10'
        }`}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-25"
        style={{ background: item.boardColor }}
      />
      {/* Top colour accent strip */}
      <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${item.boardColor}cc, transparent 70%)` }} />

      <div className="p-4">
        {/* Main row */}
        <div className="flex items-start gap-3">
          {/* Icon + level */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center border"
              style={{ background: item.boardColor + '15', borderColor: item.boardColor + '50', color: item.boardColor }}
            >
              {item.icon}
            </div>
            <span className="text-[8px] uppercase tracking-widest text-gray-600 whitespace-nowrap font-bold">
              {item.level}
            </span>
          </div>

          {/* Text info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <BoardBadge label={item.board} color={item.boardColor} />
              {item.badge && (
                <span className={`inline-flex items-center px-2 py-0.5 text-[9px] font-semibold tracking-widest uppercase rounded-full text-white bg-gradient-to-r ${item.badgeGradient}`}>
                  {item.badge}
                </span>
              )}
            </div>
            <h4 className="text-white font-semibold text-sm leading-snug">{item.title}</h4>
            <div className="flex items-start gap-1 mt-0.5">
              <MapPin size={10} className="text-gray-500 shrink-0 mt-0.5" />
              <p className="text-gray-400 text-xs break-words">{item.place}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <CalendarDays size={10} className="text-gray-500 shrink-0" />
              <span className="text-gray-500 text-[11px]">
                {item.period}
                {item.periodLabel && (
                  <span
                    className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide"
                    style={{ color: item.boardColor, background: item.boardColor + '18' }}
                  >
                    {item.periodLabel}
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Circular stat — always shown; shows ? when no data */}
          <CircularStat
            percent={item.percent}
            statValue={item.statValue}
            statLabel={item.statLabel}
            color={item.boardColor}
          />
        </div>

        {/* Highlights */}
        {item.highlights?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700/40 flex flex-wrap gap-1.5">
            {item.highlights.map((h) => (
              <span
                key={h}
                className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-800/60 border border-gray-700/40 px-2 py-0.5 rounded-full"
              >
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: item.boardColor }} />
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────── main component ─────────────────────────── */

const FloatingAbout = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [activeTab, setActiveTab] = useState('education');
  const aboutRef = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && TABS.includes(tabParam)) {
      setActiveTab(tabParam);
      const el = document.getElementById('about');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.scrollBy({ top: 80, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFadeIn(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => { if (aboutRef.current) observer.unobserve(aboutRef.current); };
  }, []);

  return (
    <div
      id="about"
      ref={aboutRef}
      className="w-full sm:mt-8 md:mt-12 max-w-7xl mx-auto px-4 sm:px-6 py-4 border-2 border-gray-800/50 bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg z-50 flex flex-col items-center justify-between"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
      `}</style>

      <h2 className={`text-2xl sm:text-3xl mt-4 mb-6 text-center text-white font-bold tracking-tight flex items-center justify-center gap-2 ${fadeUp(fadeIn)}`}>
        <UserRound className="text-cyan-400" size={24} />
        About <span className="text-cyan-400">Me</span>
      </h2>

      {/* Tab switcher */}
      <div className={`flex items-center gap-2 mb-8 bg-gray-800/60 border border-gray-700/50 rounded-full p-1 w-fit mx-auto ${fadeUp(fadeIn)}`}>
        {[
          { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
          { id: 'skills', label: 'Skills', icon: <Code2 size={16} /> },
          { id: 'interests', label: 'Interests', icon: <Sparkles size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="about-tab-pill"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full -z-10"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row w-full gap-6 mt-2">
        {/* ── Left column — changes with active tab ── */}
        <div className={`w-full md:w-5/12 flex flex-col items-center gap-5 ${fadeUp(fadeIn)}`}>
          <AnimatePresence mode="wait">
            {(() => {
              const lc = leftContent[activeTab];
              return (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="w-full block"
                >
                  <div className="text-gray-200 text-sm md:text-base leading-relaxed text-justify space-y-4">
                    <div
                      className={`relative w-32 h-32 sm:w-48 sm:h-48 float-left mr-5 mb-2 rounded-2xl overflow-hidden border ${lc.borderColor} shadow-lg ${lc.shadowColor}`}
                    >
                      <Image src={lc.image} alt={lc.alt} fill className="object-cover" />
                    </div>
                    {lc.text}
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* ── Right column ── */}
        <div className={`w-full md:w-7/12 flex flex-col ${fadeUp(fadeIn)}`}>
          {/* Tab switcher moved to top */}

          {/* Tab content */}
          <div className="relative overflow-hidden min-h-[360px]">
            <AnimatePresence mode="wait">

              {/* ──── Education ──── */}
              {activeTab === 'education' && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                >
                  <div className="relative pl-8">
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/70 via-cyan-500/30 to-transparent" />
                    <div className="space-y-4">
                      {educationTimeline.map((item, i) => (
                        <div key={i} className="relative">
                          <span
                            className={`absolute -left-8 top-5 w-3 h-3 rounded-full border-2 ${item.type === 'gap'
                              ? 'bg-gray-900 border-gray-500'
                              : item.badge === 'Pursuing'
                                ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.6)]'
                                : 'bg-cyan-500/80 border-cyan-400/60'
                              }`}
                          />
                          {item.type === 'gap' ? (
                            <div className="border border-dashed border-gray-600/60 rounded-lg px-4 py-3 flex items-center gap-3 hover:border-cyan-500/40 transition-colors duration-300">
                              <Briefcase className="text-gray-400 shrink-0" size={18} />
                              <div>
                                <p className="text-gray-300 text-sm font-medium">
                                  {item.title} <span className="text-gray-500">+</span> {item.subtitle}
                                </p>
                                <p className="text-gray-500 text-xs">{item.place}</p>
                              </div>
                              <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400 border border-gray-600/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {item.period}
                              </span>
                            </div>
                          ) : (
                            <EducationCard item={item} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ──── Skills ──── */}
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="space-y-5"
                >
                  {skillCategories.map((cat) => (
                    <div key={cat.title}>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.accent }} />
                        <h4 className="text-[11px] uppercase tracking-widest font-bold" style={{ color: cat.accent }}>
                          {cat.title}
                        </h4>
                        <div className="flex-1 h-px bg-gray-700/50" />
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                        {cat.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className={`group flex flex-col items-center justify-center gap-2 rounded-xl py-3.5 px-2 border border-gray-700/50 bg-gradient-to-br ${cat.gradient} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default`}
                          >
                            <span className="text-2xl drop-shadow-sm" style={{ color: skill.color }}>
                              {skill.icon}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-gray-300 text-center leading-tight group-hover:text-white transition-colors duration-200">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ──── Interests ──── */}
              {activeTab === 'interests' && (
                <motion.div
                  key="interests"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-3 gap-3">
                    {drawings.map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-700/50 hover:border-cyan-500/40 hover:scale-[1.03] transition-all duration-300 shadow-md"
                      >
                        <Image
                          src={img}
                          alt={`Sketch ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 200px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <Suspense fallback={null}>
      <FloatingAbout />
    </Suspense>
  );
}
