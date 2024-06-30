import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import { ReactComponent as MessageText } from "../../../assets/icons/message-text-outline.svg";

export function EmptyState() {
  return (
    <div className="self-center flex flex-col items-center">
      <div className="bg-white rounded-[12px] flex justify-center items-center border border-[#E5EFF6] px-6 py-2">
        <Logo className="w-16" />
      </div>
      <div className="text-black mt-[18px] mb-7 font-medium text-base leading-[27.2px]">
        Ask any legal query you have
      </div>
      <div className="flex flex-col gap-2">
        <div className="p-4 lg:w-[360px] bg-slate-100 rounded-lg border border-gray-300 justify-start lg:items-center flex">
          <div className="justify-start lg:items-center gap-2 flex">
            <MessageText className="w-5 h-5" />
            <div className=" text-black text-sm font-normal leading-tight">
              What steps should I take to form an LLC?
            </div>
          </div>
        </div>
        <div className="p-4 lg:w-[360px] bg-slate-100 rounded-lg border border-gray-300 justify-start lg:items-center flex">
          <div className="justify-start lg:items-center gap-2 flex">
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
