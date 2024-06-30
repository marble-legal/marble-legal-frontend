const ToggleSwitch = ({
  isToggled,
  handleToggle,
}: {
  isToggled: boolean;
  handleToggle: () => void;
}) => {
  return (
    <div
      className={`flex items-center w-[2.5625rem] h-[1.5625rem] p-1 rounded-full cursor-pointer transition-colors duration-100 border-[1px] border-solid border-[#E7D8D8] ${
        isToggled ? "bg-[#B85042]" : "bg-transparent"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${
          isToggled ? "translate-x-4 bg-white" : "bg-[#B85042]"
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;
