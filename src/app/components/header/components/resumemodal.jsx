function ResumeModal({ onClose }) {
    return (
      <div
        className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300 h-[90vh]"
        onClick={onClose} // Close modal when clicking outside
      >
        <div
          className="w-[80vw] md:w-[60vw] h-[90vh] md:h-[80vh] p-6 rounded-xl shadow-lg animate-slide-in-top"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onClose} // Close modal when clicking 'X'
              className="text-xl font-bold text-cyan-500 hover:text-cyan-600 transition duration-200 cursor-pointer"
            >
              X
            </button>
          </div>
  
          <div className="overflow-y-auto h-[100%]">
            <iframe
              src="/resume.pdf"
              width="100%"
              height="100%"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }
  
  export default ResumeModal;
  