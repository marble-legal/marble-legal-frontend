import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import FullScreenModal from "../../../components/FullScreenModal";
import { EditContractView } from "./EditContractView";

export function ContractView({ isOpen, onClose, contract }) {
  console.log(contract);
  const [edit, setEdit] = useState(false);
  return (
    <FullScreenModal isOpen={isOpen} onClose={onClose}>
      {!edit ? (
        <>
          <div className="lg:w-[682px] mx-auto">
            contract view
            <button onClick={() => setEdit(true)}>Edit</button>
          </div>
          <div className="h-[calc(100vh-75px)] overflow-auto">
            <div className="lg:w-[682px] mx-auto bg-white rounded-[12px] p-7 [&_.wmde-markdown]:!bg-transparent [&_.wmde-markdown]:!text-black">
              <MDEditor.Markdown source={contract.content} />
            </div>
          </div>
        </>
      ) : (
        <EditContractView
          contract={contract}
          onDiscard={() => setEdit(false)}
          isOpen={edit}
        />
      )}
    </FullScreenModal>
  );
}
