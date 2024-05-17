import { useGoogleLogin } from "@react-oauth/google";
import { ReactComponent as Google } from "../assets/icons/google.svg";
import { useEffect } from "react";
import React from "react";
import axios from "axios";

export function SocialLogin({
  onGoogleLogin,
  onSuccess,
}: {
  onGoogleLogin: (response: any) => void;
  onSuccess?: (value: boolean) => void;
}) {
  const [user, setUser] = React.useState<any>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => {},
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          onGoogleLogin(res);
        })
        .catch((err) => {});
    }
  }, [user]);

  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="flex-1 py-3 font-[500] border rounded-[10px] shadow-socialLogin !border-[#E2E2E2] !gap-2 text-[0.875rem] font-[500] !text-black flex items-center justify-center py-2 font-[Inter] hover:bg-[#F1F1F1] transition-all"
        onClick={() => login()}
      >
        <Google />
        Continue with Google
      </button>
    </div>
  );
}
