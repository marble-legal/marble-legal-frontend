import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface DropdownItem {
  label: any;
  onClick: () => void; // Renamed to onClick and expects a function accepting no arguments
  icon?: JSX.Element;
  className?: string;
}

interface DropdownProps {
  label: any;
  items: DropdownItem[];
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  triggerClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  direction = "down",
  className = "",
  triggerClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const dropdownClasses = clsx(
    "z-[999999] !min-w-[200px] origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 !w-full !transition-transform duration-200 ease-out transform",
    {
      "bottom-full": direction === "up",
      "top-full right-0": direction === "down",
      "right-full": direction === "left",
      "left-full": direction === "right",
      "scale-95 opacity-0": !isOpen, // initial state
      "scale-100 opacity-100": isOpen, // final state
    }
  );

  return (
    <div
      className={clsx("relative inline-block text-left", className)}
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className={clsx(
            "inline-flex items-center justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none",
            triggerClassName
          )}
          onClick={toggleDropdown}
        >
          {label}
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={dropdownClasses}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  toggleDropdown();
                }}
                className="text-black font-[500] block px-4 py-2 text-sm hover:bg-gray-100 flex items-center w-full"
                role="menuitem"
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
