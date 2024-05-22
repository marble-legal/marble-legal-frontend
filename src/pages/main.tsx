import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";
import LogoIcon from "../assets/icons/logo.svg";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../helpers/utils";
import Sidebar from "../components/Sidebar";
import useViewportHeight from "../helpers/useViewportHeight";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../components/Drawer";
// import { Drawer } from "../components/Drawer";
import menuImage from "../assets/images/sidebar.png";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import MobileMenu from "../components/MobileMenu";

function MainApp() {
  const vh = useViewportHeight();

  if (window.innerWidth < 1024) {
    return (
      <>
        <MobileMenu />
        <div className="bg-[white] pl-0 p-3 w-full">
          <div
            className="flex-1 overflow-auto bg-[#F2F5FB] lg:pt-0 mt-[5rem] rounded-[12px] mx-4"
            style={{
              height: vh - 80,
            }}
          >
            <Outlet />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <Sidebar />
      <div className="bg-[white] pl-0 p-3 w-full">
        <div
          className="flex-1 overflow-auto bg-[#F2F5FB] lg:pt-0 pt-[3.5rem] rounded-[12px]"
          style={{
            height: vh - 24,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const user = getUser();
  // const { data: activeSubscription, isLoading } = useQuery(
  //   ["subscription"],
  //   () => api.getUserSubscription(user.id)
  // );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: { from: `${location.pathname}${location.search}` },
      });
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
    }
  }, [location]);

  // useEffect(() => {
  //   // if (isLoading) return;
  //   if (!activeSubscription?.[0]) {
  //     navigate("/subscription");
  //   }
  // }, [activeSubscription, isLoading, location.pathname, navigate]);

  if (!isLoggedIn) return null;
  // if (isLoading) return null;

  return (
    // <UserProvider>
    //   <PraxisCallProvider>
    <MainApp />
    //   </PraxisCallProvider>
    // </UserProvider>
  );
}
