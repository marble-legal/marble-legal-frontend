import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthProvider } from "../AuthContext";
import SettingsModal from "../components/settings/Settings";
import useStripeSession from "./subscription/useSubscription";

function MainApp() {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings(!showSettings);
  const { activeSubscription } = useStripeSession();

  return (
    <>
      <div className="flex-1 hidden lg:flex flex-col lg:flex-row">
        {showSettings && <SettingsModal onClose={toggleSettings} />}
        <Sidebar toggleSettings={toggleSettings} />
        <div className="bg-[white] pl-0 p-3 w-full">
          <div className="flex-1 overflow-auto md:bg-[#F2F5FB] lg:pt-0 pt-[3.5rem] rounded-[12px] h-[calc(100vh-24px)]">
            <Outlet />
          </div>
        </div>
      </div>
      <>
        {/* <MobileMenu /> */}
        <div className="bg-[white] pl-0 md:p-3 w-full lg:hidden">
          <div className="flex-1 mt-[62px] lg:mt-0 overflow-auto bg-[#F2F5FB] lg:pt-0 rounded-[12px] lg:mx-4">
            <Outlet />
          </div>
        </div>
      </>
    </>
  );
}

export function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  if (!isLoggedIn) return null;

  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
