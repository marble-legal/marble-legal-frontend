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
  disabled,
  change,
  noIcon,
  onChangeButton,
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
  disabled?: boolean;
  change?: boolean;
  noIcon?: boolean;
  onChangeButton?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(disabled);

  const handleIsDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  return (
    <div className={clsx("flex flex-col gap-[0.25rem]", className)}>
      <label
        htmlFor={id}
        className="text-[#030712] text-[0.875rem] font-[500] font-inter"
      >
        {label}
      </label>
      <div className="relative w-full">
        {!noIcon && (
          <>
            {type === "email" && (
              <EmailIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
            )}
            {type === "text" && (
              <ProfileIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
            )}
            {type === "password" && (
              <PasswordIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
            )}
          </>
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
          disabled={isDisabled}
          className={clsx(
            "bg-transparent w-full rounded-[10px] border-[1px] border-solid border-[#E2E2E2] px-4 py-3 text-[0.875rem] font-[500] font-[Inter] focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-secondaryGreen focus-visible:ring-ring ring-offset-[1px] disabled:cursor-not-allowed disabled:bg-[#F6F6F6] disabled:text-[#B4B4B4] disabled:border-[#D7D7D7] leading-[18px]",
            { "!focus-visible:!ring-errorRed": error }, // Correctly formatted conditional class
            { "pl-10": !noIcon },
            { "pl-4": noIcon }
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
        {type === "email" && change && isDisabled && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B85042] text-[0.75rem] fon-[500]"
            onClick={onChangeButton}
          >
            Change
          </button>
        )}
      </div>

      {error && <p className="text-errorRed text-[0.75rem]">{error}</p>}
    </div>
  );
}
