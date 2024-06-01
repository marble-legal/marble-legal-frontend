import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface SelectableProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  readonly?: boolean;
}

const Selectable: React.FC<SelectableProps> = ({
  checked = false,
  onChange,
  readonly = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div
      //   onClick={handleToggle}
      //   className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded-md ${
      //     isChecked ? "bg-green-500" : "bg-gray-300"
      //   }`}
      className={clsx(
        "w-6 h-6 flex items-center justify-center cursor-pointer rounded-md",
        isChecked ? "bg-green-500" : "bg-gray-300",
        readonly && "cursor-not-allowed"
      )}
      onClick={readonly ? undefined : handleToggle}
    >
      {isChecked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
};

export default Selectable;
