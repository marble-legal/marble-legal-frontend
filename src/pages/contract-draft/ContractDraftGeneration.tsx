import Button from "../../components/Button";
import { ReactComponent as PlusIcon } from "../../assets/icons/add.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/x.svg";
import { ReactComponent as DocumentIcon } from "../../assets/icons/document-text.svg";
import SearchComponent from "../../components/Search";
import { useEffect, useMemo, useRef, useState } from "react";
import MobileMenu from "../../components/MobileMenu";
import { useContractGeneration } from "./context/contract-generation-context";
import { CreateDraftForm } from "./components/CreateDraft";
import { ContractListItem } from "./components/ContractListItem";
import { ContractView } from "./components/ContractView";
import { DeleteContractDraftConfirm } from "./components/DeleteContractDraftConfirm";
import { FilterPopup } from "./components/Filters";
import moment from "moment";
import useSubscription from "../subscription/useSubscription";
import { useNavigate } from "react-router-dom";
import {
  FeatureCode,
  SubscriptionTier,
  contractTypes,
} from "../../helpers/consts";
import useResponsive from "../../helpers/useResponsive";
import { useAuth } from "../../AuthContext";

export default function ContractDraftGeneration() {
  const navigate = useNavigate();
  const { isAnyMobile } = useResponsive();
  const { isLoading, subscription, subscriptionStatus, refetch } =
    useSubscription();
  const [createDraftModal, setCreateDraftModal] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const contentRef = useRef<any>(null);
  const { user: userDetails, refetch: refetchUser } = useAuth();
  const {
    search,
    setSearch,
    refetchContractList,
    setFilters,
    filters,
    ...rest
  } = useContractGeneration() as any;
  const [tempFilters, setTempFilters] = useState<{
    date: { startDate: string; endDate: string };
    types: string[];
  }>({
    date: { startDate: "", endDate: "" },
    types: [],
  });
  const [selectedContract, setSelectedContract] = useState<any>();
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const onDelete = (contract) => {
    setDeleteConfirm(contract);
  };

  const handleDelete = async (contract) => {};

  const onView = (contract) => {
    setSelectedContract(contract);
  };

  const draftCredit = userDetails?.currentCredit?.find(
    (item) => item.feature === FeatureCode.contractDrafting
  );

  const isDraftEnabled = useMemo(() => {
    if (subscription?.tier === SubscriptionTier.Standard) {
      return true;
    }
    if (draftCredit && draftCredit?.quantity > 0) {
      return true;
    }
    return false;
  }, [subscription, draftCredit]);

  const handleCreateDraft = () => {
    if (!isDraftEnabled) {
      navigate("/subscription");
    } else {
      setCreateDraftModal(true);
    }
  };

  const hasFilters = useMemo(() => {
    return (
      filters.date.startDate || filters.date.endDate || filters.types.length > 0
    );
  }, [filters]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", () => {
        setIsScrolling(contentRef.current.scrollTop > 0);
      });
    }
    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", () => {
          setIsScrolling(contentRef.current.scrollTop > 0);
        });
      }
    };
  }, [contentRef.current]);

  // console.log(subscriptionStatus);

  const renderCredit = () => {
    if (subscription?.tier === SubscriptionTier.Standard) {
      return null;
    }
    return (
      <>
        {draftCredit && (
          <span className="text-xs">{draftCredit?.quantity} drafts left</span>
        )}
      </>
    );
  };

  return (
    <div className="overflow-hidden lg:h-[calc(100dvh-24px)]">
      {createDraftModal && (
        <CreateDraftForm
          onClose={() => setCreateDraftModal(false)}
          onUpdate={() => {
            refetch();
            refetchUser();
            return refetchContractList();
          }}
        />
      )}
      <MobileMenu
        renderAction={
          <div className="flex justify-end gap-2 items-center">
            {renderCredit()}
            <Button className="!px-2 !py-2 h-8" onClick={handleCreateDraft}>
              <PlusIcon className="!w-4 !h-4" />
            </Button>
          </div>
        }
      />

      <div className="md:sticky md:block top-0 z-[5] bg-[#F2F5FB]">
        <div className="shadow-header px-[1.875rem] py-4 md:flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center hidden">
          {isScrolling ? (
            <div className="flex gap-2.5 items-center">
              <div className="flex flex-row gap-2.5 md:w-auto w-full">
                <SearchComponent
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
                <FilterPopup
                  hasFilters={hasFilters}
                  setFilters={setFilters}
                  tempFilters={tempFilters}
                  setTempFilters={setTempFilters}
                />
              </div>
              <div className="hidden md:block">
                <span className="font-medium">
                  Total drafts: {rest?.contractList?.length}
                </span>
              </div>
            </div>
          ) : (
            <h1 className="font-outfit text-[1.25rem] font-[500]">
              Contract draft generation
            </h1>
          )}
          <div className="flex flex-row gap-3 items-center">
            {renderCredit()}
            <Button
              variant="primary"
              className="flex gap-1 px-6 py-3 bg-[#B84242] shadow-[0px_13px_22.6px_0px_rgba(255,255,255,0.10)_inset,0px_0px_0px_2px_rgba(255,255,255,0.18)_inset] border-secondaryRed font-[500]"
              onClick={handleCreateDraft}
            >
              <PlusIcon />
              Create a contract
            </Button>
          </div>
        </div>
      </div>
      {!!(!isScrolling || isAnyMobile) && (
        <div className="flex flex-row justify-between items-center md:px-5 px-4 mt-5">
          <div className="flex flex-row gap-2.5 md:w-auto w-full">
            <SearchComponent
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <FilterPopup
              hasFilters={hasFilters}
              setFilters={setFilters}
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
            />
          </div>
          <div className="hidden md:block">
            <span className="font-medium">
              Total drafts: {rest?.contractList?.length}
            </span>
          </div>
        </div>
      )}

      <div
        className={`py-4 md:pb-4 flex flex-col h-[calc(100dvh-130px)] ${
          isScrolling
            ? "md:h-[calc(100dvh-100px)]"
            : "md:h-[calc(100dvh-160px)]"
        }`}
      >
        <div className="w-full px-5 md:hidden mb-4 flex justify-between items-center">
          {hasFilters ? (
            <>
              <button
                className="text-secondaryRed whitespace-nowrap font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setFilters({
                    date: { startDate: "", endDate: "" },
                    types: [],
                  });
                  setTempFilters({
                    date: { startDate: "", endDate: "" },
                    types: [],
                  });
                }}
              >
                Clear all filters
              </button>
              <span className="text-black text-sm font-medium leading-none">
                Total drafts: {rest?.contractList?.length}
              </span>
            </>
          ) : (
            <>
              <span className="text-black text-sm font-medium leading-none">
                Total drafts: {rest?.contractList?.length}
              </span>
              <div>{renderCredit()}</div>
            </>
          )}
        </div>
        <div
          className={`${
            hasFilters ? "mx-4 md:mx-5 mb-2 pb-2 " : ""
          } flex items-center gap-2 overflow-auto md:overflow-hidden md:flex-wrap`}
        >
          {filters.date.startDate && (
            <div className="whitespace-nowrap rounded-md border border-[#D7D7D7] py-2.5 px-3 flex gap-1 items-center">
              <span>
                {moment(filters.date.startDate).format("MM/DD/YYYY")} -{" "}
                {moment(filters.date.endDate).format("MM/DD/YYYY")}
              </span>
              <button
                onClick={() => {
                  setFilters((prev) => {
                    return {
                      ...prev,
                      date: { startDate: "", endDate: "" },
                      selectedDateFilter: null,
                    };
                  });
                  setTempFilters((prev) => {
                    return {
                      ...prev,
                      date: { startDate: "", endDate: "" },
                      selectedDateFilter: null,
                    };
                  });
                }}
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          )}
          {filters.types.map((type) => (
            <div className="rounded-md whitespace-nowrap border border-[#D7D7D7] py-2.5 px-3 flex gap-1 items-center">
              <span>
                {contractTypes.find((t) => t.value === type)?.label || type}
              </span>
              <button
                onClick={() => {
                  setFilters((prev) => {
                    return {
                      ...prev,
                      types: prev.types.filter((t) => t !== type),
                    };
                  });
                  setTempFilters((prev) => {
                    return {
                      ...prev,
                      types: prev.types.filter((t) => t !== type),
                    };
                  });
                }}
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
          {hasFilters && (
            <button
              className="hidden md:block text-secondaryRed whitespace-nowrap font-medium"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setFilters({
                  date: { startDate: "", endDate: "" },
                  types: [],
                });
                setTempFilters({
                  date: { startDate: "", endDate: "" },
                  types: [],
                });
              }}
            >
              Clear all filters
            </button>
          )}
        </div>

        <div
          ref={(e) => (contentRef.current = e)}
          className="md:px-5 lg:pb-4 px-4 flex flex-col gap-4 overflow-auto flex-1"
        >
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
                onClick={handleCreateDraft}
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
          contract={{ ...selectedContract }}
          onUpdate={() => {
            refetch();
            refetchContractList();
          }}
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
        <div className="bg-[#F5FAF0] p-3 rounded-[8px] h-[100%] flex flex-col justify-center">
          <DocumentIcon className="[&>g>path]:fill-[#5E9B22] [&>path]:fill-[#5E9B22] w-8 h-8" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#E0E0E0] h-[1.125rem] w-[200px] rounded"></div>
          <div className="bg-[#E0E0E0] h-[0.9375rem] w-[250px] rounded"></div>
        </div>
      </div>
      <div className="md:flex hidden flex-row gap-4 items-center">
        <div className="bg-[#E0E0E0] h-[0.875rem] w-[100px] rounded"></div>
        <div className="cursor-pointer rounded-[6px] border-[1px] border-solid border-[#E0E0E0] p-1.5 transition-all">
          <div className="bg-[#E0E0E0] w-5 h-5 rounded"></div>
        </div>
      </div>
    </div>
  );
}
