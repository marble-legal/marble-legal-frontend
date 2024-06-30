import { useState } from "react";
import { ReactComponent as ArrowUpIcon } from "../../../assets/icons/arrow-up.svg";

export function Editor({
  onSend,
  isSending,
  disabled,
}: {
  onSend: (message: any) => void;
  isSending: boolean;
  disabled?: boolean;
}) {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <div>
      <div className="px-4 py-3.5 bg-white rounded-lg border border-[#DBDCE8] justify-between items-center gap-2 flex">
        <div className="justify-start flex-1 items-center flex">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSend();
                e.preventDefault();
                return false;
              }
            }}
            rows={1}
            className="w-full bg-transparent max-h-[30vh] border-none focus:outline-none text-base font-medium"
            placeholder="Write your question here"
            disabled={disabled}
          />
          {/* <div
            className="w-full bg-transparent max-h-[30vh] border-none focus:outline-none text-base font-medium"
            contentEditable
            onChange={(e) => console.log(e.currentTarget.textContent)}
          >
            Hello World
          </div> */}
        </div>
        <button
          onClick={handleSend}
          className="p-1 bg-[#B85042] rounded justify-center items-center gap-2.5 flex disabled:bg-gray-400 transition-all"
          disabled={isSending || disabled || message.length === 0}
        >
          <ArrowUpIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
