'use client'
import { BsChatDots  } from 'react-icons/bs';
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
        flex
        items-center
        justify-center
        w-12
        h-12
        rounded-full
        bg-cyan-500
        text-white
        shadow-lg
        transition
        duration-300
        hover:bg-cyan-600
        hover:scale-105
        focus:outline-none
        focus:ring-4
        focus:ring-cyan-300
      "
    >
      <MdSmartToy size={26} />
    </button>
  );
};

export default AssistantButton;