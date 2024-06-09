import { useEffect, useState } from "react";
import { api } from "../../helpers/api";
import { EmptyState } from "../dashboard/components/EmptyState";
import Spinner from "../../components/Spinners";
import Button from "../../components/Button";
import { Editor } from "../dashboard/components/Editor";
import { Message } from "../dashboard/components/Message";
import { getUser } from "../../helpers/utils";
import React from "react";
import { ReactComponent as RegenerateIcon } from "../../assets/icons/regenerate.svg";
import { ReactComponent as HorizontalDotIcon } from "../../assets/icons/horizontal-dot.svg";
import UIPopover from "../../components/Popover";
import { DeleteContractConfirm } from "./components/DeleteContractConfirm";
import moment from "moment";
import { useContractAnalysis } from "./contract-analysis-context";

export function ContractMessaging() {
  const {
    conversations,
    conversationLoading,
    currentReply,
    currentUserMessage,
    sending,
    askQuery,
    selectedContract,
  } = useContractAnalysis() as any;
  const [error, setError] = useState("");
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleMenu = () => {};

  const onDelete = (e) => {
    e.stopPropagation();
    setDeleteConfirm(true);
    // console.log("Delete");
  };

  const handleRegenerate = () => {
    // get last message
    const lastMessage =
      currentUserMessage ||
      conversations.filter((item) => item.isUserMessage).at(-1)?.message;
    if (!lastMessage) return;
    askQuery(lastMessage);
  };

  useEffect(() => {
    if (
      (conversations?.length || currentReply || currentUserMessage) &&
      listRef.current
    ) {
      // scroll to the bottom of the list
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [conversations, currentReply, currentUserMessage]);

  // console.log(
  //   conversations,
  //   conversationLoading,
  //   error,
  //   currentReply,
  //   currentUserMessage,
  //   selectedContract
  // );
  const isEmpty = !conversations?.length && !conversationLoading;

  return (
    <div className="relative flex flex-col h-[calc(100vh-110px)] lg:h-full">
      <div className="shadow-header px-7 flex justify-between items-center md:px-4 py-[0.875rem] border-b-solid border-b-[1px] border-[#DADCE2]">
        <div>
          <h1 className="max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis md:max-w-full font-outfit text-[1rem] font-[600]">
            {selectedContract?.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:block text-[#646464] text-[13px] font-normal leading-[14.30px]">
            Uploaded on{" "}
            {moment(selectedContract?.createdAt).format("MMM DD, YYYY")}
          </div>
          <UIPopover trigger={<HorizontalDotIcon />}>
            {(close) => (
              <Dropdown
                onDelete={(e) => {
                  onDelete(e);
                  close();
                }}
              />
            )}
          </UIPopover>
        </div>
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
          zIndex: 1,
        }}
        className="absolute top-[53px] left-0 right-0 h-[118px]"
      />
      <div
        ref={(e) => (listRef.current = e)}
        className={`w-[100%] px-7 mt-5 flex-1 flex flex-col h-[calc(100vh-150px)] overflow-auto`}
      >
        <div
          className={`w-full mx-auto ${
            (isEmpty && !sending) || conversationLoading
              ? "justify-center"
              : "justify-start"
          } flex-1 flex flex-col pt-4 pb-8`}
        >
          {(!isEmpty || currentUserMessage) && !conversationLoading && (
            <div>
              {conversations?.map((item) => (
                <Message
                  key={item.id}
                  conversation={item}
                  systemMessageClassName="!bg-[#F1F6F1]/70 !border-[#D4E2D7]"

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
                  systemMessageClassName="!bg-[#F1F6F1]/70 !border-[#D4E2D7]"
                />
              )}
              {sending && (
                <div className="[&_circle]:stroke-primary [&_path]:fill-primary flex justify-center">
                  <Spinner />
                </div>
              )}

              {!sending && (
                <div className="w-full flex justify-end">
                  <Button
                    onClick={handleRegenerate}
                    className="bg-white text-black shadow-[0px_2px_2.3px_0px_rgba(186,207,193,0.20)] border border-[#E6E6E6] rounded-[10px]"
                  >
                    <RegenerateIcon />
                    Regenerate
                  </Button>
                </div>
              )}
            </div>
          )}
          {isEmpty && !currentUserMessage && <EmptyState />}
          {conversationLoading && (
            <div className="[&_circle]:stroke-primary [&_path]:fill-primary h-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <div className="w-full pt-1 lg:pt-0 px-7 mx-auto pb-1 lg:pb-2.5">
        <Editor onSend={askQuery} isSending={sending} />
      </div>
      {deleteConfirm && (
        <DeleteContractConfirm
          onCancel={() => setDeleteConfirm(false)}
          contract={selectedContract}
        />
      )}
    </div>
  );
}

const Dropdown = ({ onDelete }) => {
  return (
    <div
      style={{ zIndex: 2 }}
      className="z-20 w-[110px] flex flex-col justify-center items-center bg-white shadow-[0_6px_24px_0_rgba(28,43,40,0.25)] rounded-xl py-2 mr-8"
    >
      <ul
        className="p-1 text-sm text-gray-700 "
        aria-labelledby="dropdownMenuIconButton"
      >
        <li>
          <button
            className="w-full text-[#E3270E] px-3 h-10 flex items-center justify-center text-base rounded-[10px] hover:bg-[#F1F6F1]"
            onClick={(e) => {
              e.stopPropagation();

              onDelete(e);
            }}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};
