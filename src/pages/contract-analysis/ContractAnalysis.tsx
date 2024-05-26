import Button from "../../components/Button";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import SearchComponent from "../../components/Search";
import { ReactComponent as ContractsIcon } from "../../assets/icons/contracts.svg";
import { cva } from "class-variance-authority";

export default function ContractAnalysis() {
  return (
    <div>
      <div className="shadow-header px-[1.875rem] py-4 flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center">
        <h1 className="font-outfit text-[1.25rem] font-[500]">
          Contract Analysis
        </h1>
        <Button
          variant="primary"
          className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
        >
          <UploadIcon />
          Upload a contract
        </Button>
      </div>
      <div className="h-[calc(100vh-100px)] px-6 py-4 flex flex-row gap-2.5">
        <div className="bg-white flex-[0.5] rounded-[12px] p-2.5">
          <h2 className="font-outfit text-[1.25rem] font-[600] px-[1.125rem] py-3">
            Contracts
          </h2>
          <SearchComponent />
          <div className="mt-3 grid gap-2">
            <ContractButton />
            <ContractButton variant="active" />
          </div>
        </div>
        <div className="bg-white flex-1 flex-grow rounded-[12px] p-2.5"></div>
      </div>
    </div>
  );
}

function ContractButton({
  variant = "default",
}: {
  variant?: "active" | "default";
}) {
  const buttonVariants = cva(
    "flex gap-2 p-2 w-full rounded-[8px] items-center transition-all hover:bg-[#ECF1EC]",
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
    >
      <div
        className={divVariants({
          variant,
        })}
        style={{ backgroundColor: "#FBFCFB" }}
      >
        <ContractsIcon />
      </div>
      <span className="text-[1rem]">Employment Agreement</span>
    </button>
  );
}
