import LogoIcon from "../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Button from "./Button";
import { ReactComponent as MessageIcon } from "../assets/icons/message-text.svg";
import { ReactComponent as ContractIcon } from "../assets/icons/scan.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document-text.svg";
import { ReactComponent as BuildingIcon } from "../assets/icons/buliding.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/setting.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as ShieldIcon } from "../assets/icons/shield.svg";
import { ReactComponent as CrownIcon } from "../assets/icons/crown.svg";
import menuImage from "../assets/images/sidebar.png";
import Dropdown from "./Dropdown";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.clear();
  };

  const items = [
    {
      label: "Settings",
      onClick: () => console.log("Settings"),
      icon: <SettingsIcon />,
    },
    {
      label: "Privacy and policy",
      onClick: () => console.log("Privacy and policy"),
      icon: <ShieldIcon />,
    },
    { label: "Logout", onClick: handleLogout, icon: <LogoutIcon /> },
  ];

  // Desktop Sidebar
  return (
    <div
      className="lg:flex flex-col h-[100vh] relative hidden min-w-[300px] p-3"
      style={{
        // position bottom 0 background image
        backgroundImage: `url(${menuImage})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}
    >
      <div className="border-[1px] border-solid border-[#E5EFF6] p-4 rounded-[12px] bg-[#FDFEFD] mb-5">
        <Link
          to="/home"
          className="flex font-outfit font-[500] text-[1.125rem] items-center gap-1"
        >
          <img src={LogoIcon} alt="logo" className="h-[1.875rem]" />
          <span>Marble Legal</span>
        </Link>
      </div>

      <div className="grid gap-[0.375rem]">
        <CustomLink
          to="/dashboard"
          activePath="/dashboard"
          Icon={MessageIcon}
          label="Legal AI assistant"
        />
        <CustomLink
          to="/contracts"
          activePath="/contracts"
          Icon={ContractIcon}
          label="Contract Analysis"
        />
        <CustomLink
          to="/documents"
          activePath="/documents"
          Icon={DocumentIcon}
          label="Contract draft generation"
        />
        <CustomLink
          to="/buildings"
          activePath="/buildings"
          Icon={BuildingIcon}
          label="Business Entity formation"
        />

        <div className="absolute bottom-3 w-[calc(100%-24px)]">
          <div className="bg-[#FFF7F7] flex gap-[0.375rem] p-4 font-[500] text-[1rem] justify-center border-[1px] border-solid border-[#F1D6D3] rounded-[10px] mb-[0.625rem] items-center cursor-pointer">
            <CrownIcon className="w-[1.5rem] h-[1.5rem]" />
            <span>Upgrade your plan</span>
          </div>
          <Dropdown
            label={
              <div className="flex gap-[0.625rem] items-center">
                {/* randomg image */}
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="profile"
                  className="h-8 w-8 rounded-md"
                />
                <span className="text-[1rem]">John</span>
              </div>
            }
            items={items}
            direction="up"
            className="!w-full"
          />
        </div>
      </div>
    </div>
  );
}

function CustomLink({
  to,
  activePath,
  Icon,
  label,
}: {
  to: string;
  activePath: string;
  Icon: any;
  label: string;
}) {
  const isActive = window.location.pathname === activePath;

  return (
    <Link to={to}>
      <Button
        className={clsx(
          "!p-4 flex flex-row !justify-start gap-2 justify-start px-3 w-full gap-3 items-center",
          {
            "!bg-[#E5F5EA] border-[1px] border-solid !border-[#C1D2C5]":
              isActive,
          }
        )}
        variant={isActive ? "primary" : "ghost"}
      >
        <Icon
          className={clsx({
            "[&>g>path]:fill-[#64AB7A] [&>path]:fill-[#64AB7A]": isActive,
            "[&>g>path]:fill-[#666] [&>path]:fill-[#666]": !isActive,
          })}
        />
        <span
          className={clsx(
            { "!text-[#666]": !isActive },
            "text-black font-[600] text-[1rem]"
          )}
        >
          {label}
        </span>
      </Button>
    </Link>
  );
}
