import { ReactComponent as DocumentIcon } from "../../../assets/icons/document-text.svg";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/download.svg";
import { ReactComponent as ViewIcon } from "../../../assets/icons/view.svg";
import UIPopover from "../../../components/Popover";
import { downloadPDF } from "../../../helpers/utils";
import moment from "moment";

export function ContractListItem({ contract, onView, onDelete }) {
  const handleDownload = (contract) => {
    console.log("Download");
    if (contract?.pdfUrl) {
      downloadPDF(contract?.pdfUrl);
    }
  };
  console.log(contract);
  return (
    <div className="bg-white w-full flex flex-row p-4 justify-between gap-5 rounded-[12px] shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)]">
      <div className="flex flex-row gap-4 items-start md:items-center">
        <div className="bg-[#F5FAF0] p-3 rounded-[8px] h-fit">
          <DocumentIcon className="[&>g>path]:fill-[#5E9B22] [&>path]:fill-[#5E9B22] w-8 h-8" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm md:text-[1.125rem] font-[500] leading-[110%] line-clamp-2 md:line-clamp-none">
            {contract?.title}
          </span>
          <span className="text-[13px] text-black/60 md:text-[0.9375rem] font-[500] leading-[110%] opacity-[0.6] line-clamp-1 md:line-clamp-none">
            {contract?.summary}
          </span>
          <span className="md:hidden text-[#808080] text-[0.875rem] font-[500]">
            {moment(contract?.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-start md:items-center">
        <span className="hidden md:inline text-[#808080] text-[0.875rem] font-[500]">
          {moment(contract?.createdAt).format("MMM DD, YYYY")}
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
                onDelete();
                close();
              }}
              onView={() => {
                console.log("View");
                close();
                onView(contract);
              }}
              onDownload={() => {
                console.log("Download");
                close();
                handleDownload(contract);
              }}
            />
          )}
        </UIPopover>
      </div>
    </div>
  );
}

const Dropdown = ({ onDelete, onView, onDownload }) => {
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
              onView();
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
              onDownload();
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
