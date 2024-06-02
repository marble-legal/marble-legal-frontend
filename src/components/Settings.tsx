import { PopupModal } from "./PopupModal";
import { ReactComponent as SettingsIcon } from "../assets/icons/setting.svg";
import Button from "./Button";
import FormField from "./FormField";
import CustomInput from "./Input";
import { useState } from "react";
import clsx from "clsx";
import ToggleSwitch from "./ToggleSwitch";

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <PopupModal
      contentClassName="max-w-[700px] mx-auto !p-0 w-full !gap-0"
      onClose={onClose}
    >
      <div className="flex flex-row gap-1 p-4 border-b-solid border-b-[1px] border-b-[#D7D7D7]">
        <SettingsIcon
          className="[&_path]:stroke-[#80A48B]"
          height={24}
          width={24}
        />
        <span className="text-[1rem] font-[500] leading-[150%]">Settings</span>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col gap-2 font-[500] text-[0.875rem] leading-[110%] text-black border-r-[#D7D7D7] border-r-solid border-r-[1px] p-3">
          <button
            className={clsx(
              `px-4 py-2.5 rounded-[10px] w-auto hover:bg-black/80 text-black hover:text-white transition-all text-start`,
              {
                "bg-black text-white": activeTab === "personal",
              }
            )}
            onClick={() => setActiveTab("personal")}
          >
            My profile
          </button>
          <button
            className={clsx(
              `px-4 py-2.5 rounded-[10px] w-max hover:bg-black/80 hover:text-white text-black transition-all text-start`,
              {
                "bg-black text-white": activeTab === "security",
              }
            )}
            onClick={() => setActiveTab("security")}
          >
            Notification settings
          </button>
        </div>

        {/* FORM */}
        {activeTab === "personal" ? <Personal /> : <Security />}
      </div>
    </PopupModal>
  );
}

function Personal() {
  return (
    <div className="p-[1.5rem] w-full flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="grid gap-1.5">
          <span className="text-[0.875rem] font-[500] leading-[110%]">
            Profile
          </span>
          <p className="text-[#888] text-[0.75rem] font-[500] leading-[110%]">
            Add or change your information here.
          </p>
        </div>
        <Button disabled className="h-fit w-[100px] leading-[18px]">
          Save
        </Button>
      </div>

      <div className="grid gap-4">
        <CustomInput
          label="Your full name"
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter your full name"
          value="John"
          onChange={() => {}}
          className="w-full"
        />
        <CustomInput
          label="Email"
          type="email"
          name="fullName"
          id="fullName"
          placeholder="Enter your email"
          value="John"
          onChange={() => {}}
          className="w-full"
          disabled
          change
        />
      </div>
      <div className="flex flex-row gap-5 mt-5">
        <Button
          variant="link"
          className="!text-[0.75rem] !font-[500] leading-[110%] underline !text-[#888]"
        >
          Delete Account
        </Button>
        <Button
          variant="link"
          className="!text-[0.75rem] !font-[500] leading-[110%] underline !text-[#888]"
        >
          Change Password
        </Button>
      </div>
    </div>
  );
}

function Security() {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => setIsToggled((prev) => !prev);
  return (
    <div className="p-[1.5rem] w-full flex flex-col gap-[2.25rem]">
      <div className="flex flex-col gap-4">
        <span className="text-[0.75rem] font-[600] leading-[120%] uppercase tracking-[0.48px]">
          Notification settings
        </span>
        <div className="border-solid border-[1px] border-[#CBD5E1] p-4 rounded-[6px] flex flex-row justify-between w-full gap-4 items-center">
          <div className="grid gap-1.5 ">
            <span className="leading-[120%] text-[0.875rem] font-[600] text-[#0F172A]">
              Email notification
            </span>
            <p className="text-[#475569] text-[0.875rem] font-[400] leading-[150%]">
              Stay updated with important notifications sent directly to your
              email inbox.
            </p>
          </div>
          <div>
            <ToggleSwitch isToggled={isToggled} handleToggle={handleToggle} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-[0.75rem] font-[600] uppercase tracking-[0.48px]">
          Current Subscription
        </span>
        <div className="border-solid border-[1px] border-[#CBD5E1] p-4 rounded-[6px] flex flex-row justify-between w-full gap-4 items-center">
          <div className="flex flex-row gap-3 items-center">
            <div className="py-[0.375rem] px-[0.625rem] bg-[#DECAFF] rounded-[6px] h-fit text-[#883EC2] text-[0.8125rem] font-[500] leading-[120%]">
              Standard
            </div>
            <span className="font-[700] text-[1rem] text-[#0F172A] tracking-[-0.32ppx] leading-[120%]">
              $199/month
            </span>
          </div>
          <Button className="px-[1.5rem] py-[0.675rem] h-fit !leading-[18px]">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
}
