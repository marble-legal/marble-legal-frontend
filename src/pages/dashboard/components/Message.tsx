import { useState } from "react";
import { ReactComponent as LikeIcon } from "../../../assets/icons/like.svg";
import { ReactComponent as DisLikeIcon } from "../../../assets/icons/dislike.svg";
import { ReactComponent as CopyIcon } from "../../../assets/icons/copy.svg";
import { ReactComponent as LogoIcon } from "../../../assets/icons/logo.svg";

import { getInitial, getUser } from "../../../helpers/utils";

export function Message({
  conversation,
  onLike,
  onDisLike,
}: {
  conversation: any;
  onLike?: (id: string) => void;
  onDisLike?: (id: string) => void;
}) {
  const profileImg = null;
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  const user = getUser();

  if (conversation.isUserMessage) {
    return (
      <div className="relative w-full justify-start items-start gap-1.5 mb-3 flex">
        <div className="pl-4 flex-1 pr-5 py-4 rounded-lg border border-[#D0CEE3] justify-start items-start gap-3 flex">
          <div className="justify-start items-center gap-1.5 flex">
            <div className="w-6 h-6 bg-primary rounded justify-center items-center gap-2.5 flex">
              {profileImg ? (
                <img
                  className="w-5 h-5"
                  src="https://via.placeholder.com/20x20"
                  alt="user"
                />
              ) : (
                <div className="text-white text-xs font-medium">
                  {user?.fullName
                    ? getInitial(
                        user?.fullName?.split(" ")[0],
                        user?.fullName?.split(" ")[1]
                      )
                    : ""}
                </div>
              )}
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-3 flex">
            <div className="opacity-90 text-black text-base font-normal leading-normal">
              {conversation.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full justify-start items-start gap-1.5 mb-12 sm:mb-8 flex">
      <div className="pl-4 flex-1 pr-5 py-4 bg-white/70 rounded-lg border border-[#DCDBE8] justify-start items-start gap-3 flex">
        <div className="justify-start items-center gap-1.5 flex">
          <div className="w-6 h-6 bg-[rgba(166,189,173,0.27)] rounded justify-center items-center gap-2.5 flex">
            <LogoIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-3 flex">
          <div className="opacity-90 text-black text-base font-normal leading-normal">
            {conversation.message}
          </div>
        </div>
      </div>
      {onLike && onDisLike && (
        <div className="absolute sm:-right-[72px] sm:top-0 right-0 -bottom-6 sm:bottom-0 sm:h-full sm:justify-start sm:items-center gap-2 flex">
          <button
            onClick={() => onLike(conversation.id)}
            className="w-4 h-4 rounded justify-center items-center flex"
          >
            <LikeIcon
              className={`w-4 h-4 ${
                conversation.likeStatus === 1
                  ? "[&_path]:fill-[#B7FAC9] [&_path]:stroke-[#34A853]"
                  : "[&_path]:fill-transparent [&_path]:stroke-[#A8A8A8]"
              }`}
            />
          </button>
          <button
            onClick={() => onDisLike(conversation.id)}
            className="w-4 h-4 rounded justify-center items-center flex"
          >
            <DisLikeIcon
              className={`w-4 h-4 ${
                conversation.likeStatus === 2
                  ? "[&_path]:fill-[#B7FAC9] [&_path]:stroke-[#34A853]"
                  : ""
              }`}
            />
          </button>
          <button
            onClick={() => handleCopy(conversation.message)}
            className="w-4 h-4 rounded justify-center items-center flex"
          >
            <CopyIcon
              className={`w-4 h-4 ${
                isCopied
                  ? "[&_path]:fill-[#B7FAC9] [&_path]:stroke-[#34A853]"
                  : ""
              }`}
            />
          </button>
        </div>
      )}
    </div>
  );
}
