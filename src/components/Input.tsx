import clsx from "clsx";
import { useState } from "react";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";
import { ReactComponent as ShowIcon } from "../assets/icons/show.svg";
import { ReactComponent as HideIcon } from "../assets/icons/hide.svg";
import { ReactComponent as EmailIcon } from "../assets/icons/email.svg";
import { ReactComponent as PasswordIcon } from "../assets/icons/password.svg";
export default function CustomInput({
  label,
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  className,
  error,
  ...props
}: {
  label: string;
  type: string;
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: any;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={clsx("flex flex-col gap-[0.25rem]", className)}>
      <label
        htmlFor={id}
        className="text-[#030712] text-[0.875rem] font-[Inter] font-[500] font-[Inter]"
      >
        {label}
      </label>
      <div className="relative w-full">
        {type === "email" && (
          <EmailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        )}
        {type === "text" && (
          <ProfileIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        )}
        {type === "password" && (
          <PasswordIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        )}

        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={40}
          className={clsx(
            "w-full rounded-[10px] border-[1px] border-solid border-[#E2E2E2] pl-10 px-4 py-3 text-[0.875rem] font-[500] font-[Inter] focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-secondaryGreen focus-visible:ring-ring ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50",
            { "focus-visible:ring-errorRed": error } // Correctly formatted conditional class
          )}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <ShowIcon /> : <HideIcon />}
          </button>
        )}
      </div>

      {error && <p className="text-errorRed text-[0.75rem]">{error}</p>}
    </div>
  );
}
