import clsx from "clsx";

function Checkbox({ label, className }: { label: string; className?: string }) {
  return (
    <div className="flex items-center">
      <input
        id={label}
        type="checkbox"
        className="hidden" // Hides the checkbox
        onChange={(e) => console.log(e.target.checked)} // Handle change
      />
      <label
        htmlFor={label}
        className={clsx(
          "w-4 h-4 flex items-center justify-center bg-white border-[1px] border-gray-300 rounded cursor-pointer hover:bg-gray-100",
          className
        )}
      >
        {/* Icon when checked, controlled by sibling input:checked */}
        <svg
          className="w-4 h-4 text-secondaryRed hidden" // Hidden by default
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
}

export default Checkbox;
