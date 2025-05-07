import FloatingHeader from "./components/header/header";
import FloatingAbout from "./components/about/about";

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-y-auto min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FloatingHeader />
      <FloatingAbout />
    </div>
  );
}

