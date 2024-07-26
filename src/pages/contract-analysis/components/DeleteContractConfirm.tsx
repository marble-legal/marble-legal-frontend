import { useState } from "react";
import { PopupModal } from "../../../components/PopupModal";
import { ShowToast } from "../../../components/toast";
import { api } from "../../../helpers/api";
import Button from "../../../components/Button";
import { useContractAnalysis } from "../contract-analysis-context";

export function DeleteContractConfirm({
  onCancel,
  contract,
}: {
  onCancel: () => void;
  contract: any;
}) {
  const { refetchContractList, setSelectedContract } =
    useContractAnalysis() as any;
  const [deleting, setDeleting] = useState(false);
  const onDelete = async () => {
    try {
      setDeleting(true);
      const response = await api.deleteContract(contract.id);
      if ([200, 201].includes(response.status)) {
        setDeleting(false);
        refetchContractList();
        setSelectedContract(null);
        onCancel();
        ShowToast({
          type: "success",
          message: "Contract Deleted!",
        });
      }
    } catch (error: any) {
      setDeleting(false);
      ShowToast({
        type: "error",
        message: error?.response?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <PopupModal contentClassName="p-8 z-[22] w-[98%] self-center bg-white rounded-2xl flex-col justify-start items-center gap-6 flex w-full md:mx-auto md:w-[442px] max-w-[442px]">
      <div className="flex flex-col w-full">
        <p
          className="text-center text-xl text-black/80 font-medium"
          style={{ wordBreak: "break-all" }}
        >
          Are you sure you want to delete contract "{contract.title}"?
        </p>
        <div className="flex gap-3 items-center w-full mt-8">
          <Button
            onClick={onCancel}
            variant="outline"
            className="!rounded-full w-full flex-1"
            disabled={deleting}
          >
            Go Back
          </Button>
          <Button
            onClick={onDelete}
            className="!rounded-full w-full flex-1"
            variant="primary"
            disabled={deleting}
            loading={deleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </PopupModal>
  );
}
