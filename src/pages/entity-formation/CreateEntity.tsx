import { useState } from "react";
import FullScreenModal from "../../components/FullScreenModal";
import clsx from "clsx";
import { WelcomeStep } from "./create-steps/Welcome";
import { ClientInformation } from "./create-steps/Client";
import { OwnerQuestions } from "./create-steps/Owner";

export default function CreateEntity({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const [step, setStep] = useState(2);

  const Steps = [
    {
      step: 0,
      Component: WelcomeStep,
      onNext: () => {
        setStep(1);
      },
      onBack: () => {},
    },
    {
      step: 1,
      Component: ClientInformation,
      onNext: () => {
        setStep(2);
      },
      onBack: () => {
        setStep(1);
      },
    },
    {
      step: 2,
      Component: OwnerQuestions,
      onNext: () => {
        setStep(3);
      },
      onBack: () => {
        setStep(1);
      },
    },
  ];

  return (
    <FullScreenModal isOpen={isOpen} onClose={handleClose}>
      {step !== 0 && (
        <div className="p-5">
          <StepIndicator
            steps={Steps.map((Step) => Step.Component.name)}
            currentStep={step}
          />
        </div>
      )}

      {Steps.map((Step) => {
        if (step === Step.step) {
          return (
            <Step.Component
              key={Step.step}
              nextStep={Step.onNext}
              onBack={Step.onBack}
            />
          );
        }
        return null;
      })}
    </FullScreenModal>
  );
}

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex flex-row gap-2 justify-between items-center transition-all">
      {[1, 2, 3, 4, 5, 6].map((step) => (
        <div
          key={step}
          className={clsx(
            "w-[20%] h-[8px] rounded-[30px]",
            step <= currentStep ? "bg-[#BB4B4B]" : "bg-[#BB4B4B]/10"
          )}
        ></div>
      ))}
    </div>
  );
};
