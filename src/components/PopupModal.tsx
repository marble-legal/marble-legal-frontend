import { motion } from "framer-motion";
import { useEffect } from "react";

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.1 } },
  transition: { duration: 0.3 },
};

export function PopupModal({
  onClose,
  children,
  contentClassName = "",
  overlayClassName = "",
  exit = { opacity: 0, transition: { delay: 0.1 } },
  shouldStopPropagation = true,
}: {
  onClose?: () => void;
  children: React.ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
  exit?: any;
  shouldStopPropagation?: boolean;
}) {
  const handleClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose && onClose();
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  return (
    <>
      <motion.div
        className={`fixed z-[9] top-0 left-0 right-0 bottom-0 bg-black/40 h-[100vh] ${overlayClassName}`}
        onClick={handleClose}
        {...{ ...framerSidebarBackground, exit }}
      />
      <div className="fixed z-[10] top-0 left-0 right-0 bottom-0 h-[100vh] flex flex-col justify-center">
        <motion.div
          className={`p-8 bg-white rounded-2xl flex-col gap-6 flex ${contentClassName}`}
          {...framerSidebarBackground}
          onClick={(e) => {
            if (shouldStopPropagation) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
