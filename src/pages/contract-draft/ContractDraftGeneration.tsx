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
import { useContractGeneration } from "./context/contract-generation-context";
import { contractTypes } from "../../helpers/consts";
import { api } from "../../helpers/api";
import toast from "react-hot-toast";
import { CreateDraftForm } from "./components/CreateDraft";
import { ContractListItem } from "./components/ContractListItem";
import { ContractView } from "./components/ContractView";
import { dummyContent } from "./dummy";

export default function ContractDraftGeneration() {
  const [createDraftModal, setCreateDraftModal] = useState(false);
  const rest = useContractGeneration() as any;
  const [selectedContract, setSelectedContract] = useState<any>();
  console.log(rest);

  const onDelete = (e, contract) => {
    e.stopPropagation();
    // setDeleteConfirm(true);
    // console.log("Delete");
  };

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
          {rest.loading && <CardSkeleton />}
          {rest.contractList?.map((contract: any) => (
            <ContractListItem
              contract={contract}
              key={contract.id}
              onView={() => onView(contract)}
              onDelete={(e) => onDelete(e, contract)}
            />
          ))}
        </div>
      </div>
      {selectedContract && (
        <ContractView
          isOpen={!!selectedContract}
          onClose={() => setSelectedContract(null)}
          contract={{ ...selectedContract, content: dummyContent }}
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
