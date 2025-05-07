import FloatingHeader from "./components/header/header";
import FloatingAbout from "./components/about/about";
import FloatingProjects from "./components/projects/projects";
import FloatingAchievements from "./components/achievements/achievements";
export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-y-auto min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FloatingHeader />
      <FloatingAbout />
      <FloatingProjects/>
      <FloatingAchievements/>
    </div>
  );
}

