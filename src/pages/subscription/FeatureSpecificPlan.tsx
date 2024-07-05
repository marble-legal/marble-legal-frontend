import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/Button";
import {
  PlanType,
  SubscriptionTier,
  featureSpecificPlan,
} from "../../helpers/consts";
import { ReactComponent as NegativeIcon } from "../../assets/icons/negative.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import clsx from "clsx";
import Selectable from "../../components/Selectable";
import FullScreenModal from "../../components/FullScreenModal";
import useResponsive from "../../helpers/useResponsive";

// aiAssistant,
// contractAnalysis,
// contractDrafting,
// businessEntity,
// attorneyReview,
const FeatureSpecificPlanModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  handleGetStripeSession: any;
  isLoading: boolean;
}> = ({ isOpen, onClose, handleGetStripeSession, isLoading }) => {
  // buying data
  const [formData, setFormData] = useState({
    aiAssistant: 0,
    contractDrafting: 0,
    contractAnalysis: 0,
    businessEntity: 0,
    attorneyReview: 0,
  });

  const handleCheckout = async () => {
    await handleGetStripeSession({
      planType: PlanType.yearly,
      tier: SubscriptionTier.Customised,
      ...formData,
    });
  };

  // stop behind scrolling
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (
      formData.contractDrafting === 0 &&
      formData.contractAnalysis === 0 &&
      formData.attorneyReview !== 0
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        attorneyReview: 0,
      }));
    }
  }, [formData.contractDrafting, formData.contractAnalysis]);

  const total = useMemo(() => {
    let total = 0;

    featureSpecificPlan.forEach((data) => {
      if (formData[data.id] > 0) {
        total += formData[data.id] * parseFloat(data.price);
      }
    });

    return total;
  }, [formData, featureSpecificPlan]);

  console.log(formData);
  return (
    <FullScreenModal isOpen={isOpen} onClose={onClose}>
      {/* Adjusted height to account for fixed button */}
      <div className="md:h-[calc(100dvh-3rem)] justify-center py-[2rem]  h-auto items-center text-center flex flex-col gap-[3rem] overflow-auto">
        <div className="grid gap-4">
          <h2 className="font-outfit text-[2rem] font-[700] leading-[110%]">
            Feature specific plan
          </h2>
          <p className="text-[1rem] font-[500] text-[#666] leading-[150%]">
            Select features as per your needs
          </p>
        </div>

        <div className="flex flex-row flex-wrap gap-4 md:px-28 px-4">
          {featureSpecificPlan.map((data) => {
            return (
              <Card
                key={data.title}
                data={data}
                formData={formData}
                setFormData={setFormData}
                disabled={
                  data.id === "attorneyReview" &&
                  formData.contractDrafting === 0 &&
                  formData.contractAnalysis === 0 &&
                  formData.businessEntity === 0
                }
              />
            );
          })}
        </div>

        {/* Desktop */}
        <Button
          onClick={handleCheckout}
          disabled={
            formData.aiAssistant === 0 &&
            formData.businessEntity === 0 &&
            formData.contractAnalysis === 0 &&
            formData.contractDrafting === 0
          }
          className="items-center gap-0 md:block hidden mb-2"
        >
          <span className="text-[1rem] font-[700] tracking-[0.32px]">
            ${total}
          </span>
          <span className="border-l border-white h-7 mx-3 opacity-60"></span>
          <span className="text-[1rem] font-[500] tracking-[0.32px]">
            Continue to checkout
          </span>
        </Button>
        {/* <div className="md:p-5" /> */}
      </div>
      {/* Mobile */}
      <Button
        onClick={handleCheckout}
        disabled={
          formData.aiAssistant === 0 &&
          formData.businessEntity === 0 &&
          formData.contractAnalysis === 0 &&
          formData.contractDrafting === 0
        }
        className="text-lg  mb-2 font-semibold items-center gap-0 md:hidden sticky bottom-0 px-[1.75rem] py-[1.125rem] leading-[1.125rem] md:w-auto w-[90vw] z-60"
      >
        <span className="text-[1rem] font-[700] tracking-[0.32px]">
          ${total}
        </span>
        <span className="border-l border-white h-4 mx-3 opacity-60"></span>
        <span className="text-[1rem] font-[500] tracking-[0.32px]">
          Continue to checkout
        </span>
      </Button>
    </FullScreenModal>
  );
};

