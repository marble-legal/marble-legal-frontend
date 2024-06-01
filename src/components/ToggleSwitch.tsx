const ToggleSwitch = ({
  isToggled,
  handleToggle,
}: {
  isToggled: boolean;
  handleToggle: () => void;
}) => {
  return (
    <div
      className={`flex items-center w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-300 border-[1px] border-solid border-[#E7D8D8] ${
        isToggled ? "bg-[#E7D8D8]" : "bg-transparent"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-6 h-6 bg-[#B85042] rounded-full shadow-md transform transition-transform duration-300 ${
          isToggled ? "translate-x-8" : ""
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
