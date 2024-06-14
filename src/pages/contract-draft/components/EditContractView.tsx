import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export function EditContractView({ contract, onDiscard, isOpen, onChange }) {
  const handleChange = (value, delta, source) => {
    if (source === "user") {
      onChange(value);
    }
  };
  return (
    <div>
      <div
        data-color-mode="light"
        className="md:w-[682px] mx-auto overflow-auto !h-[calc(100vh-110px)] bg-white rounded-[12px] md:p-7 [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-black"
      >
        <ReactQuill
          theme="bubble"
          value={contract.generatedContent}
          onChange={handleChange}
          placeholder="Enter here"
        />
      </div>
    </div>
  );
}
