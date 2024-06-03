import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import { featureSpecificPlan } from "../../helpers/consts";
import { ReactComponent as NegativeIcon } from "../../assets/icons/negative.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import clsx from "clsx";
import Selectable from "../../components/Selectable";
import FullScreenModal from "../../components/FullScreenModal";

const FeatureSpecificPlanModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  // buying data
  const [formData, setFormData] = useState({
    assistant: 0,
    draft: 0,
    analysis: 0,
    entity: 0,
  });

  // stop behind scrolling
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <FullScreenModal isOpen={isOpen} onClose={onClose}>
      {/* Adjusted height to account for fixed button */}
      <div className="md:h-[calc(100vh-3rem)] py-[2rem]  h-auto items-center content-center text-center flex flex-col gap-[3rem] justify-center">
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
        <Button className="items-center gap-0 md:block hidden">
          <span className="text-[1rem] font-[700] tracking-[0.32px]">$90</span>
          <span className="border-l border-white h-7 mx-3 opacity-60"></span>
          <span className="text-[1rem] font-[500] tracking-[0.32px]">
            Continue to checkout
          </span>
        </Button>
      </div>
      {/* Mobile */}
      <Button className="text-lg font-semibold items-center gap-0 md:hidden sticky bottom-0 px-[1.75rem] py-[1.125rem] leading-[1.125rem] md:w-auto w-[90vw] z-60">
        <span className="text-[1rem] font-[700] tracking-[0.32px]">$90</span>
        <span className="border-l border-white h-4 mx-3 opacity-60"></span>
        <span className="text-[1rem] font-[500] tracking-[0.32px]">
          Continue to checkout
        </span>
      </Button>
    </FullScreenModal>
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
          "right-3 top-3 transition-all absolute",
          isSelected ? "absolute opacity-1" : ""
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
