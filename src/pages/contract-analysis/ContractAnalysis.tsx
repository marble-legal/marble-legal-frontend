import Button from "../../components/Button";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import { ReactComponent as ListIcon } from "../../assets/icons/list.svg";
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
import { UploadContract } from "./UploadContract";
import MobileMenu from "../../components/MobileMenu";
import { BottomView } from "../../components/BottomView";
import { useContractAnalysis } from "./contract-analysis-context";

export default function ContractAnalysis() {
  const [bottomView, setBottomView] = useState(false);
  const [uploadContract, setUploadContract] = useState(false);
  const { contractList, loading, setSelectedContract, selectedContract } =
    useContractAnalysis() as any;

  const handleContractSelect = (contract: any) => {
    setUploadContract(false);
    setBottomView(false);
    setSelectedContract(contract);
  };

  useEffect(() => {
    if (!loading && contractList?.length === 0) {
      setUploadContract(true);
    }
  }, [contractList, loading]);

  return (
    <>
      <MobileMenu
        renderAction={
          <div className="flex justify-end gap-2">
            <Button
              className="w-8 h-8 flex justify-center bg-white border border-[#D7D7D7] rounded-[10px] items-center !px-0 !py-4"
              onClick={() => setBottomView(true)}
            >
              <ListIcon className="w-4 h-4" />
            </Button>

            <Button
              className="w-8 h-8 flex justify-center items-center !px-0 !py-4"
              onClick={() => setUploadContract(true)}
            >
              <UploadIcon className="w-4 h-4" />
            </Button>
          </div>
        }
      />
      <div className="lg:mt-0 bg-[#F2F5FB] lg:bg-transparent">
        <div className="hidden shadow-header px-[1.875rem] py-4 lg:flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center">
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
          ) : contractList?.length > 0 ? (
            <Button
              variant="primary"
              className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
              onClick={() => setUploadContract(false)}
            >
              <ArrowIcon className="[&_path]:stroke-white" />
              Back
            </Button>
          ) : null}
        </div>
        {uploadContract ? (
          <UploadContract onSuccess={() => setUploadContract(false)} />
        ) : (
          <>
            <div className="h-[calc(100vh-62px)] lg:h-[calc(100vh-102px)] px-[18px] lg:px-6 py-4 flex flex-col lg:flex-row gap-2.5">
              <div className="hidden lg:block">
                <ContractList
                  list={contractList}
                  onSelect={handleContractSelect}
                  selectedContract={selectedContract}
                />
              </div>
              <div className="bg-white pb-4 lg:pb-0 flex-1 flex-grow rounded-[12px]">
                <ContractMessaging />
              </div>
            </div>
          </>
        )}
      </div>
      {/* {bottomView && ( */}
      <BottomView open={bottomView} onClose={() => setBottomView(false)}>
        <ContractList
          selectedContract={selectedContract}
          list={contractList}
          onSelect={handleContractSelect}
        />
      </BottomView>
      {/* )} */}
    </>
  );
}
