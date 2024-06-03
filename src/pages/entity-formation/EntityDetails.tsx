import FullScreenModal from "../../components/FullScreenModal";
import { EntityDetailsCard } from "./EntityFormation";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile-icon.svg";
import { ReactComponent as PercentageIcon } from "../../assets/icons/percentage.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg";
import { ReactComponent as ContactIcon } from "../../assets/icons/contact.svg";
// import clsx from "clsx";

export default function EntityDetails({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  return (
    <FullScreenModal isOpen={isOpen} onClose={handleClose}>
      <div className="max-w-[800px] items-center justify-center flex flex-col w-full mx-auto gap-5 md:py-[2.625rem] p-2">
        <EntityDetailsCard data={{ status: "Completed" }} />
        <OwnerDetails />
        <AgentDetails />
        <DirectorDetails />
      </div>
    </FullScreenModal>
  );
}

const IconText = ({ icon: Icon, text }) => {
  return (
    <span className="flex flex-row items-center gap-1">
      <Icon />
      {text}
    </span>
  );
};

const OwnerData = [
  {
    name: "Owners 1 Information",
    details: [
      { icon: ProfileIcon, label: "Owner name", value: "Owner 1" },
      { icon: PercentageIcon, label: "Ownership percentage", value: "50%" },
      {
        icon: LocationIcon,
        label: "Owner Address",
        value: "1100 Plum Creek Pkwy",
      },
    ],
  },
  {
    name: "Owner 2 Information",
    details: [
      { icon: ProfileIcon, label: "Owner name", value: "Owner 2" },
      { icon: PercentageIcon, label: "Ownership percentage", value: "50%" },
      {
        icon: LocationIcon,
        label: "Owner Address",
        value: "1100 Plum Creek Pkwy",
      },
    ],
  },
];

function OwnerDetails() {
  return (
    <div className="bg-white p-4 rounded-lg w-full shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Owners information</h1>
      {OwnerData.map((owner, index) => (
        <DetailsCard key={index} data={owner} />
      ))}
    </div>
  );
}

const AgentData = {
  name: "Agent Information",
  details: [
    { icon: ProfileIcon, label: "Agent name", value: "Agent 1" },
    {
      icon: ContactIcon,
      label: "Agent Contact",
      value: "Example",
    },
    {
      icon: LocationIcon,
      label: "Agent Address",
      value: "1100 Plum Creek Pkwy",
    },
  ],
};

function AgentDetails() {
  return (
    <div className="bg-white p-4 rounded-lg w-full shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Agent information</h1>
      <DetailsCard data={AgentData} />
    </div>
  );
}

const DirectorData = [
  {
    name: "Director 1",
    details: [
      { icon: ProfileIcon, label: "Owner name", value: "Owner 1" },
      { icon: PercentageIcon, label: "Ownership percentage", value: "50%" },
      {
        icon: LocationIcon,
        label: "Owner Address",
        value: "1100 Plum Creek Pkwy",
      },
    ],
  },
  {
    name: "Director 2",
    details: [
      { icon: ProfileIcon, label: "Owner name", value: "Owner 2" },
      { icon: PercentageIcon, label: "Ownership percentage", value: "50%" },
      {
        icon: LocationIcon,
        label: "Owner Address",
        value: "1100 Plum Creek Pkwy",
      },
    ],
  },
];

function DirectorDetails() {
  return (
    <div className="bg-white p-4 rounded-lg w-full shadow-[2px_4px_9px_0px_rgba(107,103,158,0.05)] flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Director information</h1>
      {DirectorData.map((director, index) => (
        <DetailsCard key={index} data={director} />
      ))}
    </div>
  );
}

function DetailsCard({
  data,
}: {
  data: {
    name?: string;
    details: {
      icon: React.FC<React.SVGProps<SVGSVGElement>>;
      label: string;
      value: string;
    }[];
  };
}) {
  return (
    <div className="border-solid border-[1px] border-[#E0E9FD] rounded-[10px] bg-[#F8FBFF] p-4 flex flex-col gap-[0.875rem]">
      {data.name && (
        <span className="text-[0.875rem] font-[500] leading-[110%]">
          {data.name}
        </span>
      )}
      {/* have a div with 2 cols */}
      <div className="grid grid-cols-6 gap-4">
        <div className="flex flex-col md:gap-[0.8125rem] gap-6 md:col-span-2 col-span-6 text-[#666] text-[0.875rem] font-[500]">
          {data.details.map((detail, index) => (
            <div className="flex flex-col gap-2">
              <IconText key={index} icon={detail.icon} text={detail.label} />
              <div className="md:hidden flex flex-col gap-[0.8125rem] col-span-4 text-black text-[0.875rem] font-[500]">
                <span key={index}>{detail.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="md:flex hidden flex-col gap-[0.8125rem] col-span-4 text-black text-[0.875rem] font-[500]">
          {data.details.map((detail, index) => (
            <span key={index}>{detail.value}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
