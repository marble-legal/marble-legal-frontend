import clsx from "clsx";
import Spinner from "./Spinners";

export default function Button({
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
  variant?: "primary" | "link" | "ghost";
}) {
  const variants = {
    primary:
      "px-6 py-3 bg-secondaryRed rounded-[10px] justify-center items-center gap-1.5 inline-flex text-[#FAFAFA] text-[0.875rem] disabled:bg-[#E2E2E2] disabled:text-[#888] transition-all shadow-button focus-visible:outline-secondaryRed focus-visible:ring-[1px] focus-visible:ring-secondaryRed focus-visible:ring-offset-[1px] focus-visible:ring-offset-[1px] disabled:cursor-not-allowed disabled:bg-[#D7D7D7] disabled:shadow-disabledButton disabled:text-[#888]",
    // ghost like primary but with a transparent background
    ghost:
      "px-6 py-3 bg-transparent rounded-[10px] justify-center items-center gap-1.5 inline-flex text-secondaryRed text-[0.875rem] disabled:text-[#888] transition-all shadow-button focus-visible:outline-secondaryRed focus-visible:ring-[1px] focus-visible:ring-secondaryRed focus-visible:ring-offset-[1px] focus-visible:ring-offset-[1px] disabled:cursor-not-allowed disabled:shadow-disabledButton disabled:text-[#888] hover:bg-[#F2F5FB]",
    link: "text-secondaryRed text-[0.875rem] transition-all font-[600] hover:underline",
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
