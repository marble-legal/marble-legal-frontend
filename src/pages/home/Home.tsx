import HueBG from "../../assets/images/hue.png";
import { ReactComponent as MessageIcon } from "../../assets/icons/message-text.svg";
import { ReactComponent as ContractIcon } from "../../assets/icons/scan.svg";
import { ReactComponent as DocumentIcon } from "../../assets/icons/document-text.svg";
import { ReactComponent as BuildingIcon } from "../../assets/icons/buliding.svg";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron.svg";
import { ReactComponent as PremiumCrownIcon } from "../../assets/icons/premium-crown.svg";
import ProfileImageIcon from "../../assets/icons/profile.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useViewportWidth } from "../../helpers/useViewportHeight";

export default function Home() {
  const { user } = useAuth();
  const viewWidth = useViewportWidth();
  const items = [
    {
      title: "Legal AI assistant",
      description:
        "Engage in dynamic, real-time conversations with AI to get instant answers and expert guidance.",
      icon: (
        <div className="bg-[#FCF7F2] p-3 rounded-[8px] h-fit">
          <MessageIcon className="[&>g>path]:fill-[#986324] [&>path]:fill-[#986324] w-8 h-8" />
        </div>
      ),
      link: "/dashboard",
    },
    {
      title: "Contract draft generation",
      description:
        "Effortlessly input your contract requirements and receive meticulously crafted, customized draft contracts promptly.",
      icon: (
        <div className="bg-[#F5FAF0] p-3 rounded-[8px] h-fit">
          <DocumentIcon className="[&>g>path]:fill-[#5E9B22] [&>path]:fill-[#5E9B22] w-8 h-8" />
        </div>
      ),
      link: "/draft-generation",
    },
    {
      title: "Contract Analysis",
      description:
        "Upload existing contracts for detailed analysis and insights on clauses and key information.",
      icon: (
        <div className="bg-[#F2FFFC] p-3 rounded-[8px] h-fit">
          <ContractIcon className="[&>g>path]:fill-[#42B89C] [&>path]:fill-[#42B89C] w-8 h-8" />
        </div>
      ),
      link: "/contracts",
    },
    {
      title: "Business Entity formation",
      description:
        "Provide essential details for forming new entities and receive prompt processing by licensed attorneys.",
      icon: (
        <div className="bg-[#F9F6FF] p-3 rounded-[8px] h-fit">
          <BuildingIcon className="[&>g>path]:fill-[#5A42B8] [&>g>g>path]:fill-[#5A42B8] [&>path]:fill-[#5A42B8] w-8 h-8" />
        </div>
      ),
      link: "/entity-formation",
    },
  ];

  return (
    <div
      className="md:h-[calc(100%)] grid items-center justify-center"
      style={
        viewWidth < 768
          ? { padding: "1rem" }
          : {
              backgroundImage: `url(${HueBG})`,
              backgroundSize: "auto",
              backgroundRepeat: "no-repeat",
              backgroundPosition: " bottom center",
            }
      }
    >
      <div className="md:-mt-[3.125rem] mt-[3.5rem]">
        <div className="mb-3 justify-center gap-[1.25rem] grid">
          <div className="relative">
            <img
              src={user?.profileImg || ProfileImageIcon}
              alt="profile"
              className="h-16 w-16 rounded-full mx-auto"
            />
            <PremiumCrownIcon className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full" />
          </div>
          <h1 className="text-center font-[700] text-[1.75rem] font-outfit">
            Welcome back {user?.fullName}!
          </h1>
        </div>
        <div className="mt-3 mb-[2.5rem]">
          <p className="leading-[150%] text-[#888] text-[0.875rem] max-w-[430px] text-center mx-auto">
            Revolutionizing the legal landscape through resources, knowledge
            share, and artificial intelligence.
          </p>
        </div>
        <div className="flex flex-row flex-wrap max-w-[850px] gap-4">
          {items.map((item) => (
            <Card
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}) {
  return (
    <Link
      to={link || "/home"}
      className="bg-[white] p-5 flex-1 md:min-w-[40%] shadow-homeShadow flex gap-4 rounded-[12px] cursor-pointer"
    >
      <div className="flex justify-center h-fit">{icon}</div>
      <div className="grid gap-2 content-baseline">
        <div className="flex gap-1 items-center">
          <h2 className="font-outfit font-[500]">{title}</h2>
          <ChevronIcon />
        </div>
        <p className="leading-[150%] text-[#888] text-[0.875rem]">
          {description}
        </p>
      </div>
    </Link>
  );
}
