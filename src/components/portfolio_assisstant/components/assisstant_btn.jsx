'use client'
import { MdSmartToy } from 'react-icons/md';

const AssistantButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Ask about my work"
      title="Ask about my work"
      className="
        fixed
        bottom-6
        right-6
        z-50
        cursor-pointer
        group
        flex
        items-center
        justify-center
        w-14
        h-14
        rounded-full
        bg-gradient-to-br
        from-cyan-500
        to-blue-600
        text-white
        shadow-lg
        shadow-cyan-500/30
        transition-all
        duration-300
        hover:scale-110
        hover:shadow-xl
        hover:shadow-cyan-400/50
        focus:outline-none
        focus:ring-4
        focus:ring-cyan-300
      "
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-cyan-400/40 animate-ping group-hover:bg-cyan-300/50"
      />
      <MdSmartToy size={28} className="relative z-10" />
    </button>
  );
};

export default AssistantButton;
