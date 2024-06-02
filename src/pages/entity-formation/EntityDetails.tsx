import FullScreenModal from "../../components/FullScreenModal";
import { EntityDetailsCard } from "./EntityFormation";

export default function EntityDetails({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <FullScreenModal isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-[800px] items-center justify-center flex flex-col w-full mx-auto -m-4 gap-5">
        <EntityDetailsCard data={{ status: "Completed" }} />
        <OwnerDetails />
      </div>
    </FullScreenModal>
  );
}

function OwnerDetails() {
  return (
    <div className="bg-white p-4 rounded-lg w-full shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Owners information</h1>
      <div className="border-solid border-[1px] border-[#E0E9FD] rounded-[10px] bg-[#F8FBFF] p-4 flex flex-col gap-[0.875rem]">
        <span className="text-[0.875rem] font-[500] leading-[110%]">
          Owners 1 Information
        </span>
        <div className="flex flex-row">
          <span>Owner name</span>
          <span>John smith</span>
        </div>
        <div className="flex flex-row">
          <span>Ownership percentage</span>
          <span>50%</span>
        </div>
        <div className="flex flex-row">
          <span>Owner address</span>
          <span>1100 Plum Creek Pkwy</span>
        </div>
      </div>
    </div>
  );
}
