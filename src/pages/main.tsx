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

function MainApp() {
  const vh = useViewportHeight();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (window.innerWidth < 1024) {
    return (
      <div className="lg:hidden flex">
        <Drawer direction="left">
          <div className="w-full [&>button]:w-full [&>button]:p-4 fixed top-0 left-0 bg-[white] z-[9]">
            <DrawerTrigger>
              <div className="flex justify-between items-center w-full">
                <div className="border-[1px] border-solid border-[#E5EFF6] p-2 px-4 rounded-[12px] bg-[#FDFEFD]">
                  <Link
                    to="/home"
                    className="flex font-outfit font-[500] text-[1.125rem] items-center gap-1"
                  >
                    <img src={LogoIcon} alt="logo" className="h-[1.875rem]" />
                    <span>Marble Legal</span>
                  </Link>
                </div>

                <div>
                  <MenuIcon className="w-[1.5rem] h-[1.5rem]" />
                </div>
              </div>
            </DrawerTrigger>
          </div>

          <DrawerContent className="h-full bg-white !rounded-[0px] p-4">
            <div className="flex justify-between">
              <div className="border-[1px] border-solid border-[#E5EFF6] p-4 rounded-[12px] bg-[#FDFEFD] flex justify-between">
                <Link
                  to="/home"
                  className="flex font-outfit font-[500] text-[1.125rem] items-center gap-1"
                >
                  <img src={LogoIcon} alt="logo" className="h-[1.875rem]" />
                  <span>Marble Legal</span>
                </Link>
              </div>

              <DrawerClose>
                <button onClick={toggleDrawer}>
                  <CloseIcon className="w-[1.5rem] h-[1.5rem] text-slate-500" />
                </button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
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
