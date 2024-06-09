import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export function EditContractView({ contract, onDiscard, isOpen }) {
  const [contractData, setContractData] = useState<any>(contract);

  const onChange = (value) => {
    setContractData((prev) => ({ ...prev, content: value }));
    console.log(value);
  };

  useEffect(() => {
    if (isOpen && contract) {
      console.log("Edit contract view opened");
      setContractData(contract);
    }
  }, [isOpen, contract]);

  return (
    <div>
      edit contract view
      <button onClick={onDiscard}>Discard</button>
      <div className="h-[calc(100vh-75px)] overflow-auto">
        <div
          data-color-mode="light"
          className="lg:w-[682px] mx-auto bg-white rounded-[12px] p-7 [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-black"
        >
          <MDEditor value={contractData.content} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
