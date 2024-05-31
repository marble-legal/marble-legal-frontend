import Button from "../../components/Button";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import SearchComponent from "../../components/Search";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import { cva } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { getUser } from "../../helpers/utils";
import { api } from "../../helpers/api";
import Dropzone from "react-dropzone";
import { ReactComponent as DocumentUploadIcon } from "../../assets/icons/document-upload.svg";
import { ContractMessaging } from "./ContractMessaging";
import { ContractList } from "./ContractList";
import { useContractAnalysis } from "./contract-analysis-context";
import { UploadContract } from "./UploadContract";

export default function ContractAnalysis() {
  const [uploadContract, setUploadContract] = useState(false);
  const { contractList, setSelectedContract, selectedContract } =
    useContractAnalysis() as any;

  const handleContractSelect = (contract: any) => {
    console.log(contract);
    setSelectedContract(contract);
  };

  console.log(contractList);
  return (
    <div>
      <div className="shadow-header px-[1.875rem] py-4 flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center">
        <h1 className="font-outfit text-[1.25rem] font-[500]">
          Contract Analysis
        </h1>
        {!uploadContract ? (
          <Button
            variant="primary"
            className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
            onClick={() => setUploadContract(true)}
          >
            <UploadIcon />
            Upload a contract
          </Button>
        ) : (
          <Button
            variant="primary"
            className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
            onClick={() => setUploadContract(false)}
          >
            <ArrowIcon className="[&_path]:stroke-white" />
            Back
          </Button>
        )}
      </div>
      {uploadContract ? (
        <UploadContract onSuccess={() => setUploadContract(false)} />
      ) : (
        <>
          <div className="h-[calc(100vh-110px)] px-6 py-4 flex flex-row gap-2.5">
            <ContractList
              list={contractList}
              onSelect={handleContractSelect}
              selectedContract={selectedContract}
            />
            <div className="bg-white flex-1 flex-grow rounded-[12px]">
              <ContractMessaging />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
