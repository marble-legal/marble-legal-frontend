import Button from "../../components/Button";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import SearchComponent from "../../components/Search";
import { ReactComponent as ContractsIcon } from "../../assets/icons/contracts.svg";
import { cva } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { getUser } from "../../helpers/utils";
import { api } from "../../helpers/api";
import { Message } from "../dashboard/components/Message";
import { ReactComponent as RegenerateIcon } from "../../assets/icons/regenerate.svg";
import Spinner from "../../components/Spinners";
import { EmptyState } from "../dashboard/components/EmptyState";
import { Editor } from "../dashboard/components/Editor";
import Dropzone from "react-dropzone";
import { ReactComponent as DocumentUploadIcon } from "../../assets/icons/document-upload.svg";

export default function ContractAnalysis() {
  const [uploadContract, setUploadContract] = useState(false);
  return (
    <div>
      <div className="shadow-header px-[1.875rem] py-4 flex justify-between border-b-solid border-b-[1px] border-[#DADCE2] items-center">
        <h1 className="font-outfit text-[1.25rem] font-[500]">
          Contract Analysis
        </h1>
        {!uploadContract && (
          <Button
            variant="primary"
            className="flex gap-1 px-6 py-3 bg-[#B84242] border-[#B85042] font-[500]"
            onClick={() => setUploadContract(true)}
          >
            <UploadIcon />
            Upload a contract
          </Button>
        )}
      </div>
      {uploadContract ? (
        <UploadContract />
      ) : (
        <>
          <div className="h-[calc(100vh-110px)] px-6 py-4 flex flex-row gap-2.5">
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

            <div className="bg-white flex-1 flex-grow rounded-[12px]">
              <ContractMessage />
            </div>
          </div>
        </>
      )}
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

function ContractMessage() {
  const [conversation, setConversation] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const [currentReply, setCurrentReply] = useState<string>("");
  const [error, setError] = useState("");
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const user = getUser();

  const askQuery = async (message: string) => {
    if (!message) return;
    try {
      setCurrentUserMessage(message);
      setSending(true);
      const response = await api.askQuery({ message });
      setSending(false);
      if ([200, 201].includes(response.status)) {
        setCurrentReply(response.data.message);
        fetchConversation(false);
      }
      console.log(response);
    } catch (error) {
      setSending(false);
      console.log(error);
    }
  };

  const fetchConversation = async (shouldSetLoading = true) => {
    try {
      shouldSetLoading && setLoading(true);
      const response = await api.getAllConversations(user.id);
      console.log(response);
      if ([200, 201].includes(response.status)) {
        setCurrentUserMessage("");
        setCurrentReply("");
        setConversation(response.data);
      }

      setLoading(false);
    } catch (error) {}
  };

  const handleRegenerate = () => {
    // get last message
    const lastMessage =
      currentUserMessage ||
      conversation.filter((item) => item.isUserMessage).at(-1)?.message;
    if (!lastMessage) return;
    askQuery(lastMessage);
  };

  useEffect(() => {
    fetchConversation();
  }, []);

  useEffect(() => {
    if (
      (conversation?.length || currentReply || currentUserMessage) &&
      listRef.current
    ) {
      // scroll to the bottom of the list
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [conversation, currentReply, currentUserMessage]);

  console.log(conversation, loading, error);
  const isEmpty = !conversation.length && !loading;

  return (
    <div className="relative flex flex-col h-full">
      <div className="shadow-header px-4 py-[0.875rem] border-b-solid border-b-[1px] border-[#DADCE2]">
        <h1 className="font-outfit text-[1rem] font-[600]">
          Employment Agreement
        </h1>
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
          zIndex: 99,
        }}
        className="absolute top-[53px] left-0 right-0 h-[118px]"
      />
      <div
        ref={(e) => (listRef.current = e)}
        className={`w-[100%] mt-5 flex-1 flex flex-col h-[calc(100vh-150px)] overflow-auto`}
      >
        <div
          className={`w-[97%] sm:w-[580px] mx-auto ${
            isEmpty || loading ? "justify-center" : "justify-start"
          } flex-1 flex flex-col pt-4 pb-8`}
        >
          {!isEmpty && !loading && (
            <div>
              {conversation?.map((item) => (
                <Message
                  key={item.id}
                  conversation={item}
                  // onDisLike={handleDisLiske}
                  // onLike={handleLike}
                />
              ))}
              {currentUserMessage && (
                <Message
                  key="current-user-message"
                  conversation={{
                    message: currentUserMessage,
                    isUserMessage: true,
                  }}
                />
              )}
              {currentReply && (
                <Message
                  key="current-reply"
                  conversation={{
                    message: currentReply,
                  }}
                />
              )}

              <div className="w-full flex justify-end">
                <Button
                  onClick={handleRegenerate}
                  className="bg-white text-black shadow-[0px_2px_2.3px_0px_rgba(186,207,193,0.20)] border border-[#E6E6E6] rounded-[10px]"
                >
                  <RegenerateIcon />
                  Regenerate
                </Button>
              </div>
            </div>
          )}
          {isEmpty && <EmptyState />}
          {loading && (
            <div className="[&_circle]:stroke-primary [&_path]:fill-primary h-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <div className="w-[97%] mx-auto pb-2.5">
        <Editor onSend={askQuery} isSending={sending} />
      </div>
    </div>
  );
}

function UploadContract() {
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
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
      <Button variant="primary" className="flex gap-2.5 px-6 py-3">
        Upload and start analyzing it
      </Button>
    </div>
  );
}
