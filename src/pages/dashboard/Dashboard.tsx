import { useEffect, useState } from "react";
import { api } from "../../helpers/api";
import Button from "../../components/Button";
import { ReactComponent as LikeIcon } from "../../assets/icons/like.svg";
import { ReactComponent as DisLikeIcon } from "../../assets/icons/dislike.svg";
import { ReactComponent as RegenerateIcon } from "../../assets/icons/regenerate.svg";
import { EmptyState } from "./components/EmptyState";
import { Editor } from "./components/Editor";
import { Message } from "./components/Message";
import Spinner from "../../components/Spinners";
import React from "react";

export default function Dashboard() {
  const [conversation, setConversation] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const [currentReply, setCurrentReply] = useState<string>("");
  const [error, setError] = useState("");
  const listRef = React.useRef<HTMLDivElement | null>(null);

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
      const response = await api.getAllConversations();
      console.log(response);
      if ([200, 201].includes(response.status)) {
        setCurrentUserMessage("");
        setCurrentReply("");
        setConversation(response.data);
      }

      setLoading(false);
    } catch (error) {}
  };

  const handleLike = async (conversationId: string) => {
    try {
      const response = await api.updateConversation(conversationId, {
        likeStatus: 1,
      });
      if ([200, 201].includes(response.status)) {
        const updatedConversation = conversation.map((item) => {
          if (item.id === conversationId) {
            return { ...item, likeStatus: 1 };
          }
          return item;
        });
        setConversation(updatedConversation);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisLike = async (conversationId: string) => {
    try {
      const response = await api.updateConversation(conversationId, {
        likeStatus: 2,
      });
      if ([200, 201].includes(response.status)) {
        const updatedConversation = conversation.map((item) => {
          if (item.id === conversationId) {
            return { ...item, likeStatus: 2 };
          }
          return item;
        });
        setConversation(updatedConversation);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      <div className="shadow-header px-[1.875rem] py-4">
        <h1 className="font-outfit text-[1.25rem] font-[500]">
          Legal AI assistant
        </h1>
      </div>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgba(242, 245, 251, 0.20) 0%, #F2F5FB 76.09%)",
        }}
        className="absolute top-[80px] left-0 right-0 h-[118px]"
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
                  onDisLike={handleDisLike}
                  onLike={handleLike}
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
      <div className="w-[97%] sm:w-[580px] mx-auto mb-4">
        <Editor onSend={askQuery} isSending={sending} />
      </div>
    </div>
  );
}
