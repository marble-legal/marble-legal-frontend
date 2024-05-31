import React, { useEffect, useRef } from "react";
import { Popover } from "react-tiny-popover";
import { twMerge } from "tailwind-merge";
type Position = "bottom" | "left" | "right" | "top";

function UIPopover({
  children,
  trigger,
  positions,
  withChevron,
  containerClassName,
  popoverButtonClassName = "",
  disabled,
}: {
  children: (close: () => void, position?: string) => any;
  trigger: any;
  positions?: Position[];
  withChevron?: boolean;
  containerClassName?: string;
  popoverButtonClassName?: string;
  disabled?: boolean;
}) {
  const clickMeButtonRef = useRef<any>();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  useEffect(() => {
    // on scroll, close the popover
    const handleScroll = () => {
      setIsPopoverOpen(false);
    };
    document.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={positions || ["bottom", "top", "left", "right"]}
      clickOutsideCapture={true}
      onClickOutside={() => {
        setIsPopoverOpen(false);
      }}
      ref={clickMeButtonRef}
      content={({ position }) =>
        children(() => setIsPopoverOpen(!isPopoverOpen), position)
      }
      containerClassName={containerClassName}
    >
      <button
        className={twMerge(
          `flex flex-col ${isPopoverOpen ? "[&>div>div]:bg-primary" : ""}`,
          popoverButtonClassName
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsPopoverOpen(!isPopoverOpen);
        }}
        disabled={disabled}
      >
        {withChevron ? trigger(isPopoverOpen) : trigger}
      </button>
    </Popover>
  );
}

export default UIPopover;
