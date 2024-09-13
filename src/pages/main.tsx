import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthProvider, useAuth } from "../AuthContext";
import SettingsModal from "../components/settings/Settings";
import useStripeSession from "./subscription/useSubscription";
import useSubscription from "./subscription/useSubscription";
import { TermsConfirmation } from "./auth/terms-confirmation/TermsConfirmation";
import { api } from "../helpers/api";
import { ShowToast } from "../components/toast";
import { getUser } from "../helpers/utils";

function MainApp() {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => setShowSettings(!showSettings);
  const user = getUser();
  const [showTermsConfirmation, setShowTermsConfirmation] = useState(false);
  const [isSavingTermsConfirmation, setIsSavingTermsConfirmation] =
    useState(false);

  const handleConfirm = async () => {
    setIsSavingTermsConfirmation(true);
    api
      .editUser(user.id, { isAcceptedTnc: true })
      .then(() => {
        setShowTermsConfirmation(false);
        setIsSavingTermsConfirmation(false);
      })
      .catch((err) => {
        setIsSavingTermsConfirmation(false);
        ShowToast({
          type: "error",
          message:
            err.response?.data?.message ||
            "Failed to update terms & conditions",
        });
      });
  };

  useEffect(() => {
    if (user?.id) {
      api.getUser({ id: user?.id }).then((res) => {
        const isAcceptedTnc = res.data.isAcceptedTnc;
        if (isAcceptedTnc) {
          setShowTermsConfirmation(false);
        } else {
          setShowTermsConfirmation(true);
        }
      });
    }
  }, [user]);

  return (
    <>
      <div className="flex-1 hidden lg:flex flex-col lg:flex-row">
        {showSettings && <SettingsModal onClose={toggleSettings} />}
        <Sidebar toggleSettings={toggleSettings} />
        <div className="bg-[white] pl-0 p-3 w-full">
          <div className="flex-1 overflow-auto md:bg-[#F2F5FB] lg:pt-0 pt-[3.5rem] rounded-[12px] h-[calc(100dvh-24px)]">
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
      {showTermsConfirmation && (
        <TermsConfirmation
          onConfirm={handleConfirm}
          isSaving={isSavingTermsConfirmation}
        />
      )}
    </>
  );
}

export function Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { activeSubscription } = useSubscription();

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

  useEffect(() => {
    if (activeSubscription?.length === 0) {
      navigate("/subscription");
    }
  }, [activeSubscription]);

  if (!isLoggedIn) return null;

  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
