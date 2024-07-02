import { useEffect, useState } from "react";
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
import {
  copyToClipboard,
  downloadDoc,
  downloadPDF,
} from "../../../helpers/utils";
import ReactQuill from "react-quill";
import { ShowToast } from "../../../components/toast";
import { api } from "../../../helpers/api";
import Spinner from "../../../components/Spinners";

function ViewAction({ onEdit, onDownload, onCopy, isCopied, onDocDownload }) {
  return (
    <div className="bg-white md:bg-transparent text-xs md:text-sm rounded-[10px] px-6 md:px-0 flex items-center gap-3">
      <button
        onClick={onDownload}
        className="py-4 flex items-center gap-1.5 hover:text-black/60"
      >
        <DownloadIcon />
        <span className="hidden lg:inline">Download </span>PDF
      </button>
      <button
        onClick={onDocDownload}
        className="py-4 flex items-center gap-1.5 hover:text-black/60"
      >
        <DownloadIcon />
        <span className="hidden lg:inline">Download </span>Docx
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
        <CopyIcon
          className={`${
            isCopied
              ? "[&_path]:fill-[#B7FAC9] [&_path]:stroke-[#34A853]"
              : "[&_path]:stroke-[#64B667]"
          }`}
        />
        Copy
      </button>
    </div>
  );
}

export function EditAction({ onDiscard, onSave, saving }) {
  return (
    <div className="bg-white md:bg-transparent text-xs md:text-sm rounded-[10px] px-6 md:px-0 flex justify-center md:justify-start items-center gap-[60px] md:gap-3">
      <button
        onClick={onDiscard}
        className="py-4 flex items-center gap-1.5 text-xs font-medium text-black hover:text-black/60"
      >
        <DiscardIcon className="[&_path]:stroke-[#64B667] !w-5 !h-5" />
        Discard changes
      </button>
      <div className="hidden md:block h-3 border-l border-l-[#A69EC8]/60" />
      <button
        onClick={() => {
          onSave();
        }}
        className="py-4 flex items-center gap-1.5 text-xs font-medium text-black hover:text-black/60"
      >
        <CheckIcon className=" !w-5 !h-5" />
        Save
        {saving && (
          <div className="[&_circle]:stroke-primary [&_path]:fill-primary">
            <Spinner />
          </div>
        )}
      </button>
    </div>
  );
}

export function ContractView({ isOpen, onClose, contract, onUpdate }) {
  const [contractDetails, setContractDetails] = useState<any>(contract);
  const [edit, setEdit] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    copyToClipboard("contract-content");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const handleChange = (value) => {
    setEdit({ ...edit, generatedContent: value });
  };

  const onDelete = (contract) => {
    setDeleteConfirm(contract);
  };

  const fetchContract = async (contractId: string) => {
    try {
      const response = await api.getContract(contractId);
      if (response?.data) {
        setContractDetails(response.data);
      }
    } catch (e) {}
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        content: edit.generatedContent,
      };
      const response = await api.updateContract(edit.id, payload);
      if ([200, 201].includes(response.status)) {
        setEdit(null);
        await onUpdate();
        await fetchContract(edit.id);
        setSaving(false);
        ShowToast({
          type: "success",
          message: "Contract saved successfully",
        });
      } else {
        setSaving(false);
        ShowToast({
          type: "error",
          message: "Unable to save contract",
        });
      }
    } catch (e) {
      setSaving(false);
      ShowToast({
        type: "error",
        message: "Failed to save contract",
      });
    }
  };

  const handleDownload = (contract) => {
    if (contract?.pdfUrl) {
      downloadPDF(contract?.pdfUrl);
    }
  };

  const handleDocDownload = (contract) => {
    if (contract?.docUrl) {
      downloadDoc(contract?.docUrl);
    }
  };

  useEffect(() => {
    if (isOpen && contract) {
      fetchContract(contract.id);
    }
  }, [isOpen, contract]);

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
                  onCopy={handleCopy}
                  onDownload={() => handleDownload(contractDetails)}
                  onEdit={() => setEdit({ ...contractDetails })}
                  isCopied={isCopied}
                  onDocDownload={() => handleDocDownload(contractDetails)}
                />
                <div className="bg-white md:bg-transparent rounded-[10px] px-2.5 text-xs md:text-sm">
                  <button
                    onClick={() => onDelete(contractDetails)}
                    className="py-4 flex items-center gap-1.5 hover:text-black/60"
                  >
                    <DeleteIcon />
                    <span className="hidden lg:inline">Delete</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <EditAction
                onDiscard={() => setEdit(null)}
                onSave={handleSave}
                saving={saving}
              />
            </>
          )}
        </div>
      }
    >
      {!edit ? (
        <>
          <div className="hidden w-[682px] mx-auto md:flex justify-between items-center gap-4">
            <ViewAction
              onCopy={handleCopy}
              onDownload={() => handleDownload(contractDetails)}
              onEdit={() => setEdit(contractDetails)}
              isCopied={isCopied}
              onDocDownload={() => handleDocDownload(contractDetails)}
            />
            <button
              onClick={() => onDelete(contractDetails)}
              className="py-4 flex items-center gap-1.5 hover:text-black/60"
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
          <div className="h-[calc(100dvh-110px)] overflow-auto">
            <div
              // dangerouslySetInnerHTML={{ __html: contract.generatedContent }}
              className="md:w-[682px] mx-auto bg-white rounded-[12px] md:p-7 [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-black"
              id="contract-content"
            >
              <ReactQuill
                theme="bubble"
                value={contractDetails.generatedContent}
                readOnly={true}
              />
              {/* <MDEditor.Markdown source={contract.generatedContent} /> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hidden w-[682px] mx-auto md:flex justify-between items-center gap-4">
            <div>
              <span className="text-[28px] font-bold text-black">Edit</span>
            </div>
            <EditAction
              onDiscard={() => setEdit(null)}
              onSave={handleSave}
              saving={saving}
            />
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
