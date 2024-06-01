import { useState } from "react";
import HueBG from "../../assets/images/hue.png";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useViewportWidth } from "../../helpers/useViewportHeight";
import clsx from "clsx";
import { ReactComponent as CheckCircleIcon } from "../../assets/icons/check-circle.svg";
import Button from "../../components/Button";
import FeatureSpecificPlanModal from "./FeatureSpecificPlan";
import { subscriptions } from "../../helpers/consts";

export default function Subscription() {
  const viewWidth = useViewportWidth();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isFeatureSpecificPlanModalOpen, setIsFeatureSpecificPlanModalOpen] =
    useState(false);

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };
  const handleFeatureSpecificPlanModal = () => {
    setIsFeatureSpecificPlanModalOpen(!isFeatureSpecificPlanModalOpen);
  };

  return (
    <div
      className="md:h-[calc(100%)] grid items-center justify-center"
      style={
        viewWidth < 768
          ? { padding: "1rem" }
          : {
              backgroundImage: `url(${HueBG})`,
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: " bottom center",
            }
      }
    >
      <FeatureSpecificPlanModal
        isOpen={isFeatureSpecificPlanModalOpen}
        onClose={handleFeatureSpecificPlanModal}
      />

      <div className="md:-mt-[3.125rem] mt-[3.5rem]">
        <div className="mb-4 justify-center gap-[1.25rem] grid">
          <h1 className="text-center font-[700] text-[1.75rem] font-outfit">
            Choose a plan
          </h1>
        </div>
        <div className="mt-3 mb-[2.5rem] flex flex-col gap-6">
          <p className="leading-[150%] text-[#888] text-[0.875rem] max-w-[430px] text-center mx-auto font-[500]">
            Select a plan that fits your needs and enjoy a 7-day free trial.
          </p>
          <div className="flex flex-row gap-[0.625rem] items-center text-[0.75rem] font-[500] px-[1.25rem] py-2 bg-white w-fit mx-auto rounded-full transition-all">
            <span className={clsx(isAnnual && "text-[#888]")}>Monthly</span>
            <ToggleSwitch isToggled={isAnnual} handleToggle={handleToggle} />
            <span className={clsx(!isAnnual && "text-[#888]")}>Annual</span>
          </div>
        </div>
        <div className="flex flex-row flex-wrap lg:w-[950px] max-w-[950px] gap-4">
          {subscriptions.map((sub, index) => (
            <SubscriptionCard data={sub} isAnnual={isAnnual} key={index} />
          ))}
        </div>
        <div className="mt-[3rem] text-center flex gap-1 justify-center flex flex-row flex-wrap">
          <span className="text-[1.125rem] text-[#666] font-[500]">
            Looking for a plan with specific features?
          </span>
          <Button
            variant="link"
            className="text-[1.125rem] font-[600]"
            onClick={handleFeatureSpecificPlanModal}
          >
            Click here.
          </Button>
        </div>
      </div>
    </div>
  );
}

function SubscriptionCard({
  data: { plan, price, features, color, subscriptionBg, subscriptionText },
  isAnnual,
}: {
  data: {
    plan: string;
    price: string;
    features: string[];
    color: string;
    subscriptionBg: string;
    subscriptionText: string;
  };
  isAnnual?: boolean;
}) {
  return (
    <div className="bg-white rounded-[12px] flex-1 flex-grow md:min-w-[30%] min-w-full">
      <div className="p-2">
        <div
          className="p-4 grid rounded-[9px] gap-[0.75rem]"
          style={{
            background: color,
          }}
        >
          <div
            className="px-[0.625rem] py-[0.375rem] h-fit w-fit rounded-[6px] text-center leading-[120%]"
            style={{
              background: subscriptionBg,
              color: subscriptionText,
            }}
          >
            <span className="text-[0.8125rem] font-[500]">{plan}</span>
          </div>
          <span className="font-[600] text-[1.25rem] font-outfit">
            ${isAnnual ? parseFloat(price) * 12 : price}/
            {isAnnual ? "year" : "month"}
          </span>
        </div>
      </div>
      <div className="px-6 py-3 text-[0.9375rem] font-[500]">
        <ul className="grid gap-4">
          {features.map((feature, index) => (
            <li className="flex items-center gap-[0.625rem]" key={index}>
              <CheckCircleIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="w-full mt-[1.5rem]">Upgrade to {plan}</Button>
      </div>
    </div>
  );
}
