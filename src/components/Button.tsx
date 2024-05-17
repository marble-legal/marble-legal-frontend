import clsx from "clsx";
import Spinner from "./Spinners";

export default function CustomButton({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  loading,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  variant?: "primary" | "link";
}) {
  const variants = {
    primary:
      "h-10 px-6 py-2 bg-secondaryRed rounded-[10px] flex-col justify-center items-center gap-1.5 inline-flex text-[#FAFAFA] text-[0.875rem] disabled:bg-[#E2E2E2] disabled:text-[#888] transition-all shadow-button focus-visible:outline-secondaryRed focus-visible:ring-[1px] focus-visible:ring-secondaryRed focus-visible:ring-offset-[1px] focus-visible:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50",
    link: "text-secondaryRed text-[0.875rem] transition-all font-[700] hover:underline",
  };

  return (
    <button
      className={clsx(variants[variant], className)}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