function Card({
  data: {
    id,
    title,
    description,
    price,
    icon,
    priceDesc,
    input_label,
    isHorizontal,
  },
  formData,
  setFormData,
  disabled,
}: {
  data: {
    id: string;
    title: string;
    description: string;
    price: string;
    icon: React.ReactNode;
    priceDesc: string;
    input_label: string;
    isHorizontal?: boolean;
  };
  formData: Record<string, number>;
  setFormData: any;
  disabled?: boolean;
}) {
  const { isAnyMobile } = useResponsive();
  // if formData is not 0 then it is selected
  const isSelected = formData[id] > 0;

  const handleIncrement = () => {
    setFormData((prev: any) => {
      const count = prev[id] || 0;
      return { ...prev, [id]: count + 1 };
    });
  };

  // decreament only if the count is greater than 0
  const handleDecrement = () => {
    setFormData((prev: any) => {
      const count = prev[id] || 0;
      if (count > 0) {
        return { ...prev, [id]: count - 1 };
      }
      return prev;
    });
  };

  const showHorizontal = !isAnyMobile && isHorizontal;
  return (
    <button
      className={clsx(
        `p-5 bg-white rounded-[8px] flex-1 flex-grow text-start md:min-w-[20%] min-w-full ${
          showHorizontal ? "" : "min-h-[330px]"
        } transition-all relative`,
        isSelected
          ? "border-[2px] border-solid border-[#80A48B]"
          : "border-[2px] border-transparent",
        disabled ? "opacity-40" : ""
      )}
      disabled={disabled}
      onClick={
        // if the card is 0 then select it
        () => {
          if (formData[id] === 0) {
            setFormData((prev: any) => {
              return { ...prev, [id]: 1 };
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
          checked={formData[id] > 0}
          onChange={(checked) => {
            if (!checked) {
              setFormData((prev: any) => {
                return { ...prev, [id]: 0 };
              });
            }
          }}
        />
      </div>

      <div
        className={`flex justify-between ${
          showHorizontal ? "" : "h-full flex-col"
        }`}
      >
        <div
          className={showHorizontal ? "flex gap-4 items-center" : "grid gap-4"}
        >
          {icon}
          <div className="flex-1 gap-2 grid">
            <span className="font-outfit text-[1rem] font-[500] leading-[110%]">
              {title}
            </span>
            <p className="tracking-[-0.28px] leading-[150%] text-[0.875rem] font-[500] text-[#888]">
              {description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className={
            showHorizontal ? "flex flex-col gap-3" : "flex flex-col gap-4"
          }
        >
          <div className="flex flex-row gap-1">
            <span className="font-[500] text-[1rem]">${price}</span>
            <span className="font-italic text-[0.875rem] leading-[150%] font-[500] text-[#666]">
              {priceDesc}
            </span>
          </div>
          <div className="border-[1px] gap-8 border-solid border-[#DDD] rounded-[5px] px-2 py-1.5 flex flex-row justify-between items-center">
            <span className="text-[#666] text-[0.75rem] font-[500]">
              {input_label}
            </span>
            <div className="flex flex-row gap-0.5">
              <button
                onClick={handleDecrement}
                disabled={!formData[id] || Number(formData[id]) <= 0}
              >
                <NegativeIcon />
              </button>
              <input
                className="text-[#666] text-[0.875rem] border-[1px] border-solid border-[#D7D7D7] rounded-[4px] font-[700] w-[40px] text-center items-center"
                value={formData[id] || 0}
                onChange={(e: any) =>
                  setFormData({
                    ...formData,
                    [id]: parseInt(e.target.value),
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
