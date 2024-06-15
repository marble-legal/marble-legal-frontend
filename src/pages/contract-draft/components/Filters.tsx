import moment from "moment";
import useResponsive from "../../../helpers/useResponsive";
import { ReactComponent as FiltersIcon } from "../../../assets/icons/filters.svg";
import UIPopover from "../../../components/Popover";
import Button from "../../../components/Button";
import RadioButton from "../../../components/RadioButton";
import { contractTypes } from "../../../helpers/consts";
import Checkbox from "../../../components/Checkbox";

export function FilterPopup({
  hasFilters,
  setTempFilters,
  tempFilters,
  setFilters,
}) {
  const { isAnyMobile } = useResponsive();

  const handleDateChange = (value: string) => {
    if (value === "this_week") {
      setTempFilters({
        ...tempFilters,
        date: {
          startDate: moment().startOf("week").toISOString(),
          endDate: moment().endOf("week").toISOString(),
        },
        selectedDateFilter: value,
      });
    } else if (value === "this_month") {
      setTempFilters({
        ...tempFilters,
        date: {
          startDate: moment().startOf("month").toISOString(),
          endDate: moment().endOf("month").toISOString(),
        },
        selectedDateFilter: value,
      });
    } else if (value === "this_year") {
      setTempFilters({
        ...tempFilters,
        date: {
          startDate: moment().startOf("year").toISOString(),
          endDate: moment().endOf("year").toISOString(),
        },
        selectedDateFilter: value,
      });
    } else {
      setTempFilters({
        ...tempFilters,
        date: {
          startDate: "",
          endDate: "",
        },
        selectedDateFilter: value,
      });
    }
  };

  const handleCheckboxChange = (type: string) => {
    // setTempFilters((prevFilters) => ({
    //   ...prevFilters,
    //   types: prevFilters.types.includes(type)
    //     ? prevFilters.types.filter((t) => t !== type)
    //     : [...prevFilters.types, type],
    // }));
    setTempFilters({
      ...tempFilters,
      types: tempFilters?.types?.includes(type)
        ? tempFilters.types.filter((t) => t !== type)
        : [...tempFilters.types, type],
    });
  };

  const options = [
    { label: "This week", value: "this_week" },
    { label: "This month", value: "this_month" },
    { label: "This year", value: "this_year" },
    { label: "Custom date", value: "custom_date" },
  ];

  const onApplyFilters = () => {
    setFilters(tempFilters);
  };

  return (
    <UIPopover
      shouldCloseOnScroll={false}
      align={isAnyMobile ? "end" : "center"}
      trigger={
        <div className="flex items-center gap-2 w-full flex-1">
          <Button
            variant="outline"
            className="relative flex flex-row gap-1.5 items-center bg-white h-full"
          >
            <FiltersIcon />
            Filters
            {hasFilters && (
              <div className="absolute -top-1 border border-white -right-1 w-3 h-3 bg-secondaryRed rounded-full" />
            )}
          </Button>
        </div>
      }
    >
      {(close) => (
        <div
          style={{ zIndex: 9999 }}
          className="mt-2 max-w-[320px] md:max-w-[unset] z-20 p-[0.875rem] flex flex-col justify-center items-center bg-white shadow-[0_6px_24px_0_rgba(28,43,40,0.25)] rounded-xl py-2"
        >
          <div className="flex flex-row p-2 flex-wrap gap-4">
            <div className="flex flex-row p-2 flex-wrap gap-4 max-h-[400px] overflow-auto">
              <div className="flex flex-col">
                <span className="tracking-tight font-bold text-sm mb-3">
                  Filter by date Created
                </span>
                <div className="flex flex-col gap-[11px]">
                  <RadioButton
                    name="dateFilter"
                    options={options}
                    selectedValue={tempFilters?.selectedDateFilter}
                    onChange={(value: string) => handleDateChange(value)}
                  />
                  {tempFilters?.selectedDateFilter === "custom_date" && (
                    <div className="flex flex-row gap-1 items-center">
                      <input
                        type="date"
                        className="border-[1px] rounded-md py-2 px-3 text-xs placeholder-[#999999]"
                        value={tempFilters?.date?.startDate}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          setTempFilters({
                            ...tempFilters,
                            date: {
                              ...tempFilters.date,
                              startDate: e.target.value,
                              endDate:
                                tempFilters.date.endDate < e.target.value
                                  ? ""
                                  : tempFilters.date.endDate,
                            },
                          })
                        }
                      />
                      <span className="opacity-[0.4] text-xs">to</span>
                      <input
                        type="date"
                        className="border-[1px] rounded-md py-2 px-3 text-xs placeholder-[#999999]"
                        value={tempFilters?.date?.endDate}
                        min={tempFilters?.date?.startDate}
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          setTempFilters({
                            ...tempFilters,
                            date: {
                              ...tempFilters.date,
                              endDate: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="border-r-[1px] border-black/10 md:flex hidden" />

              <div className="flex flex-col">
                <span className="tracking-tight font-bold text-sm mb-3">
                  Filter by date Created
                </span>
                <div className="flex flex-col gap-3.5">
                  {contractTypes.map((type, index) => (
                    <label
                      key={index}
                      htmlFor={type.value}
                      className="flex flex-row gap-1.5 font-medium text-sm items-center cursor-pointer font-inter"
                    >
                      <Checkbox
                        label={type.value}
                        className="w-[1.375rem] h-[1.375rem]"
                        checked={tempFilters?.types?.includes(type.value)}
                        onChange={() => handleCheckboxChange(type.value)}
                      />
                      {type.value}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <Button
              className="w-full !py-2"
              onClick={() => {
                onApplyFilters();
                close();
              }}
              disabled={
                tempFilters?.selectedDateFilter === "custom_date" &&
                (!tempFilters?.date?.startDate || !tempFilters?.date?.endDate)
              }
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </UIPopover>
  );
}
