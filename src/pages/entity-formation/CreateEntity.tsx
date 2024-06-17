import { useEffect, useState } from "react";
import FullScreenModal from "../../components/FullScreenModal";
import clsx from "clsx";
import { WelcomeStep } from "./create-steps/Welcome";
import { ClientInformation } from "./create-steps/Client";
import { OwnerQuestions } from "./create-steps/Owner";
import { GeneralQuestions } from "./create-steps/General";
import { FinancialQuestions } from "./create-steps/Financial";
import { ManagementQuestions } from "./create-steps/Management";
import Button from "../../components/Button";
import { BusinessEntityCreation } from "../../types/business-entity.types";
import { useAuth } from "../../AuthContext";

const stepComponents = [
  WelcomeStep,
  ClientInformation,
  OwnerQuestions,
  GeneralQuestions,
  FinancialQuestions,
  ManagementQuestions,
];

const createSteps = (
  setStep: React.Dispatch<React.SetStateAction<number>>,
  updateFormData: (data: Partial<BusinessEntityCreation>) => void,
  formData: BusinessEntityCreation
) => {
  return stepComponents.map((Component, index) => ({
    step: index,
    Component: (props) => (
      <Component
        {...props}
        updateFormData={updateFormData}
        formData={formData}
      />
    ),
    onNext: (data) => {
      updateFormData(data);
      setStep(index + 1);
    },
    onBack: () => setStep(index - 1),
  }));
};

export default function CreateEntity({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BusinessEntityCreation>({
    userId: "",
    ...({} as Omit<BusinessEntityCreation, "userId">),
  });
  const updateFormData = (data: Partial<BusinessEntityCreation>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const [step, setStep] = useState(0);
  const Steps = createSteps(setStep, updateFormData, formData);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  return (
    <FullScreenModal
      isOpen={isOpen}
      onClose={handleClose}
      customContentClassName="!pb-0"
    >
      {step !== 0 && (
        <div className="md:p-5">
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
              onNext={Step.onNext}
              onBack={Step.onBack}
              nextStep={() => setStep(step + 1)}
              closeModal={handleClose}
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
      {[1, 2, 3, 4, 5].map((step) => (
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
export function CreateEntityFooter({
  onBack,
  isValid,
}: {
  onBack: () => void;
  isValid: boolean;
}) {
  return (
    <div className="sticky bottom-0 right-0 w-full md:p-4 px-0 py-4 border-t-solid border-t-[1px] bg-[#F2F5FB]">
      <div className="float-end gap-3 flex flex-row">
        <Button
          variant="ghost"
          className="bg-[#F8E3E3] text-[#B94444] border-[#B85042] border-[1px] leading-[18px] hover:bg-[#F8E3E3]/70"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit" disabled={!isValid} className="leading-[18px]">
          Continue
        </Button>
      </div>
    </div>
  );
}
