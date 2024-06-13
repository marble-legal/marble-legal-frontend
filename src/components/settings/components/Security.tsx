import Button from "../../Button";
import { useState } from "react";
import ToggleSwitch from "../../ToggleSwitch";
import { api } from "../../../helpers/api";
import { useAuth } from "../../../AuthContext";
import { ShowToast } from "../../toast";

export default function Security() {
  const handleToggle = () => setIsToggled((prev) => !prev);
  const { user, refetch } = useAuth();
  const [isToggled, setIsToggled] = useState(user.isEmailNotificationOn);

  const handleToggleEmail = () => {
    api
      .editUser(user.id, { isEmailNotificationOn: !isToggled })
      .then(() => {
        ShowToast({
          type: "success",
          message: "Notification settings updated",
        });
        refetch();
      })
      .catch((err) => {
        ShowToast({
          type: "error",
          message:
            err.response?.data?.message ||
            "Failed to update notification settings",
        });
      });
    handleToggle();
  };

  return (
    <div className="md:p-[1.5rem] p-[1.25rem] w-full flex flex-col gap-[2.25rem]">
      <div className="flex flex-col gap-4">
        <span className="text-[0.75rem] font-[600] leading-[120%] uppercase tracking-[0.48px]">
          Notification settings
        </span>
        <div className="border-solid border-[1px] border-[#CBD5E1] p-4 rounded-[6px] flex flex-row justify-between w-full gap-4 items-center">
          <div className="grid gap-1.5 ">
            <span className="leading-[120%] text-[0.875rem] font-[600] text-[#0F172A]">
              Email notification
            </span>
            <p className="text-[#475569] text-[0.875rem] font-[400] leading-[150%]">
              Stay updated with important notifications sent directly to your
              email inbox.
            </p>
          </div>
          <div>
            <ToggleSwitch
              isToggled={isToggled}
              handleToggle={handleToggleEmail}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-[0.75rem] font-[600] uppercase tracking-[0.48px]">
          Current Subscription
        </span>
        <div className="border-solid border-[1px] border-[#CBD5E1] p-4 rounded-[6px] flex flex-row flex-wrap justify-between w-full gap-4 items-center">
          <div className="flex flex-row gap-3 items-center">
            <div className="py-[0.375rem] px-[0.625rem] bg-[#DECAFF] rounded-[6px] h-fit text-[#883EC2] text-[0.8125rem] font-[500] leading-[120%]">
              Standard
            </div>
            <span className="font-[700] text-[1rem] text-[#0F172A] tracking-[-0.32ppx] leading-[120%]">
              $199/month
            </span>
          </div>
          <Button className="px-[1.5rem] py-[0.675rem] h-fit !leading-[18px] md:w-auto w-full">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
}
