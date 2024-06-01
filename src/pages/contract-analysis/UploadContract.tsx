import { useState } from "react";
import Button from "../../components/Button";
import { api } from "../../helpers/api";
import { getUser } from "../../helpers/utils";
import Dropzone from "react-dropzone";
import { ReactComponent as DocumentUploadIcon } from "../../assets/icons/document-upload.svg";
import { useContractAnalysis } from "./contract-analysis-context";

export function UploadContract({ onSuccess }) {
  const { refetchContractList } = useContractAnalysis() as any;
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      api.uploadFile(getUser().id, formData).then((response) => {
        // console.log(response);
        refetchContractList();
        onSuccess && onSuccess();
        setUploading(false);
      });
    } catch (error) {
      setUploading(false);
      // console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-90px)] flex flex-col items-center justify-center gap-4">
      <h2 className="text-[1.75rem] font-[700] font-outfit text-center">
        Upload contract
      </h2>
      <p className="w-[530px] text-center text-[#727272]">
        Upload existing contracts for detailed analysis and insights on clauses
        and key information.
      </p>
      <div className="py-[1.375rem]">
        <Dropzone
          onDrop={(acceptedFiles) => {
            setFile(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="border-[2px] border-dashed border-[#64B667] bg-[#EDF5EF] p-[3.125rem] rounded-[10px] w-[550px] text-center">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="grid gap-3 justify-items-center">
                  <DocumentUploadIcon />
                  <p className="text-[0.875rem]">
                    Drag and drop or click to upload (.pdf)
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      {file && (
        <Button
          onClick={handleUpload}
          variant="primary"
          className="flex gap-2.5 px-6 py-3"
          disabled={!file || uploading}
          loading={uploading}
        >
          Upload and start analyzing it
        </Button>
      )}
    </div>
  );
}
