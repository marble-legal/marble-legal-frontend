import Button from "../../components/Button";
import { ReactComponent as PlusIcon } from "../../assets/icons/add.svg";
import { ReactComponent as FiltersIcon } from "../../assets/icons/filters.svg";
import { ReactComponent as DocumentIcon } from "../../assets/icons/document-text.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/more.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import { ReactComponent as ViewIcon } from "../../assets/icons/view.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/x.svg";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron.svg";
import SearchComponent from "../../components/Search";
import UIPopover from "../../components/Popover";
import { PopupModal } from "../../components/PopupModal";
import { useState } from "react";
import MobileMenu from "../../components/MobileMenu";
import { useContractAnalysis } from "../contract-analysis/contract-analysis-context";
import { contractTypes } from "../../helpers/consts";
import { api } from "../../helpers/api";
import toast from "react-hot-toast";

export default function ContractDraftGeneration() {
  const [createDraftModal, setCreateDraftModal] = useState(false);
  const { contractsList, loading } = useContractAnalysis() as any;
  console.log(contractsList);

  return (
    <div className="">
      {createDraftModal && (
        <CreateDraft onClose={() => setCreateDraftModal(false)} />
      )}
      <MobileMenu
        renderAction={
          <Button
            className="!p-2 ml-auto float-end"
            onClick={() => setCreateDraftModal(true)}
          >
            <PlusIcon />
          </Button>
        }
      />

      <div className="shadow-header px-[1.875rem] py-4 md:flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center hidden">
        <h1 className="font-outfit text-[1.25rem] font-[500]">
          Contract draft generation
        </h1>

        <div className="flex flex-row gap-3 items-center">
          <span className="text-[0.875rem]">
            4/20 credits left for this month
          </span>
          <Button
            variant="primary"
            className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
            onClick={() => setCreateDraftModal(true)}
          >
            <PlusIcon />
            Create a contract
          </Button>
        </div>
      </div>

      <div className="py-[1.625rem] flex flex-col gap-[1.25rem] md:px-[1.875rem] px-[1rem]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2.5">
            <SearchComponent
              onChange={(e) => console.log(e.target.value)}
              value=""
            />
            <UIPopover
              trigger={
                <Button
                  variant="outline"
                  className="flex flex-row gap-1.5 items-center bg-white h-full"
                >
                  <FiltersIcon />
                  Filters
                </Button>
              }
            >
              {(close) => (
                <div
                  style={{ zIndex: 9999 }}
                  className="z-20 p-4 flex flex-col justify-center items-center bg-white shadow-[0_6px_24px_0_rgba(28,43,40,0.25)] rounded-xl py-2 mr-8"
                >
                  <h1>something</h1>
                </div>
              )}
            </UIPopover>
          </div>
          <span>Total drafts: 36</span>
        </div>
        <div className="flex flex-col gap-4">
          {loading && <CardSkeleton />}
          {/* <CardSkeleton /> */}
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

function Card() {
  const onDelete = (e) => {
    e.stopPropagation();
    // setDeleteConfirm(true);
    // console.log("Delete");
  };

  return (
    <div className="bg-white w-full flex flex-row p-4 justify-between rounded-[12px] shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)]">
      <div className="flex flex-row gap-4 items-center">
        <div className="bg-[#F5FAF0] p-3 rounded-[8px] h-fit">
          <DocumentIcon className="[&>g>path]:fill-[#5E9B22] [&>path]:fill-[#5E9B22] w-8 h-8" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[1.125rem] font-[500] leading-[110%]">
            Employment Agreement Summary
          </span>
          <span className="text-[0.9375rem] font-[500] leading-[110%] opacity-[0.6]">
            An overview of key terms and conditions for hiring an employee.
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <span className="text-[#808080] text-[0.875rem] font-[500]">
          Apr 20,2024
        </span>
        <UIPopover
          trigger={
            <div className="cursor-pointer rounded-[6px] border-[1px] border-solid border-[#DDD7D7] hover:border-[#7F7F7F] p-1.5 transition-all">
              <MoreIcon />
            </div>
          }
        >
          {(close) => (
            <Dropdown
              onDelete={(e) => {
                onDelete(e);
                close();
              }}
            />
          )}
        </UIPopover>
      </div>
    </div>
  );
}
function CardSkeleton() {
  return (
    <div className="bg-white w-full flex flex-row p-4 justify-between rounded-[12px] shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] animate-pulse">
      <div className="flex flex-row gap-4 items-center">
        <div className="bg-[#F5FAF0] p-3 rounded-[8px] h-fit">
          <DocumentIcon className="[&>g>path]:fill-[#5E9B22] [&>path]:fill-[#5E9B22] w-8 h-8" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#E0E0E0] h-[1.125rem] w-[200px] rounded"></div>
          <div className="bg-[#E0E0E0] h-[0.9375rem] w-[250px] rounded"></div>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <div className="bg-[#E0E0E0] h-[0.875rem] w-[100px] rounded"></div>
        <div className="cursor-pointer rounded-[6px] border-[1px] border-solid border-[#E0E0E0] p-1.5 transition-all">
          <div className="bg-[#E0E0E0] w-5 h-5 rounded"></div>
        </div>
      </div>
    </div>
  );
}

const Dropdown = ({ onDelete }) => {
  return (
    <div
      style={{ zIndex: 2 }}
      className="z-20 flex flex-col justify-center items-center bg-white shadow-[0_6px_24px_0_rgba(28,43,40,0.25)] rounded-xl py-2 mr-8"
    >
      <ul
        className="p-1 text-sm text-gray-700 text-start"
        aria-labelledby="dropdownMenuIconButton"
      >
        <li>
          <button
            className="w-full text-[#808080] font-[500] px-3 h-10 flex gap-2.5 items-center text-base rounded-[10px] hover:bg-[#F1F6F1]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ViewIcon />
            View
          </button>
        </li>
        <li>
          <button
            className="w-full text-[#808080] font-[500] px-3 h-10 flex gap-2.5 items-center text-base rounded-[10px] hover:bg-[#F1F6F1]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DownloadIcon />
            Download
          </button>
        </li>
        <li>
          <button
            className="w-full text-[#808080] font-[500] px-3 h-10 flex gap-2.5 items-center text-base rounded-[10px] hover:bg-[#F1F6F1]"
            onClick={(e) => {
              e.stopPropagation();

              onDelete(e);
            }}
          >
            <DeleteIcon />
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

const CreateDraft = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({
    type: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    api
      .createContract(form)
      .then((res) => {
        toast.success("Contract draft created successfully");
        onClose();
        setForm({ type: "", content: "" });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Failed to create contract draft"
        );
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
        <label
          htmlFor="type"
          className="text-[#030712] text-[0.875rem] font-[Inter] font-[500] font-[Inter] flex flex-col gap-2 relative"
        >
          <span>Type of contract</span>
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
        <label
          htmlFor="requirement"
          className="text-[#030712] text-[0.875rem] font-[Inter] font-[500] font-[Inter] flex flex-col gap-2"
        >
          Enter your requirements
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
        disabled={!form.type || !form.content}
      >
        Generate contract draft
      </Button>
    </PopupModal>
  );
};
