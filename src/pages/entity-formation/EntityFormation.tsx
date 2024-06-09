import Button from "../../components/Button";
import { ReactComponent as PlusIcon } from "../../assets/icons/add.svg";
import { ReactComponent as BuildingIcon } from "../../assets/icons/buliding.svg";
import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as BIcon } from "../../assets/icons/b.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import clsx from "clsx";
import { useState } from "react";
import EntityDetails from "./EntityDetails";
import MobileMenu from "../../components/MobileMenu";
import CreateEntity from "./CreateEntity";

export default function EntityFormation() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateEntityOpen, setIsCreateEntityOpen] = useState(false);
  const [entityData, setEntityData] = useState({} as any);
  const handleDetailsClose = () => setIsDetailsOpen(false);

  console.log("entityData", isDetailsOpen);

  const handleOpenDetails = () => {
    setIsDetailsOpen(true);
    setEntityData({});
  };

  return (
    <div>
      <MobileMenu
        renderAction={
          <Button
            className="!p-2 ml-auto float-end"
            onClick={() => {
              setIsCreateEntityOpen(true);
            }}
          >
            <PlusIcon />
          </Button>
        }
      />
      <EntityDetails isOpen={isDetailsOpen} handleClose={handleDetailsClose} />
      <CreateEntity
        isOpen={isCreateEntityOpen}
        handleClose={() => setIsCreateEntityOpen(false)}
      />
      <div className="shadow-header px-[1.875rem] py-4 md:flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center hidden">
        <h1 className="font-outfit text-[1.25rem] font-[500]">
          Business Entity formation
        </h1>

        <Button
          variant="primary"
          className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
          onClick={() => {
            setIsCreateEntityOpen(true);
          }}
        >
          <PlusIcon />
          Form an entity
        </Button>
      </div>
      <div className="py-[1.625rem] flex flex-col gap-[1.375rem] md:px-[1.875rem] px-[1rem]">
        <EntityDetailsCard
          data={{ status: "Completed" }}
          handleOpenDetails={handleOpenDetails}
        />
        <EntityDetailsCard
          data={{ status: "In-progress" }}
          handleOpenDetails={handleOpenDetails}
        />
        <EntityDetailsCard
          data={{ status: "Refused" }}
          handleOpenDetails={handleOpenDetails}
        />
      </div>
    </div>
  );
}

export function EntityDetailsCard({
  data: { status },
  handleOpenDetails,
}: {
  data: {
    status: string;
  };
  handleOpenDetails?: () => void;
}) {
  return (
    <button
      className="text-start bg-white p-4 rounded-[12px] shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] flex flex-row flex-wrap justify-between items-center w-full"
      onClick={() => {
        handleOpenDetails && handleOpenDetails();
      }}
    >
      <div className="flex flex-row flex-wrap gap-4">
        <div className="bg-[#F9F6FF] p-3 rounded-[7px] w-fit">
          <BuildingIcon className="[&_path]:fill-[#5A42B8]" />
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-[500] text-[1.125rem] leading-[110%]">
            Visionary Designs LLC
          </span>
          <div className="flex flex-row flex-wrap gap-[1.5rem] md:text-[0.875rem] text-[0.75rem] font-[500] text-[#666]">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <ClockIcon />
              <span className="font-[400]">Applied on:</span>
              <span>14 May, 2024</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <BIcon />
              <span>LLC</span>
            </div>
            <div className="md:flex flex-row flex-wrap gap-1 items-center hidden">
              <LocationIcon />
              <span>1100 Plum Creek Pkwy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-[#E5E5E5] border-b-solid border-b-[1px] my-4 w-full md:hidden flex" />

      <div className="md:text-[0.875rem] text-[0.75rem] font-[500] flex flex-row items-center justify-between w-full md:w-auto">
        <div className="flex flex-row flex-wrap gap-1 items-center md:hidden text-[#666]">
          <LocationIcon />
          <span>1100 Plum Creek Pkwy</span>
        </div>

        {status === "Completed" ? (
          <StatusBadge status="Completed" />
        ) : status === "In-progress" ? (
          <StatusBadge status="In-progress" />
        ) : (
          <StatusBadge status="Refused" />
        )}
      </div>
    </button>
  );
}

interface StatusBadgeProps {
  status: "Completed" | "In-progress" | "Refused";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <div
      className={clsx("flex items-center py-1.5 px-3 rounded-lg border", {
        "border-[#64B667] bg-[#EBFFEB]": status === "Completed",
        "border-[#FBBC04] bg-[#FFF5E9]": status === "In-progress",
        "border-[#B85042] bg-[#FFF6F5]": status === "Refused",
      })}
    >
      <span
        className={clsx(
          "flex-shrink-0 w-[0.375rem] h-[0.375rem] rounded-full",
          {
            "bg-[#64B667]": status === "Completed",
            "bg-[#FBBC04]": status === "In-progress",
            "bg-[#B85042]": status === "Refused",
          }
        )}
      ></span>
      <span className="ml-2 text-[0.875rem] font-[500] leading-[18px] text-black">
        {status}
      </span>
    </div>
  );
};
