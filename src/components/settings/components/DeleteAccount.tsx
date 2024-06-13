import Button from "../../Button";
import CustomInput from "../../Input";
import { ReactComponent as ArrowIcon } from "../../../assets/icons/arrow.svg";
import { useState } from "react";
import { api } from "../../../helpers/api";
import { useAuth } from "../../../AuthContext";
import { ShowToast } from "../../toast";
import { useNavigate } from "react-router-dom";

export default function DeleteAccount({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
    // confirm: "",
  });
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    console.log(user.id);
    setLoading(true);
    api
      .deleteUser(user.id, form.password)
      .then(() => {
        ShowToast({
          type: "success",
          message: "Account deleted successfully",
        });
        localStorage.clear();
        navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        // handle error;
        ShowToast({
          type: "error",
          message: err.response.data.message || "An error occurred",
        });
        setLoading(false);
      });
  };

  return (
    <div className="md:p-[1.5rem] p-[1.25rem] w-full flex flex-col gap-4">
      {/* Desktop */}
      <div className=" md:flex hidden flex-row justify-between items-center">
        <button
          className="relative p-2.5 border-solid rounded-lg border-[#D7D7D7] border-[1px]"
          onClick={() => setActiveTab("personal")}
        >
          <ArrowIcon className="w-5 h-5" />
        </button>

        <Button
          className="h-fit w-[100px] leading-[18px] flex"
          onClick={handleDeleteAccount}
          // disabled={form.confirm !== "Confirm" || form.password.length < 8}
          disabled={form.password.length < 8}
          loading={loading}
        >
          Delete
        </Button>
      </div>
      {/* END */}

      <div className="grid gap-4">
        <CustomInput
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
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

        <p className="text-xs font-medium text-[#888]">
          Deleting your account will{" "}
          <span className="text-[#B85042] font-semibold">remove</span> all of
          your information from our database. This cannot be{" "}
          <span className="text-[#B85042] font-semibold">undone</span>.
        </p>

        {/* Mobile */}
        <Button
          className="h-fit leading-[18px] md:hidden flex w-full"
          onClick={handleDeleteAccount}
          // disabled={form.confirm !== "Confirm" || form.password.length < 8}
          disabled={form.password.length < 8}
          loading={loading}
        >
          Delete
        </Button>
        {/* END */}
      </div>
    </div>
  );
}
