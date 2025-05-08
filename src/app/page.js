import FloatingHeader from "./components/header/header";
import FloatingAbout from "./components/about/about";
import FloatingProjects from "./components/projects/projects";
import FloatingAchievements from "./components/achievements/achievements";
import Footer from "./components/footer/footer";
export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center overflow-y-auto p-4 gap-y-4">
      <FloatingHeader />
      <FloatingAbout />
      <FloatingProjects/>
      <FloatingAchievements/>
    </div>
    <Footer/>
    </>
  );
}

