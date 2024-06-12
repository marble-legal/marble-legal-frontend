import Button from "../../Button";
import CustomInput from "../../Input";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg";
import { useState } from "react";
import { api } from "../../../helpers/api";
import toast from "react-hot-toast";
import { useAuth } from "../../../AuthContext";

export default function DeleteAccount({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });

  const handleDeleteAccount = () => {
    console.log(user.id);
    setLoading(true);
    api
      .deleteUser(user.id, form.password)
      .then(() => {
        toast.success("Account deleted successfully");
        localStorage.clear();
        setLoading(false);
      })
      .catch((err) => {
        // handle error;
        toast.error(err.response.data.message || "An error occurred");
        setLoading(false);
      });
  };

  return (
    <div className="md:p-[1.5rem] p-[1.25rem] w-full flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <button
          className="relative p-2.5 border-solid rounded-lg border-[#D7D7D7] border-[1px]"
          onClick={() => setActiveTab("personal")}
        >
          <ArrowIcon className="w-5 h-5" />
        </button>
        <Button
          className="h-fit w-[100px] leading-[18px]"
          onClick={handleDeleteAccount}
          disabled={form.confirm !== "Confirm" || form.password.length < 8}
          loading={loading}
        >
          Delete
        </Button>
      </div>

      <div className="grid gap-4">
        <CustomInput
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your full name"
          value={form.password}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
          className="w-full"
          noIcon
        />

        <CustomInput
          label="Please write “Confirm” below"
          type="text"
          name="confirm"
          id="confirm"
          placeholder="Enter Confirm"
          value={form.confirm}
          onChange={(e) => {
            setForm((prev) => ({
              ...prev,
              confirm: e.target.value,
            }));
          }}
          className="w-full"
          noIcon
        />

        <p className="text-xs font-medium text-[#888]">
          Deleting your account will{" "}
          <span className="text-[#B85042] font-semibold">remove</span> all of
          your information from our database. This cannot be{" "}
          <span className="text-[#B85042] font-semibold">undone</span>.
        </p>
      </div>
    </div>
  );
}
