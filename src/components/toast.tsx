import toast from "react-hot-toast";
import { ReactComponent as Check } from "../assets/icons/check-mark.svg";
import { ReactComponent as Cross } from "../assets/icons/x.svg";

export function ShowToast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  toast.custom((t) => (
    <div
      className={`z-[99999] max-w-[50vw] px-4 py-2.5 ${
        type === "success" ? "bg-primary" : "bg-red-50"
      } rounded border ${
        type === "success" ? "border-primary" : "border-red-600"
      } border-opacity-20 justify-start items-center gap-1.5 inline-flex`}
    >
      {type === "success" ? (
        <Check className="w-5 h-5 relative [&>path]:stroke-white" />
      ) : (
        <Cross className="w-5 h-5 relative [&>path]:stroke-red-600" />
      )}
      <div
        className={`${
          type === "success" ? "text-white" : "text-red-500"
        } text-sm font-medium leading-normal`}
      >
        {message}
      </div>
    </div>
  ));
}
