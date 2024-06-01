import { PopupModal } from "./PopupModal";
import { ReactComponent as SettingsIcon } from "../assets/icons/setting.svg";
import Button from "./Button";
import FormField from "./FormField";
import CustomInput from "./Input";
import { useState } from "react";
import clsx from "clsx";

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <PopupModal
      contentClassName="max-w-[700px] mx-auto p-0 w-full"
      onClose={onClose}
    >
      <div className="flex flex-row gap-1 py-4 px-4 border-b-solid border-b-[1px] border-b-[#D7D7D7]">
        <SettingsIcon
          className="[&_path]:stroke-[#80A48B]"
          height={24}
          width={24}
        />
        <span className="text-[1rem] font-[500] leading-[150%]">Settings</span>
      </div>
      <div className="flex flex-row px-4">
        <div className="flex flex-col gap-2 font-[500] text-[0.875rem] leading-[110%] text-black">
          <button
            className={clsx(
              `px-4 py-2.5 rounded-[10px] w-max hover:bg-[#F2F2F2]/50`,
              {
                "bg-[#F2F2F2]": activeTab === "personal",
              }
            )}
            onClick={() => setActiveTab("personal")}
          >
            Personal information
          </button>
          <button
            className={clsx(
              `px-4 py-2.5 rounded-[10px] w-max hover:bg-[#F2F2F2]/50`,
              {
                "bg-[#F2F2F2]": activeTab === "security",
              }
            )}
            onClick={() => setActiveTab("security")}
          >
            Security Information
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
    <div className="px-4 pt-[0.625rem] pb-[1.5rem] w-full flex flex-col gap-4">
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
      <div className="grid gap-1.5">
        <span className="text-[0.875rem] font-[500] leading-[110%]">John</span>
        <p className="text-[#888] text-[0.75rem] font-[500] leading-[110%]">
          Change your information here.
        </p>
      </div>
      <div className="grid gap-1.5">
        <span className="text-[0.875rem] font-[500] leading-[110%]">
          Personal Information
        </span>
        <p className="text-[#888] text-[0.75rem] font-[500] leading-[110%]">
          Add or change your information here.
        </p>
      </div>
      <div className="grid gap-2.5">
        <CustomInput
          label="First Name"
          type="text"
          name="first_name"
          id="first_name"
          value="John"
          placeholder="John"
          onChange={() => {}}
          className="w-full"
        />
        <CustomInput
          label="Last Name"
          type="text"
          name="last_name"
          id="last_name"
          value="Doe"
          placeholder="Doe"
          onChange={() => {}}
          className="w-full"
        />
      </div>
      <div>
        <Button
          variant="link"
          className="!text-[0.75rem] !font-[500] leading-[110%] underline !text-[#888]"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

function Security() {
  return (
    <div className="px-4 pt-[0.625rem] pb-[1.5rem] w-full flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="grid gap-1.5">
          <span className="text-[0.875rem] font-[500] leading-[110%]">
            Security Information
          </span>
          <p className="text-[#888] text-[0.75rem] font-[500] leading-[110%]">
            Add or change your information here.
          </p>
        </div>
        <Button disabled className="h-fit w-[100px] leading-[18px]">
          Save
        </Button>
      </div>
      <div className="grid gap-2.5">
        <CustomInput
          label="Email address"
          type="email"
          name="email"
          id="email"
          value="ramtin@micro1.ai"
          placeholder="ramtin@micro1.ai"
          onChange={() => {}}
          className="w-full"
        />
        {/* phone number */}
        <CustomInput
          label="Phone number"
          type="text"
          name="phone"
          id="phone"
          value="+1 234 567 890"
          placeholder="+1 234 567 890"
          onChange={() => {}}
          className="w-full"
        />
        <CustomInput
          label="Password"
          type="password"
          name="password"
          id="password"
          value="********"
          placeholder="********"
          onChange={() => {}}
          className="w-full"
        />
      </div>
    </div>
  );
}
