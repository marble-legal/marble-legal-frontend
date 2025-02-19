import Button from "../../components/Button";
import { ReactComponent as PlusIcon } from "../../assets/icons/add.svg";
import { ReactComponent as BuildingIcon } from "../../assets/icons/internal-building.svg";
import { ReactComponent as ClockIcon } from "../../assets/icons/clock.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import EntityDetails from "./EntityDetails";
import MobileMenu from "../../components/MobileMenu";
import CreateEntity from "./CreateEntity";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../helpers/api";
import { BusinessEntity } from "../../types/business-entity.types";
import { AxiosResponse } from "axios";
import moment from "moment";
import { ShowToast } from "../../components/toast";
import useSubscription from "../subscription/useSubscription";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { FeatureCode, SubscriptionTier } from "../../helpers/consts";

export default function EntityFormation() {
  const navigate = useNavigate();
  const {
    isLoading: subscriptionLoading,
    subscriptionStatus,
    subscription,
    refetch: refetchSubscription,
  } = useSubscription();
  const { user } = useAuth();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateEntityOpen, setIsCreateEntityOpen] = useState(false);
  const [entityData, setEntityData] = useState({} as any);
  const handleDetailsClose = () => setIsDetailsOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const { user: userDetails, refetch: refetchUser } = useAuth();

  const fetchEntities = async () => {
    setIsLoading(true);
    try {
      const response = await api.getEntities({ userId: user.id });
      setData(response?.data || []);
    } catch (error: any) {
      ShowToast({
        message: error.response.data.message || "Something went wrong!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const entityFormationCredit = userDetails?.currentCredit?.find(
    (item) => item.feature === FeatureCode.businessEntity
  );

  const isEntityFormationEnabled = useMemo(() => {
    if (entityFormationCredit && entityFormationCredit?.quantity > 0) {
      return true;
    }
    return false;
  }, [subscription, entityFormationCredit]);

  const handleCreateEntity = () => {
    if (!isEntityFormationEnabled) {
      navigate("/subscription");
    } else {
      setIsCreateEntityOpen(true);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchEntities();
    }
  }, [user?.id]);

  const renderCredit = () => {
    return (
      <>
        {entityFormationCredit && (
          <span className="text-sm">
            {entityFormationCredit?.quantity}{" "}
            <span className=" md:inline">entity formation </span>left
          </span>
        )}
      </>
    );
  };

  return (
    <div className="h-full">
      <MobileMenu
        renderAction={
          <div className="flex justify-end gap-2 items-center">
            <div className="hidden md:block">{renderCredit()}</div>
            <Button className="!p-2" onClick={handleCreateEntity}>
              <PlusIcon />
            </Button>
          </div>
        }
      />
      <EntityDetails
        isOpen={isDetailsOpen}
        handleClose={handleDetailsClose}
        data={entityData}
        refetch={fetchEntities}
      />
      <CreateEntity
        isOpen={isCreateEntityOpen}
        handleClose={() => setIsCreateEntityOpen(false)}
        refetchEntities={() => {
          refetchSubscription();
          refetchUser();
          fetchEntities();
        }}
      />
      <div className="shadow-header px-[1.875rem] py-4 lg:flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center hidden">
        <h1 className="font-outfit text-[1.25rem] font-[500]">
          Business Entity formation
        </h1>

        <div className="flex items-center gap-2">
          {renderCredit()}
          <Button
            variant="primary"
            className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
            onClick={handleCreateEntity}
          >
            <PlusIcon />
            Apply for an entity
          </Button>
        </div>
      </div>
      <div className="flex md:hidden justify-end pt-2 px-3">
        {renderCredit()}
      </div>
      <div className="py-[1.625rem] flex flex-col gap-[1.375rem] md:px-[1.875rem] px-[1rem]">
        {isLoading &&
          [1, 2, 3].map((i) => <EntityDetailsCardSkeleton key={i} />)}
        {data?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-10rem)]">
            <span className="font-[500]">No entities found</span>
          </div>
        )}

        {data.map((entity, index) => (
          <EntityDetailsCard
            data={entity}
            handleOpenDetails={() => {
              setIsDetailsOpen(true);
              setEntityData(entity);
            }}
            refetch={fetchEntities}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export function EntityDetailsCard({
  data,
  handleOpenDetails,
  refetch,
}: {
  data: BusinessEntity;
  handleOpenDetails?: () => void;
  refetch?: () => void;
}) {
  const handleDelete = (e: any) => {
    e.stopPropagation();
    api
      .deleteEntity(data?.id)
      .then((res) => {
        ShowToast({
          message: "Entity deleted successfully!",
          type: "success",
        });
        refetch && refetch();
      })
      .catch((err) => {
        ShowToast({
          message: err.response.data.message || "Something went wrong!",
          type: "error",
        });
      });
  };

  return (
    <button
      className="text-start bg-white p-4 rounded-[12px] shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] flex flex-row flex-wrap justify-between items-center w-full"
      onClick={() => {
        handleOpenDetails && handleOpenDetails();
      }}
    >
      <div className="flex flex-row flex-wrap gap-4">
        <div className="bg-[#F9F6FF] p-[1.125rem] rounded-[7px] w-fit">
          <BuildingIcon className="[&_path]:fill-[#5A42B8]" />
        </div>
        <div className="flex flex-col gap-3 self-center">
          <span className="font-[500] text-[1.125rem] leading-[110%]">
            {data?.name}
          </span>
          <div className="flex flex-row flex-wrap gap-[1.5rem] md:text-[0.875rem] text-[0.75rem] font-[500] text-[#666]">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <ClockIcon />
              <span className="font-[400]">Applied on:</span>
              <span>{moment(data?.createdAt).format("DD MMM, YYYY")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-[#E5E5E5] border-b-solid border-b-[1px] my-4 w-full md:hidden flex" />

      <div className="md:text-[0.875rem] text-[0.75rem] font-[500] flex flex-row items-center justify-between w-full md:w-auto md:gap-3">
        {data?.status === 1 ? (
          <StatusBadge status="Completed" />
        ) : data?.status === 0 ? (
          <StatusBadge status="In-progress" />
        ) : (
          <StatusBadge status="Refused" />
        )}
        {/* {data?.status === 1 && (
          <button
            className="p-1.5 bg-[#FFF0F0] border border-[#F1D0CD] rounded-md hover:bg-[#F1D0CD] transition-all"
            onClick={handleDelete}
            type="button"
          >
            <DeleteIcon />
          </button>
        )} */}
      </div>
    </button>
  );
}

export function EntityDetailsCardSkeleton() {
  return (
    <div className="animate-pulse bg-white p-4 rounded-[12px] shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] flex flex-row flex-wrap justify-between items-center w-full">
      <div className="flex flex-row flex-wrap gap-4">
        <div className="bg-[#F9F6FF] p-[1.125rem] rounded-[7px] w-fit">
          <BuildingIcon className="[&_path]:fill-[#5A42B8]" />
        </div>
        <div className="flex flex-col gap-3 self-center">
          <span className="font-[500] text-[1.125rem] leading-[110%] w-[200px] h-4 bg-gray-200 rounded"></span>
          <div className="flex flex-row flex-wrap gap-[1.5rem] md:text-[0.875rem] text-[0.75rem] font-[500] text-[#666]">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <ClockIcon />
              <span className="font-[400] h-4 w-12 bg-gray-200 rounded"></span>
              <span className="h-4 w-8 bg-gray-200 rounded"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-[#E5E5E5] border-b-solid border-b-[1px] my-4 w-full md:hidden flex" />

      <div className="md:text-[0.875rem] text-[0.75rem] font-[500] flex flex-row items-center justify-between w-full md:w-auto">
        <span className="h-4 w-12 bg-gray-200 rounded"></span>
        {/* <div className="flex flex-row flex-wrap gap-1 items-center md:hidden text-[#666]">
          <LocationIcon />
          <span className="max-w-[150px] truncate"></span>
        </div> */}
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: "Completed" | "In-progress" | "Refused";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <div
      className={clsx("flex items-center py-1.5 px-3 rounded-[6px] border", {
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
