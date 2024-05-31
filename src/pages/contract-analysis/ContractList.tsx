import SearchComponent from "../../components/Search";
import { ReactComponent as ContractsIcon } from "../../assets/icons/contracts.svg";
import { cva } from "class-variance-authority";
import { useState } from "react";

const filterContracts = (contracts, search) => {
  if (!search) return contracts;
  return contracts.filter((contract) =>
    contract.title.toLowerCase().includes(search.toLowerCase())
  );
};

function ContractButton({
  variant = "default",
  contract,
  onClick,
  selected,
}: {
  variant?: "active" | "default";
  contract?: any;
  onClick?: () => void;
  selected?: boolean;
}) {
  const buttonVariants = cva(
    "flex gap-2 max-w-[296px] p-2 w-full rounded-[8px] items-center transition-all hover:bg-[#ECF1EC]",
    {
      variants: {
        variant: {
          active: "bg-[#ECF1EC]",
          default: "bg-white",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );
  const divVariants = cva(
    "h-[2.75rem] w-[2.75rem] rounded-[4px] content-center flex items-center justify-center transition-all hover:bg-[#FBFCFB]",
    {
      variants: {
        variant: {
          active: "bg-[#FBFCFB]",
          default: "bg-[#EEF8F5]",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

  return (
    <button
      className={buttonVariants({
        variant,
      })}
      onClick={onClick}
    >
      <div
        className={divVariants({
          variant,
        })}
        style={{ backgroundColor: "#FBFCFB" }}
      >
        <ContractsIcon />
      </div>
      <span className="text-[1rem] text-left flex-1 overflow-hidden text-ellipsis whitespace-nowrap ">
        {contract.title}
      </span>
    </button>
  );
}

export function ContractList({ list, onSelect, selectedContract }) {
  const [search, setSearch] = useState("");
  return (
    <div className="bg-white w-full max-w-[316px] lg:w-[316px] flex-[0.5] rounded-[12px] p-2.5">
      <h2 className="font-outfit text-[1.25rem] font-[600] px-[1.125rem] pt-1 pb-3">
        Contracts
      </h2>
      <SearchComponent
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-3 flex flex-col gap-2 h-[calc(100vh-300px)] overflow-auto">
        {filterContracts(list, search)?.map((contract) => (
          <ContractButton
            key={contract.id}
            contract={contract}
            onClick={() => onSelect(contract)}
            variant={
              selectedContract?.id === contract.id ? "active" : "default"
            }
          />
        ))}
        {/* <ContractButton />
        <ContractButton variant="active" /> */}
      </div>
    </div>
  );
}
