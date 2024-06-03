import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FullScreenModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      y: "100vh",
      // opacity: 0,
    },
    visible: {
      y: 0,
      // opacity: 1,
      transition: { type: "tween", duration: 0.25, ease: "linear" },
    },
    exit: {
      y: "100vh",
      // opacity: 0,
      transition: { type: "tween", duration: 0.25, ease: "linear" },
    },
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal if the user clicks directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // stop behind scrolling
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex bg-gray-900 bg-opacity-50 z-50 pt-12"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-white/80 z-10 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <motion.div
            className="bg-[#F2F5FB] rounded-tl-lg rounded-tr-lg shadow-lg w-full relative z-51 h-[calc(100vh-3rem)] md:p-0 p-4 overflow-auto"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="">
              {/* Adjusted height to account for fixed button */}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenModal;
