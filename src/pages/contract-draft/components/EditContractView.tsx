import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export function EditContractView({ contract, onDiscard, isOpen, onChange }) {
  const handleChange = (value) => {
    onChange(value);
    console.log(value);
  };

  return (
    <div>
      <div
        data-color-mode="light"
        className="md:w-[682px] mx-auto overflow-auto !h-[calc(100vh-110px)] bg-white rounded-[12px] md:p-7 [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-black"
      >
        <MDEditor
          value={contract.generatedContent}
          onChange={handleChange}
          className="!h-full"
        />
      </div>
    </div>
  );
}
