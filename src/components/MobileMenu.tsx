import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";
import ProfileImageIcon from "../assets/icons/profile.svg";
import LogoIcon from "../assets/icons/lara-logo.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../components/Drawer";
// import { Drawer } from "../components/Drawer";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import Button from "./Button";
import clsx from "clsx";

import { ReactComponent as MessageIcon } from "../assets/icons/message-text.svg";
import { ReactComponent as ContractIcon } from "../assets/icons/scan.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document-text.svg";
import { ReactComponent as BuildingIcon } from "../assets/icons/buliding.svg";
import { ReactComponent as CrownIcon } from "../assets/icons/crown.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/setting.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/logout.svg";
import { ReactComponent as ShieldIcon } from "../assets/icons/shield.svg";
import Dropdown from "./Dropdown";
import { getUser } from "../helpers/utils";
import { api } from "../helpers/api";
import { useQuery } from "@tanstack/react-query";
import SettingsModal from "./settings/Settings";
import { useAuth } from "../AuthContext";

export default function MobileMenu({
  renderAction,
}: {
  renderAction?: JSX.Element;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const userId = getUser().id;
  const { data: user } = useQuery(["user"], () => api.getUser({ id: userId }), {
    staleTime: 15 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
  });
  const [showSettings, setShowSettings] = useState(false);
  const { user: userSelf } = useAuth();
  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const items = [
    {
      label: "Settings",
      onClick: toggleSettings,
      icon: <SettingsIcon />,
    },
    {
      label: "Privacy and policy",
      onClick: () => console.log("Privacy and policy"),
      icon: <ShieldIcon />,
    },
    { label: "Logout", onClick: handleLogout, icon: <LogoutIcon /> },
  ];

  return (
    <div className="lg:hidden flex">
      {showSettings && <SettingsModal onClose={toggleSettings} />}
      <Drawer direction="left" open={isDrawerOpen}>
        <div className="w-full flex justify-between items-center p-3.5 fixed top-0 left-0 bg-[white] z-[9]">
          <div className="flex flex-row gap-4">
            <DrawerTrigger className="!w-fit flex-1" onClick={toggleDrawer}>
              <div className=" pl-2">
                <MenuIcon className="w-[1.5rem] h-[1.5rem]" />
              </div>
            </DrawerTrigger>
            <div className="flex-1 flex justify-center items-center w-full">
              <Link to="/home" className="h-[34px] w-[74px]">
                <img src={LogoIcon} alt="logo" className="h-full w-full" />
              </Link>
            </div>
          </div>
          <div className="flex-1">{renderAction}</div>
        </div>

        <DrawerContent
          className="h-full bg-white !rounded-[0px] p-4"
          onClose={() => setIsDrawerOpen(false)}
        >
          <div className="flex justify-between">
            <div className="border-[1px] border-solid border-[#E5EFF6] py-2 px-4 rounded-[12px] bg-[#FDFEFD] flex justify-between">
              <Link
                to="/home"
                className="flex font-outfit font-[500] text-[1.125rem] items-center gap-1"
              >
                <img src={LogoIcon} alt="logo" className="h-[1.875rem]" />
                {/* <span>Marble Legal</span> */}
              </Link>
            </div>

            <DrawerClose>
              <button onClick={toggleDrawer}>
                <CloseIcon className="w-[1.5rem] h-[1.5rem] text-slate-500" />
              </button>
            </DrawerClose>
          </div>

          <div className="grid gap-[0.375rem] mt-4">
            <CustomLink
              to="/dashboard"
              activePath="/dashboard"
              Icon={MessageIcon}
              label="Legal AI assistant"
              toggleDrawer={toggleDrawer}
            />
            <CustomLink
              to="/contracts"
              activePath="/contracts"
              Icon={ContractIcon}
              label="Contract Analysis"
              toggleDrawer={toggleDrawer}
            />
            <CustomLink
              to="/draft-generation"
              activePath="/draft-generation"
              Icon={DocumentIcon}
              label="Contract draft generation"
              toggleDrawer={toggleDrawer}
            />
            <CustomLink
              to="/entity-formation"
              activePath="/entity-formation"
              Icon={BuildingIcon}
              label="Business Entity formation"
              toggleDrawer={toggleDrawer}
            />

            <div className="absolute bottom-3 w-[calc(100%-24px)]">
              <Link
                to="/subscription"
                className="bg-[#FFF7F7] flex gap-[0.375rem] p-4 font-[500] text-[0.875rem] justify-center border-[1px] border-solid border-[#F1D6D3] rounded-[10px] mb-[0.625rem] items-center cursor-pointer"
              >
                <CrownIcon className="w-[1.5rem] h-[1.5rem]" />
                <span>Upgrade your plan</span>
              </Link>
              <Dropdown
                label={
                  <div className="flex gap-[0.625rem] items-center">
                    {/* randomg image */}
                    <img
                      src={userSelf?.profileImg || ProfileImageIcon}
                      alt="profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-[0.875rem] truncate max-w-[120px]">
                      {user?.data?.fullName}
                    </span>
                  </div>
                }
                items={items}
                direction="up"
                className="!w-full"
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function CustomLink({
  to,
  activePath,
  Icon,
  label,
  toggleDrawer,
}: {
  to: string;
  activePath: string;
  Icon: any;
  label: string;
  toggleDrawer: () => void;
}) {
  const isActive = window.location.pathname === activePath;
  const navigate = useNavigate();
  const handleNavigate = () => {
    toggleDrawer();
    navigate(to);
  };

  return (
    <button onClick={() => handleNavigate()}>
      <Button
        className={clsx(
          "!p-4 flex flex-row !justify-start gap-2 justify-start px-3 w-full gap-3 items-center border-[1px] border-transparent",
          {
            "!bg-[#E5F5EA] border-[1px] border-solid !border-[#C1D2C5]":
              isActive,
          }
        )}
        variant={isActive ? "primary" : "ghost"}
      >
        <Icon
          className={clsx({
            "[&>g>path]:fill-[#64AB7A] [&>path]:fill-[#64AB7A] [&>g>g>path]:fill-[#64AB7A]":
              isActive,
            "[&>g>path]:fill-[#666] [&>path]:fill-[#666] [&>g>g>path]:fill-[#666]":
              !isActive,
          })}
        />
        <span
          className={clsx(
            { "!text-[#666]": !isActive },
            "text-black font-[600] text-[0.875rem]"
          )}
        >
          {label}
        </span>
      </Button>
    </button>
  );
}
