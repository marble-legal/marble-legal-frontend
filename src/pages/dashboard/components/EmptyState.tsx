import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import { ReactComponent as MessageText } from "../../../assets/icons/message-text-outline.svg";

export function EmptyState() {
  return (
    <div className="self-center flex flex-col items-center">
      <div className="bg-white rounded-full w-[73px] h-[73px] flex justify-center items-center">
        <Logo className="w-11 h-11" />
      </div>
      <div className="text-black mt-[18px] mb-7 font-medium text-base leading-[27.2px]">
        Ask any legal query you have
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-4 w-[360px] bg-slate-100 rounded-lg border border-gray-300 justify-start items-center flex">
          <div className="justify-start items-center gap-2 flex">
            <MessageText className="w-5 h-5" />
            <div className=" text-black text-sm font-normal leading-tight">
              What steps should I take to form an LLC?
            </div>
          </div>
        </div>
        <div className="p-4 w-[360px] bg-slate-100 rounded-lg border border-gray-300 justify-start items-center flex">
          <div className="justify-start items-center gap-2 flex">
            <MessageText className="w-5 h-5" />
            <div className=" text-black text-sm font-normal leading-tight">
              How can I protect my intellectual property?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
