import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import { featureSpecificPlan } from "../../helpers/consts";
import { ReactComponent as NegativeIcon } from "../../assets/icons/negative.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import clsx from "clsx";
import Selectable from "../../components/Selectable";

const FeatureSpecificPlanModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  // buying data
  const [formData, setFormData] = useState({
    assistant: 0,
    draft: 0,
    analysis: 0,
    entity: 0,
  });

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
            className="bg-[#F2F5FB] rounded-lg shadow-lg md:p-8 w-full relative z-51"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="overflow-auto h-[calc(100vh-6rem)] p-8">
              {" "}
              {/* Adjusted height to account for fixed button */}
              <div className="md:h-full h-auto items-center content-center text-center flex flex-col gap-[3rem] justify-center">
                <div className="grid gap-4">
                  <h2 className="font-outfit text-[2rem] font-[700] leading-[110%]">
                    Feature specific plan
                  </h2>
                  <p className="text-[1rem] font-[500] text-[#666] leading-[150%]">
                    Select features as per your needs
                  </p>
                </div>

                <div className="flex flex-row flex-wrap gap-4">
                  {featureSpecificPlan.map((data) => (
                    <Card
                      key={data.title}
                      data={data}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  ))}
                </div>

                {/* Desktop */}
                <Button className="text-lg font-semibold items-center gap-0 md:block hidden">
                  <span className="text-lg font-bold">$90</span>
                  <span className="border-l border-white h-7 mx-3 opacity-60"></span>
                  <span className="text-lg font-medium">
                    Continue to checkout
                  </span>
                </Button>
              </div>
            </div>
            {/* Mobile */}
            <Button className="text-lg font-semibold items-center gap-0 md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 px-[1.75rem] py-[1.125rem] leading-[1.125rem] md:w-auto w-[90vw] z-60">
              <span className="text-[1rem] font-[700]">$90</span>
              <span className="border-l border-white h-[0.875rem] mx-3 opacity-[0.6]"></span>
              <span className="text-[1rem] font-[500]">
                Continue to checkout
              </span>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function Card({
  data: { id, title, description, price, icon, priceDesc, input_label },
  formData,
  setFormData,
}: {
  data: {
    id: string;
    title: string;
    description: string;
    price: string;
    icon: React.ReactNode;
    priceDesc: string;
    input_label: string;
  };
  formData: Record<string, number>;
  setFormData: any;
}) {
  // if formData is not 0 then it is selected
  const isSelected = formData[id.toLowerCase()] > 0;

  const handleIncrement = () => {
    setFormData((prev: any) => {
      const count = prev[id.toLowerCase()] || 0;
      return { ...prev, [id.toLowerCase()]: count + 1 };
    });
  };

  // decreament only if the count is greater than 0
  const handleDecrement = () => {
    setFormData((prev: any) => {
      const count = prev[id.toLowerCase()] || 0;
      if (count > 0) {
        return { ...prev, [id.toLowerCase()]: count - 1 };
      }
      return prev;
    });
  };

  return (
    <button
      className={clsx(
        "p-5 bg-white rounded-[8px] flex-1 flex-grow text-start md:min-w-[20%] min-w-full min-h-[330px] transition-all relative",
        isSelected
          ? "border-[2px] border-solid border-[#80A48B]"
          : "border-[2px] border-transparent"
      )}
      onClick={
        // if the card is 0 then select it
        () => {
          if (formData[id.toLowerCase()] === 0) {
            setFormData((prev: any) => {
              return { ...prev, [id.toLowerCase()]: 1 };
            });
          }
        }
      }
    >
      <div
        className={clsx(
          "right-3 top-3 transition-all",
          isSelected ? "absolute opacity-1" : "hidden opacity-0"
        )}
      >
        <Selectable
          // readonly
          checked={formData[id.toLowerCase()] > 0}
          onChange={(checked) => {
            if (!checked) {
              setFormData((prev: any) => {
                return { ...prev, [id.toLowerCase()]: 0 };
              });
            }
          }}
        />
      </div>

      <div className="h-full justify-between flex flex-col">
        <div className="grid gap-4">
          {icon}
          <div className="gap-2 grid">
            <span className="font-outfit text-[1rem] font-[500] leading-[110%]">
              {title}
            </span>
            <p className="max-w-[250px] tracking-[-0.28px] leading-[150%] text-[0.875rem] font-[500] text-[#888]">
              {description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-1">
            <span className="font-[500] text-[1rem]">${price}</span>
            <span className="font-italic text-[0.875rem] leading-[150%] font-[500] text-[#666]">
              {priceDesc}
            </span>
          </div>
          <div className="border-[1px] border-solid border-[#DDD] rounded-[5px] px-2 py-1.5 flex flex-row justify-between items-center">
            <span className="text-[#666] text-[0.75rem] font-[500]">
              {input_label}
            </span>
            <div className="flex flex-row gap-0.5">
              <button onClick={handleDecrement}>
                <NegativeIcon />
              </button>
              <input
                className="text-[#666] text-[0.875rem] font-[500] border-[1px] border-solid border-[#D7D7D7] rounded-[4px] font-[700] w-[40px] text-center items-center"
                value={formData[id.toLowerCase()] || 0}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    [id.toLowerCase()]: parseInt(e.target.value),
                  })
                }
              />

              <button onClick={handleIncrement}>
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default FeatureSpecificPlanModal;
