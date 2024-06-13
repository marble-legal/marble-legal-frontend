import { PopupModal } from "../PopupModal";
import { ReactComponent as SettingsIcon } from "../../assets/icons/setting.svg";
import { useState } from "react";
import clsx from "clsx";
import Personal from "./components/Personal";
import Security from "./components/Security";
import ChangeEmail from "./components/ChangeEmail";
import DeleteAccount from "./components/DeleteAccount";
import ChangePassword from "./components/ChangePassword";

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <PopupModal
      contentClassName="md:max-w-[700px] max-w-[96vw] mx-auto !p-0 w-full !gap-0 md:min-h-[400px]"
      onClose={onClose}
      shouldStopPropagation={false}
    >
      {/* Header */}
      <div className="flex flex-row gap-1 p-4 border-b-solid border-b-[1px] border-b-[#D7D7D7]">
        <SettingsIcon
          className="[&_path]:stroke-[#80A48B]"
          height={24}
          width={24}
        />
        <span className="text-[1rem] font-[500] leading-[150%]">Settings</span>
      </div>

      <div className="flex md:flex-row flex-col h-full">
        {/* Tab */}

        <div
          className={clsx(
            "md:flex gap-2 font-[500] text-[0.875rem] leading-[110%] text-black h-full flex-wrap",
            "md:border-r-[#D7D7D7] md:border-r-solid md:border-r-[1px] md:flex-col md:p-3 md:border-b-[0px]",
            "border-b-[#D7D7D7] border-b-solid border-b-[1px] flex-row p-2",
            {
              hidden:
                activeTab === "deleteAccount" ||
                activeTab === "changePassword" ||
                activeTab === "changeEmail",
            }
          )}
        >
          <TabButton
            isActive={
              activeTab === "personal" ||
              activeTab === "changeEmail" ||
              activeTab === "changePassword" ||
              activeTab === "deleteAccount"
            }
            onClick={() => setActiveTab("personal")}
          >
            My profile
          </TabButton>
          <TabButton
            isActive={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          >
            Notification settings
          </TabButton>
        </div>

        {/* FORM */}
        {activeTab === "personal" && (
          <Personal onClose={onClose} setActiveTab={setActiveTab} />
        )}
        {activeTab === "changeEmail" && (
          <ChangeEmail setActiveTab={setActiveTab} />
        )}
        {activeTab === "security" && <Security />}
        {activeTab === "deleteAccount" && (
          <DeleteAccount setActiveTab={setActiveTab} />
        )}
        {activeTab === "changePassword" && (
          <ChangePassword setActiveTab={setActiveTab} />
        )}
      </div>
    </PopupModal>
  );
}

const TabButton = ({ isActive, onClick, children }) => {
  return (
    <button
      className={clsx(
        "px-4 py-2.5 rounded-lg w-auto transition-all md:flex-grow-0 flex-1 min-w-[180px] md:text-start text-center",
        {
          "bg-black text-white": isActive,
          "hover:bg-black/80 text-black hover:text-white": !isActive,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
