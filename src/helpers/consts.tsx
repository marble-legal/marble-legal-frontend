import { ReactComponent as MessageIcon } from "../assets/icons/message-text.svg";
import { ReactComponent as ContractIcon } from "../assets/icons/scan.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document-text.svg";
import { ReactComponent as BuildingIcon } from "../assets/icons/buliding.svg";

export const subscriptions = [
  {
    plan: "Basic",
    price: "49",
    features: [
      "Legal AI assistant",
      "10 contract generation",
      "10 Contract analysis",
      "Access to business entity formation",
    ],
    color: "#F3FAFE",
    subscriptionBg: "#D5EFFA",
    subscriptionText: "#139EA7",
  },
  {
    plan: "Standard",
    price: "199",
    features: [
      "Legal AI assistant",
      "50 contract generation",
      "50 Contract analysis",
      "Access to business entity formation",
    ],
    color: "#F9F3FE",
    subscriptionBg: "#DECAFF",
    subscriptionText: "#883EC2",
  },
  {
    plan: "Premium",
    price: "349",
    features: [
      "Legal AI assistant",
      "Unlimited contract generation",
      "Unlimited Contract analysis",
      "Access to business entity formation",
    ],
    color: "#FEF5F3",
    subscriptionBg: "#FFE5D6",
    subscriptionText: "#B85042",
  },
];

export const featureSpecificPlan = [
  {
    id: "assistant",
    title: "Legal AI assistant",
    description:
      "Engage in dynamic, real-time conversations with AI to get instant answers and expert guidance.",
    price: "20",
    priceDesc: "for 1 month",
    icon: (
      <div className="bg-[#FCF7F2] p-3 rounded-[8px] h-fit w-fit">
        <MessageIcon className="[&>g>path]:fill-[#986324] [&>path]:fill-[#986324] w-8 h-8" />
      </div>
    ),
    input_label: "How many months?",
  },
  {
    id: "draft",
    title: "Contract draft generation",
    description:
      "Effortlessly input your contract requirements and receive meticulously crafted, customized draft contracts promptly.",
    // price: "$5 per draft generation",
    price: "5",
    priceDesc: "per draft generation",
    icon: (
      <div className="bg-[#F5FAF0] p-3 rounded-[8px] h-fit w-fit">
        <DocumentIcon className="[&>g>path]:fill-[#5E9B22] [&>path]:fill-[#5E9B22] w-8 h-8" />
      </div>
    ),
    input_label: "# of draft you need",
  },
  {
    id: "analysis",
    title: "Contract Analysis",
    description:
      "Upload existing contracts for detailed analysis and insights on clauses and key information.",
    // price: "$5 per generation",
    price: "5",
    priceDesc: "per generation",
    icon: (
      <div className="bg-[#F2FFFC] p-3 rounded-[8px] h-fit w-fit">
        <ContractIcon className="[&>g>path]:fill-[#42B89C] [&>path]:fill-[#42B89C] w-8 h-8" />
      </div>
    ),
    input_label: "# of Analysis you need",
  },
  {
    id: "entity",
    title: "Business Entity formation",
    description:
      "Provide essential details for forming new entities and receive prompt processing by licensed attorneys.",
    // price: "$100 per entity formation",
    price: "100",
    priceDesc: "per entity formation",
    icon: (
      <div className="bg-[#F9F6FF] p-3 rounded-[8px] h-fit w-fit">
        <BuildingIcon className="[&>g>path]:fill-[#5A42B8] [&>g>g>path]:fill-[#5A42B8] [&>path]:fill-[#5A42B8] w-8 h-8" />
      </div>
    ),
    input_label: "# of entities you need",
  },
];

export const contractTypes = [
  { value: "Employment Contracts", label: "Employment Contracts" },
  { value: "Non-Disclosure Agreement", label: "Non-Disclosure Agreement" },
  { value: "Service Agreement", label: "Service Agreement" },
  { value: "Lease Agreement", label: "Lease Agreement" },
  { value: "Partnership Agreement", label: "Partnership Agreement" },
  {
    value: "Independent Contractor Agreement",
    label: "Independent Contractor Agreement",
  },
  { value: "Sales Agreement", label: "Sales Agreement" },
  { value: "Licensing Agreement", label: "Licensing Agreement" },
  { value: "Confidentiality Agreement", label: "Confidentiality Agreement" },
  { value: "Consulting Agreement", label: "Consulting Agreement" },
];
