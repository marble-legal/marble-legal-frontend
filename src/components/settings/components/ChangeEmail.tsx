import Button from "../../Button";
import CustomInput from "../../Input";
import { useState } from "react";
import { api } from "../../../helpers/api";
import { useAuth } from "../../../AuthContext";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg";
import { ShowToast } from "../../toast";

export default function ChangeEmail({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="md:p-[1.5rem] p-[1.25rem] w-full flex flex-col gap-4">
      {step === 1 && (
        <InitiateStep
          setActiveTab={setActiveTab}
          setStep={setStep}
          email={email}
          setEmail={setEmail}
        />
      )}
      {step === 2 && (
        <VerifyStep
          setActiveTab={setActiveTab}
          setStep={setStep}
          email={email}
        />
      )}
    </div>
  );
}

function InitiateStep({
  setActiveTab,
  setStep,
  email,
  setEmail,
}: {
  setActiveTab: (tab: string) => void;
  setStep: (step: number) => void;
  email: string;
  setEmail: (email: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleInitiateChangeEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .initiateEmailUpdate(user.id, email)
      .then(() => {
        ShowToast({
          type: "success",
          message: "OTP sent to your email address",
        });
        setStep(2);
        setIsLoading(false);
      })
      .catch((err) => {
        ShowToast({
          type: "error",
          message:
            err.response?.data?.message || "Failed to initiate email change",
        });
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleInitiateChangeEmail}>
      {/* Desktop */}
      <div className="md:flex hidden flex-row justify-between items-center">
        <button
          className="relative p-2.5 border-solid rounded-lg border-[#D7D7D7] border-[1px]"
          onClick={() => setActiveTab("personal")}
          type="button"
        >
          <ArrowIcon className="w-5 h-5" />
        </button>
        <Button
          className="h-fit w-[100px] leading-[18px]"
          type="submit"
          loading={isLoading}
          disabled={!email}
        >
          Next
        </Button>
      </div>
      {/* END */}

      <div className="grid gap-4 md:mt-4">
        <CustomInput
          label="Current Email Address"
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter your full name"
          value={user?.email}
          onChange={(e) => {}}
          className="w-full"
          disabled
          noIcon
        />

        <CustomInput
          label="New Email Address"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          noIcon
        />

        {/* Mobile */}
        <Button
          className="h-fit w-full leading-[18px] md:hidden flex"
          type="submit"
          loading={isLoading}
          disabled={!email}
        >
          Next
        </Button>
        {/* END */}
      </div>
    </form>
  );
}

function VerifyStep({
  setActiveTab,
  setStep,
  email,
}: {
  setActiveTab: (tab: string) => void;
  setStep: (step: number) => void;
  email?: string;
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleVerifyChangeEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    api
      .verifyEmailUpdate(user.id, verificationCode)
      .then(() => {
        ShowToast({
          type: "success",
          message: "Email updated successfully!",
        });
        setStep(1);
        setActiveTab("personal");
        setIsLoading(false);
      })
      .catch((err) => {
        ShowToast({
          type: "error",
          message:
            err.response?.data?.message || "Failed to verify email change",
        });
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleVerifyChangeEmail}>
      {/* Desktop */}
      <div className="md:flex hidden flex-row justify-between items-center">
        <button
          className="relative p-2.5 border-solid rounded-lg border-[#D7D7D7] border-[1px]"
          onClick={() => setStep(1)}
          type="button"
        >
          <ArrowIcon className="w-5 h-5" />
        </button>
        <Button
          className="h-fit w-[100px] leading-[18px]"
          //   onClick={handleVerifyChangeEmail}
          type="submit"
          disabled={!verificationCode}
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
      {/* END */}

      <div className="grid gap-2 md:mt-4">
        <CustomInput
          label="Please enter the code"
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Please enter code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className="w-full"
          noIcon
        />
        <span className="font-bold text-sm text-[#4AA064]">
          We've sent a code to {email}
        </span>
        {/* Mobile */}
        <Button
          className="h-fit w-full leading-[18px] md:hidden flex"
          type="submit"
          disabled={!verificationCode}
          loading={isLoading}
        >
          Submit
        </Button>
        {/* END */}
      </div>
    </form>
  );
}
