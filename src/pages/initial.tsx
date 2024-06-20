import LogoIcon from "../assets/icons/logo.svg";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { AuthProvider, useAuth } from "../AuthContext";
import SettingsModal from "../components/settings/Settings";
import ProfileImageIcon from "../assets/icons/profile.svg";
import useViewportHeight from "../helpers/useViewportHeight";

function InitialApp() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const vh = useViewportHeight();
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings(!showSettings);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const items = [
    {
      label: "Settings",
      onClick: () => toggleSettings(),
    },
    {
      label: "Privacy and policy",
      onClick: () => console.log("Privacy and policy"),
    },
    { label: "Logout", onClick: handleLogout },
  ];

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {showSettings && <SettingsModal onClose={toggleSettings} />}
      <div className="md:bg-[white] bg-[#F2F5FB] md:p-3 w-full">
        <div
          className="flex-1 md:overflow-hidden bg-[#F2F5FB] p-4 md:rounded-[12px] h-full overflow-auto"
          style={{
            height: vh - 24,
          }}
        >
          <div className="flex justify-between">
            <Link
              to="/dashboard"
              className="flex font-outfit font-[500] text-[1.125rem] items-center gap-1 z-[9]"
            >
              <img src={LogoIcon} alt="logo" className="h-[1.875rem]" />
              {/* <span>Marble Legal</span> */}
            </Link>
            <Dropdown
              label={
                <div className="flex gap-[0.625rem] items-center rounded-[48px]">
                  {/* randomg image */}
                  <img
                    src={user?.profileImg || ProfileImageIcon}
                    alt="profile"
                    className="h-8 w-8 rounded-full shadow-dropdown"
                  />
                  <span className="text-[1rem] truncate max-w-[120px]">
                    {user?.fullName}
                  </span>
                </div>
              }
              items={items}
              direction="down"
              // className="!rounded-full"
              triggerClassName="!rounded-full !pr-4 !p-2 "
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function Initial() {
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

  // useEffect(() => {
  //   // if (isLoading) return;
  //   if (!activeSubscription?.[0]) {
  //     navigate("/subscription");
  //   }
  // }, [activeSubscription, isLoading, location.pathname, navigate]);

  if (!isLoggedIn) return null;
  // if (isLoading) return null;

  return (
    <AuthProvider>
      <InitialApp />
    </AuthProvider>
  );
}
