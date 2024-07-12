import Button from "../../../components/Button";
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron.svg";
import UIPopover from "../../../components/Popover";
import { Jurisdictions } from "../../../helpers/consts";
import { useEffect, useState } from "react";

export function Jurisdiction({ onChange, value }) {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleContinue = () => {
    onChange(selectedValue);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <div className="h-full grid content-center px-5">
      <div className="p-6 gap-6 flex flex-col bg-white max-w-[600px] mx-auto rounded-[0.75rem]">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl leading-[110%] font-semibold font-outfit">
            Please Select Your Jurisdiction
          </h1>
          <p className="text-[0.9375rem] font-inter leading-[140%] md:w-full">
            Choose your jurisdiction to ensure accurate legal guidance tailored
            to your location. This helps us provide relevant and precise answers
            to your legal questions.
          </p>
        </div>

        <UIPopover
          trigger={
            <button className="px-4 py-3 flex flex-row items-center justify-between border rounded-[0.625rem] border-[#d7d7d7] w-full text-[#888] font-semibold text-sm">
              {selectedValue
                ? Jurisdictions.find((e) => e.value === selectedValue)?.name ||
                  "Select"
                : "Select"}{" "}
              <ChevronIcon className="rotate-[90deg] [&_path]:stroke-[#888888]" />
            </button>
          }
          align="center"
          positions={["bottom"]}
          shouldCloseOnScroll={false}
        >
          {(close) => (
            <div className="flex flex-col w-full bg-white rounded-[0.625rem] min-w-[200px] p-1 shadow-md max-h-[200px] overflow-auto">
              {Jurisdictions.filter((jur) => jur.name !== value).map((jur) => (
                <button
                  onClick={() => {
                    setSelectedValue(jur.value);
                    close();
                  }}
                  className={`text-sm py-2 hover:bg-[#F2F5FB] rounded-md`}
                >
                  {jur.name}
                </button>
              ))}
            </div>
          )}
        </UIPopover>

        <Button
          disabled={!selectedValue}
          onClick={handleContinue}
          className="font-medium"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export function JurisdictionDropdown({ onChange, value }) {
  return (
    <UIPopover
      trigger={
        <button className="flex flex-row gap-1 items-center font-outfit">
          <div className="flex flex-row gap-3 flex-wrap">
            <span className="md:text-lg text-sm leading-[110%]">
              Your Jurisdiction:
            </span>
            <span className="font-medium md:text-lg text-sm leading-[110%]">
              {Jurisdictions.find((jur) => jur.value === value)?.name ||
                "Select"}
            </span>
          </div>
          <ChevronIcon className="rotate-[90deg]" />
        </button>
      }
      align="center"
      positions={["bottom"]}
      shouldCloseOnScroll={false}
    >
      {(close) => (
        <div className="flex flex-col w-full bg-white rounded-[0.625rem] min-w-[200px] p-1 shadow-md max-h-[200px] overflow-auto">
          {Jurisdictions.filter((jur) => jur.name !== value).map((jur) => (
            <button
              onClick={() => {
                onChange(jur.value);
                close();
              }}
              className={`text-sm py-2 hover:bg-[#F2F5FB] rounded-md`}
            >
              {jur.name}
            </button>
          ))}
        </div>
      )}
    </UIPopover>
  );
}
