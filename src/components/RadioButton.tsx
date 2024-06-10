import React from "react";

interface RadioOption {
  label: string;
  value: string;
}

interface CustomRadioButtonProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<CustomRadioButtonProps> = ({
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            id={option.value}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="hidden"
          />
          <label
            htmlFor={option.value}
            className={`flex items-center cursor-pointer font-[500] text-sm font-inter ${
              selectedValue === option.value ? "text-black" : "text-[#888]"
            }`}
          >
            <span
              className={`w-[1.375rem] h-[1.375rem] mr-1.5 inline-block rounded-full border-[1px] relative ${
                selectedValue === option.value
                  ? "bg-[#B85042] border-[#B85042]"
                  : "border-[#8D8E92]"
              }`}
            >
              <span
                className="bg-[white] w-2.5 h-2.5 absolute
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full
              "
              ></span>
            </span>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButton;
