import Button from "../../Button";
import CustomInput from "../../Input";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg";
import { useState } from "react";
import { api } from "../../../helpers/api";
import { checkPasswordStrength } from "../../../helpers/utils";
import { useAuth } from "../../../AuthContext";
import { ShowToast } from "../../toast";

export default function ChangePassword({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirm: "",
  });
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .changePassword(user.id, {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })
      .then(() => {
        ShowToast({
          type: "success",
          message: "Password changed successfully",
        });
        setActiveTab("personal");
        setLoading(false);
      })
      .catch((err) => {
        ShowToast({
          type: "error",
          message: err.response?.data?.message || "Failed to change password",
        });
        setLoading(false);
      });
  };

  return (
    <form
      className="md:p-[1.5rem] p-[1.25rem] w-full flex flex-col gap-4"
      onSubmit={handleChangePassword}
    >
      <div className="flex flex-row justify-between items-center">
        <button
          className="relative p-2.5 border-solid rounded-lg border-[#D7D7D7] border-[1px]"
          onClick={() => setActiveTab("personal")}
          type="button"
        >
          <ArrowIcon className="w-5 h-5" />
        </button>
        <Button
          className="h-fit w-[100px] leading-[18px]"
          type="submit"
          loading={isLoading}
          disabled={
            form.oldPassword.length < 6 ||
            form.newPassword.length < 6 ||
            form.confirm.length < 6 ||
            form.newPassword !== form.confirm ||
            checkPasswordStrength(form.newPassword).score < 80 ||
            isLoading
          }
        >
          Change
        </Button>
      </div>

      <div className="grid gap-4">
        <CustomInput
          label="Current Password"
          type="password"
          name="oldPassword"
          id="oldPassword"
          placeholder="Enter your old password"
          value={form?.oldPassword}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              oldPassword: e.target.value,
            }));
          }}
          className="w-full"
          noIcon
        />

        <CustomInput
          label="New Password"
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="Enter your new password"
          value={form.newPassword}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              newPassword: e.target.value,
            }));
          }}
          error={
            checkPasswordStrength(form.newPassword).score < 80 &&
            form.newPassword
              ? checkPasswordStrength(form.newPassword).message
              : undefined
          }
          className="w-full"
          noIcon
        />

        {/* confirm password */}
        <CustomInput
          label="Confirm Password"
          type="password"
          name="confirm"
          id="confirm"
          placeholder="Confirm your new password"
          value={form.confirm}
          error={
            form.newPassword !== form.confirm
              ? "Password does not match"
              : undefined
          }
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              confirm: e.target.value,
            }));
          }}
          className="w-full"
          noIcon
        />
      </div>
    </form>
  );
}
