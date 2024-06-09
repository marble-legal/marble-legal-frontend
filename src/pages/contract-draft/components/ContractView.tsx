import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import FullScreenModal from "../../../components/FullScreenModal";
import { EditContractView } from "./EditContractView";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../../assets/icons/edit.svg";
import { ReactComponent as CopyIcon } from "../../../assets/icons/copy.svg";
import { ReactComponent as DiscardIcon } from "../../../assets/icons/x.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/check.svg";

import { ReactComponent as DownloadIcon } from "../../../assets/icons/download.svg";
import { DeleteContractDraftConfirm } from "./DeleteContractDraftConfirm";
import { downloadPDF } from "../../../helpers/utils";

function ViewAction({ onEdit, onDownload, onCopy }) {
  return (
    <div className="bg-white md:bg-transparent text-xs md:text-sm rounded-[10px] px-6 md:px-0 flex items-center gap-3">
      <button
        onClick={onDownload}
        className="py-4 flex items-center gap-1.5 hover:text-black/60"
      >
        <DownloadIcon />
        Download
      </button>
      <div className="h-3 border-l border-l-[#A69EC8]/60" />
      <button
        onClick={onEdit}
        className="py-4 flex items-center gap-1.5 hover:text-black/60"
      >
        <EditIcon />
        Edit
      </button>
      <div className="h-3 border-l border-l-[#A69EC8]/60" />
      <button
        onClick={onCopy}
        className="py-4 flex items-center gap-1.5 hover:text-black/60"
      >
        <CopyIcon className="[&_path]:stroke-[#64B667]" />
        Copy
      </button>
    </div>
  );
}

export function EditAction({ onDiscard, onSave }) {
  return (
    <div className="bg-white md:bg-transparent text-xs md:text-sm rounded-[10px] px-6 md:px-0 flex justify-center md:justify-start items-center gap-3">
      <button
        onClick={onDiscard}
        className="py-4 flex items-center gap-1.5 hover:text-black/60"
      >
        <DiscardIcon className="[&_path]:stroke-[#64B667] " />
        Discard changes
      </button>
      <div className="h-3 border-l border-l-[#A69EC8]/60" />
      <button
        onClick={onSave}
        className="py-4 flex items-center gap-1.5 hover:text-black/60"
      >
        <CheckIcon />
        Save
      </button>
    </div>
  );
}

export function ContractView({ isOpen, onClose, contract }) {
  console.log(contract);
  const [edit, setEdit] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const handleChange = (value) => {
    console.log(value);
    setEdit({ ...edit, content: value });
  };

  const onDelete = (contract) => {
    setDeleteConfirm(contract);
    // console.log("Delete");
  };

  const handleDownload = (contract) => {
    console.log("Download");
    if (contract?.pdfUrl) {
      downloadPDF(contract?.pdfUrl);
    }
  };

  return (
    <FullScreenModal
      contentClassName="!pt-[108px] md:!pt-12"
      isOpen={isOpen}
      onClose={onClose}
      customContentClassName="!p-1"
      actionView={
        <div className="md:hidden absolute top-12 left-2.5 right-2.5">
          {!edit ? (
            <>
              <div className="flex items-center gap-1.5 justify-center">
                <ViewAction
                  onCopy={() => console.log("Copy")}
                  onDownload={() => handleDownload(contract)}
                  onEdit={() => setEdit(contract)}
                />
                <div className="bg-white md:bg-transparent rounded-[10px] px-2.5 text-xs md:text-sm">
                  <button
                    onClick={() => onDelete(contract)}
                    className="py-4 flex items-center gap-1.5 hover:text-black/60"
                  >
                    <DeleteIcon />
                    Delete
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <EditAction onDiscard={() => setEdit(null)} onSave={() => {}} />
            </>
          )}
        </div>
      }
    >
      {!edit ? (
        <>
          <div className="hidden w-[682px] mx-auto md:flex justify-between items-center gap-4">
            <ViewAction
              onCopy={() => console.log("Copy")}
              onDownload={() => handleDownload(contract)}
              onEdit={() => setEdit(contract)}
            />
            <button
              onClick={() => onDelete(contract)}
              className="py-4 flex items-center gap-1.5 hover:text-black/60"
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
          <div className="h-[calc(100vh-110px)] overflow-auto">
            <div className="md:w-[682px] mx-auto bg-white rounded-[12px] md:p-7 [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-black">
              <MDEditor.Markdown source={contract.content} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hidden w-[682px] mx-auto md:flex justify-between items-center gap-4">
            <div>
              <span className="text-[28px] font-bold text-black">Edit</span>
            </div>
            <EditAction onDiscard={() => setEdit(null)} onSave={() => {}} />
          </div>
          {!!edit && (
            <EditContractView
              contract={edit}
              onDiscard={() => setEdit(null)}
              isOpen={edit}
              onChange={handleChange}
            />
          )}
        </>
      )}

      {!!deleteConfirm && (
        <DeleteContractDraftConfirm
          contract={deleteConfirm}
          onCancel={() => setDeleteConfirm(null)}
          onSuccess={() => {
            onClose();
            setDeleteConfirm(null);
          }}
        />
      )}
    </FullScreenModal>
  );
}
