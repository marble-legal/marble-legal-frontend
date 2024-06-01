import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useViewportHeight from "../helpers/useViewportHeight";
import MobileMenu from "../components/MobileMenu";
import { ContractAnalysisProvider } from "./contract-analysis/contract-analysis-context";
import { AuthProvider } from "../AuthContext";
import SettingsModal from "../components/Settings";

function MainApp() {
  const vh = useViewportHeight();
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings(!showSettings);
  console.log(showSettings);

  if (window.innerWidth < 1024) {
    return (
      <>
        {showSettings && <SettingsModal onClose={toggleSettings} />}
        <MobileMenu toggleSettings={toggleSettings} />
        <div className="bg-[white] pl-0 md:p-3 w-full">
          <div
            className="flex-1 overflow-auto md:bg-[#F2F5FB] lg:pt-0 mt-[5rem] rounded-[12px] mx-4"
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
      {showSettings && <SettingsModal onClose={toggleSettings} />}
      <Sidebar toggleSettings={toggleSettings} />
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
      <ContractAnalysisProvider>
        <MainApp />
      </ContractAnalysisProvider>
    </AuthProvider>
  );
}
