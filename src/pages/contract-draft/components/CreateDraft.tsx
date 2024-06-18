import { useState } from "react";
import Button from "../../../components/Button";
import { api } from "../../../helpers/api";
import { PopupModal } from "../../../components/PopupModal";
import { ReactComponent as CloseIcon } from "../../../assets/icons/x.svg";
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron.svg";
import { contractTypes } from "../../../helpers/consts";
import UIPopover from "../../../components/Popover";
import { ShowToast } from "../../../components/toast";

export const CreateDraftForm = ({
  onClose,
  onUpdate,
}: {
  onClose: () => void;
  onUpdate: () => Promise<void>;
}) => {
  const [form, setForm] = useState({
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    api
      .createContract(form)
      .then(async (res) => {
        if ([200, 201].includes(res.status)) {
          await onUpdate();
          ShowToast({
            type: "success",
            message: "Contract draft created successfully",
          });
          onClose();
          setForm({ type: "", content: "" });
          setLoading(false);
        } else {
          setLoading(false);
          ShowToast({
            type: "error",
            message: res?.data?.message || "Failed to create contract draft",
          });
        }
      })
      .catch((err) => {
        ShowToast({
          type: "error",
          message:
            err.response?.data?.message || "Failed to create contract draft",
        });
        setLoading(false);
      });
  };

  return (
    <PopupModal
      //   title="Create a new draft"
      //   isOpen={true}
      contentClassName="md:w-[600px] mx-auto !gap-0"
      onClose={onClose}
    >
      <div className="flex flex-row justify-between items-center">
        <span className="font-outfit text-[1.25rem] font-[600]">
          Create a contract draft
        </span>
        <CloseIcon className="cursor-pointer" onClick={onClose} />
      </div>
      <p className="mt-3 text-[0.9375rem] font-[400] leading-[140%]">
        Select the type of the contract and summaries your requirements below,
        make sure to write as much details as you can for accurate results
      </p>
      <div className="flex flex-col gap-5 my-6">
        <label htmlFor="type" className="flex flex-col gap-2 relative">
          <span className="font-medium text-[13px] text-black">
            Type of contract
          </span>
          <UIPopover
            trigger={
              <button className="px-4 py-3 flex flex-row justify-between border-[#D7D7D7] border-[1px] border-solid rounded-[10px] items-center w-full">
                {form.type || "Choose the type"}{" "}
                <ChevronIcon className="rotate-[90deg] [&_path]:stroke-[#888888]" />
              </button>
            }
            containerClassName="md:w-[500px]"
          >
            {(close) => (
              <div
                style={{ zIndex: 2 }}
                className="!p-2 z-20 flex flex-col justify-center items-center bg-white shadow-[0_6px_24px_0_rgba(28,43,40,0.25)] rounded-xl py-2 mr-8"
              >
                {contractTypes.map((type) => (
                  <button
                    className="w-full font-[500] px-3 h-10 flex gap-2.5 items-center text-[0.875rem] rounded-[10px] hover:bg-[#F1F6F1]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm({ ...form, type: type.value });
                      close();
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </UIPopover>
        </label>
        <label htmlFor="requirement" className="flex flex-col gap-2">
          <span className="font-medium text-[13px] text-black">
            Enter your requirements
          </span>
          <textarea
            id="requirement"
            className="px-4 py-3 flex flex-row justify-between border-[#D7D7D7] border-[1px] border-solid rounded-[10px] items-center min-h-[150px]"
            placeholder='e.g. "I need an employment agreement for John Doe as a Software Engineer starting June 1, 2024, with an annual salary of $80,000, paid bi-weekly, including benefits, confidentiality, and a 30-day termination notice.”'
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </label>
      </div>
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={!form.type || !form.content || form.content?.length < 100}
      >
        Generate contract draft
      </Button>
    </PopupModal>
  );
};
