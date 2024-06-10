import Button from "../../components/Button";
import { ReactComponent as PlusIcon } from "../../assets/icons/add.svg";
import { ReactComponent as FiltersIcon } from "../../assets/icons/filters.svg";
import { ReactComponent as DocumentIcon } from "../../assets/icons/document-text.svg";
import SearchComponent from "../../components/Search";
import UIPopover from "../../components/Popover";
import { PopupModal } from "../../components/PopupModal";
import { useState } from "react";
import MobileMenu from "../../components/MobileMenu";
import { useContractGeneration } from "./context/contract-generation-context";
import { contractTypes } from "../../helpers/consts";
import { api } from "../../helpers/api";
import toast from "react-hot-toast";
import { CreateDraftForm } from "./components/CreateDraft";
import { ContractListItem } from "./components/ContractListItem";
import { ContractView } from "./components/ContractView";
import { dummyContent } from "./dummy";
import { DeleteContractDraftConfirm } from "./components/DeleteContractDraftConfirm";
import RadioButton from "../../components/RadioButton";
import Checkbox from "../../components/Checkbox";

export default function ContractDraftGeneration() {
  const [createDraftModal, setCreateDraftModal] = useState(false);
  const { search, setSearch, ...rest } = useContractGeneration() as any;
  const [selectedContract, setSelectedContract] = useState<any>();
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);
  console.log(rest);

  const onDelete = (contract) => {
    setDeleteConfirm(contract);
    // console.log("Delete");
  };

  const handleDelete = async (contract) => {};

  const onView = (contract) => {
    setSelectedContract(contract);
  };

  console.log(selectedContract);
  return (
    <div className="">
      {createDraftModal && (
        <CreateDraftForm onClose={() => setCreateDraftModal(false)} />
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

      <div className="py-[1.625rem] flex flex-col gap-[1.25rem] ">
        <div className="flex flex-row justify-between items-center md:px-[1.875rem] px-[1rem]">
          <div className="flex flex-row gap-2.5">
            <SearchComponent
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <FilterPopup />
          </div>
          <div className="hidden md:block">
            <span>Total drafts: {rest?.contractList?.length}</span>
          </div>
        </div>

        <div className="w-full px-5 md:hidden flex justify-between items-center">
          <span className="text-black text-sm font-medium leading-none">
            Total drafts: {rest?.contractList?.length}
          </span>
          <span className=" md:hidden text-black/40 text-xs font-medium leading-3">
            4/20 credits left for this month
          </span>
        </div>
        <div className="h-[calc(100vh-210px)] md:px-[1.875rem] px-[1rem] overflow-auto flex flex-col gap-4">
          {rest.loading && <CardSkeleton />}
          {!rest.loading &&
            rest.contractList?.map((contract: any) => (
              <ContractListItem
                contract={contract}
                key={contract.id}
                onView={() => onView(contract)}
                onDelete={() => onDelete(contract)}
              />
            ))}
          {!rest.loading && rest?.contractList?.length === 0 && (
            <div className="flex flex-col gap-4 items-center justify-center flex-1 py-16">
              <h1 className="text-[1.5rem] font-[500] ">
                No contracts created yet
              </h1>
              <Button
                variant="primary"
                className="flex gap-1 px-6 py-3 font-[500]"
                onClick={() => setCreateDraftModal(true)}
              >
                <PlusIcon />
                Create a contract
              </Button>
            </div>
          )}
        </div>
      </div>
      {selectedContract && (
        <ContractView
          isOpen={!!selectedContract}
          onClose={() => setSelectedContract(null)}
          contract={{ ...selectedContract, content: dummyContent }}
        />
      )}
      {!!deleteConfirm && (
        <DeleteContractDraftConfirm
          contract={deleteConfirm}
          onCancel={() => setDeleteConfirm(null)}
          onSuccess={() => {
            setSelectedContract(null);
            setDeleteConfirm(null);
          }}
        />
      )}
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
function FilterPopup() {
  const [selectedValue, setSelectedValue] = useState<string>("custom_date");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const options = [
    { label: "This week", value: "this_week" },
    { label: "This month", value: "this_month" },
    { label: "This year", value: "this_year" },
    { label: "Custom date", value: "custom_date" },
  ];

  return (
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
          className="z-20 p-[0.875rem] flex flex-col justify-center items-center bg-white shadow-[0_6px_24px_0_rgba(28,43,40,0.25)] rounded-xl py-2"
        >
          <div className="flex flex-row p-2 flex-wrap gap-4">
            <div className="flex flex-col">
              <span className="tracking-tight font-bold text-sm mb-3">
                Filter by date Created
              </span>
              <div className="flex flex-col gap-3.5">
                <RadioButton
                  name="dateFilter"
                  options={options}
                  selectedValue={selectedValue}
                  onChange={handleRadioChange}
                />
                <div className="flex flex-row gap-1 items-center">
                  <input
                    type="date"
                    className="border-[1px] rounded-md py-2 px-3 text-xs placeholder-[#999999]"
                  />
                  <span>to</span>
                  <input
                    type="date"
                    className="border-[1px] rounded-md py-2 px-3 text-xs placeholder-[#999999]"
                  />
                </div>
              </div>
            </div>

            <div className="border-r-[1px] border-black/10 md:flex hidden" />

            <div className="flex flex-col">
              <span className="tracking-tight font-bold text-sm mb-3">
                Filter by date Created
              </span>
              <div className="flex flex-col gap-3.5">
                {contractTypes.map((type, index) => (
                  <label
                    key={index}
                    htmlFor={type.label}
                    className="flex flex-row gap-1.5 font-medium text-sm items-center cursor-pointer font-inter"
                  >
                    <Checkbox
                      label={type.label}
                      className="w-[1.375rem] h-[1.375rem]"
                    />
                    {type.label}
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full !py-2">Apply</Button>
          </div>
        </div>
      )}
    </UIPopover>
  );
}
