import { useEffect, useState } from "react";
import HueBG from "../../assets/images/hue.png";
import ToggleSwitch from "../../components/ToggleSwitch";
import clsx from "clsx";
import { ReactComponent as CheckCircleIcon } from "../../assets/icons/check-circle.svg";
import Button from "../../components/Button";
import FeatureSpecificPlanModal from "./FeatureSpecificPlan";
import {
  PlanType,
  SubscriptionTier,
  subscriptions,
} from "../../helpers/consts";
import useResponsive from "../../helpers/useResponsive";
import useStripeSession from "./useSubscription";

export default function Subscription() {
  const { isAnyMobile } = useResponsive();
  const { stripeLoading, handleGetStripeSession, activeSubscription } =
    useStripeSession();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isFeatureSpecificPlanModalOpen, setIsFeatureSpecificPlanModalOpen] =
    useState(false);

  const subscription = activeSubscription?.[0];

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };
  const handleFeatureSpecificPlanModal = () => {
    setIsFeatureSpecificPlanModalOpen(!isFeatureSpecificPlanModalOpen);
  };

  return (
    <div
      className="flex flex-col items-center lg:justify-center md:h-[calc(100dvh-5.75rem)]"
      style={
        isAnyMobile
          ? { padding: "0rem" }
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
        isLoading={stripeLoading && isFeatureSpecificPlanModalOpen}
        handleGetStripeSession={handleGetStripeSession}
      />

      <div className="mt-[2.75rem] md:mt-0 md:px-4">
        <div className="mb-4 justify-center gap-[1.25rem] grid">
          <div className="text-center font-[700] text-[1.75rem]">
            Choose a plan
          </div>
        </div>
        <div className="mt-3 mb-7 flex flex-col gap-6">
          <p className="leading-[150%] text-[#888] text-[0.875rem] max-w-[430px] text-center mx-auto font-[500]">
            Select a plan that fits your needs and enjoy a 7-day free trial.
          </p>
          {/* <div className="flex flex-row gap-[0.625rem] items-center text-sm font-[500] px-[1.25rem] py-2 bg-white w-fit mx-auto rounded-full transition-all">
            <span className={clsx(isAnnual && "text-[#888]")}>Monthly</span>
            <ToggleSwitch isToggled={isAnnual} handleToggle={handleToggle} />
            <span className={clsx(!isAnnual && "text-[#888]")}>Annual</span>
          </div> */}
        </div>
        <div className="flex justify-center items-center lg:items-stretch flex-col lg:flex-row flex-wrap lg:w-[1230px] max-w-[1230px] gap-4">
          {subscriptions.map((sub, index) => (
            <SubscriptionCard
              data={sub}
              isAnnual={isAnnual}
              key={index}
              handleGetStripeSession={handleGetStripeSession}
              stripeLoading={stripeLoading}
              onFeatureSpecificPlan={handleFeatureSpecificPlanModal}
              currentSubscription={subscription}
            />
          ))}
        </div>
        <div className="mt-16 mb-8 text-center flex gap-1 justify-center flex-row flex-wrap">
          <span className="md:text-[1.125rem] text-sm text-[#666] font-[500]">
            Looking for a plan with specific features?
          </span>
          <Button
            variant="link"
            className="md:text-[1.125rem] text-sm font-[600]"
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
  data: {
    plan,
    price,
    yearlyPrice,
    features,
    color,
    subscriptionBg,
    subscriptionText,
    subscriptionBorder,
    tier,
  },
  currentSubscription,
  isAnnual,
  handleGetStripeSession,
  stripeLoading,
  onFeatureSpecificPlan,
}: {
  data: {
    plan: string;
    price: string;
    yearlyPrice?: string;
    features: string[];
    color: string;
    subscriptionBg: string;
    subscriptionText: string;
    subscriptionBorder: string;
    tier?: string;
  };
  isAnnual?: boolean;
  handleGetStripeSession: any;
  stripeLoading: boolean;
  onFeatureSpecificPlan: () => void;
  currentSubscription: any;
}) {
  const [isSelected, setIsSelected] = useState(false);
  const handleUpgrade = async () => {
    if (tier === SubscriptionTier.Customised) {
      onFeatureSpecificPlan();
      return;
    }
    const planType = isAnnual ? PlanType.yearly : PlanType.monthly;
    setIsSelected(true);
    await handleGetStripeSession({ planType, tier });
  };
  const handleContactUs = () => {};
  useEffect(() => {
    if (!stripeLoading) setIsSelected(false);
  }, [stripeLoading]);

  const isCurrentPlan =
    !currentSubscription?.cancelledAt &&
    currentSubscription?.tier === tier &&
    currentSubscription?.planType ===
      (isAnnual ? PlanType.yearly : PlanType.monthly);
  return (
    <div className="bg-white rounded-[12px] flex-1 flex-grow max-w-[295px] md:min-w-[295px] min-w-full flex flex-col">
      <div className="p-2">
        <div
          className="px-4 pt-4 grid rounded-[9px] gap-[0.75rem]"
          style={{
            background: color,
          }}
        >
          <div
            className="py-1.5 px-2.5 h-fit w-fit rounded-[6px] text-center leading-[120%]"
            style={{
              background: subscriptionBg,
              color: subscriptionText,
              border: `0.5px solid ${subscriptionBorder}`,
            }}
          >
            <span className="text-[0.8125rem] font-[500]">{plan}</span>
          </div>
          {![SubscriptionTier.Customised, SubscriptionTier.Enterprise].includes(
            tier as string
          ) ? (
            <span className="font-[600] text-[1.25rem] font-outfit">
              ${isAnnual ? yearlyPrice : price}/{isAnnual ? "year" : "month"}
            </span>
          ) : (
            <span className="font-[600] text-[19px] font-outfit">{price}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col px-5 pt-3 pb-5 text-[0.9375rem] font-[500] flex-1">
        <ul className="flex-1 flex flex-col gap-4">
          {features.map((feature, index) => (
            <li className="flex items-start gap-[0.625rem]" key={index}>
              <CheckCircleIcon />
              <span className="flex-1">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          loading={stripeLoading && isSelected}
          className="w-full mt-[1.5rem]"
          onClick={
            tier === SubscriptionTier.Enterprise
              ? handleContactUs
              : handleUpgrade
          }
          disabled={isCurrentPlan && tier !== SubscriptionTier.Customised}
        >
          {isCurrentPlan
            ? "Subscribed"
            : tier === SubscriptionTier.Enterprise
            ? "Contact us"
            : `Upgrade to ${plan}`}
        </Button>
      </div>
    </div>
  );
}
