import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";
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

export function BottomView({
  open,
  onClose,
  topbar,
  topbarClassName = "",
  children,
  contentClassName = "",
}: {
  open: boolean;
  onClose: () => void;
  topbar?: JSX.Element;
  topbarClassName?: string;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <Drawer direction="bottom" open={open} onClose={onClose}>
      <DrawerContent
        className={`!h-[85vh] bg-white !rounded-[10px] p-4 !w-full ${contentClassName}`}
      >
        <div className={`w-full flex flex-col fixed -top-8 ${topbarClassName}`}>
          <div className="flex justify-end px-6">
            <DrawerClose onClick={onClose}>
              <button>
                <CloseIcon className="w-[1.5rem] h-[1.5rem] [&_path]:stroke-white" />
              </button>
            </DrawerClose>
          </div>
          {topbar}
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
