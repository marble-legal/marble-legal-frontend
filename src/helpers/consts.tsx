import { ReactComponent as MessageIcon } from "../assets/icons/message-text.svg";
import { ReactComponent as ContractIcon } from "../assets/icons/scan.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document-text.svg";
import { ReactComponent as BuildingIcon } from "../assets/icons/buliding.svg";

export const SubscriptionTier = {
  Basic: "IN",
  Standard: "SB",
  Enterprise: "SP",
  Customised: "CU",
};

export const subscriptions = [
  {
    plan: "A La Carte",
    price: "Cost will vary per document",
    tier: SubscriptionTier.Customised,
    features: ["Unlimited queries", "Pay per document generated"],
    color: "#F3FAFE",
    subscriptionBg: "#D5EFFA",
    subscriptionText: "#139EA7",
  },
  {
    plan: "Basic",
    price: "49.99",
    tier: SubscriptionTier.Basic,
    features: [
      "Unlimited queries & work product",
      "Discounted work product",
      "Discounted rate for “in-network” attorney",
    ],
    color: "#F9F3FE",
    subscriptionBg: "#DECAFF",
    subscriptionText: "#883EC2",
  },
  {
    plan: "Standard",
    price: "99.99",
    tier: SubscriptionTier.Standard,
    features: [
      "Unlimited queries & work product",
      "Annual registration",
      "Virtual address",
      "Register agent service",
    ],
    color: "#FEF5F3",
    subscriptionBg: "#FFE5D6",
    subscriptionText: "#B85042",
  },
  {
    plan: "Enterprise",
    price: "99.99",
    tier: SubscriptionTier.Enterprise,
    features: ["Unlimited queries", "Lead generation"],
    color: "rgba(213, 250, 226, 0.30)",
    subscriptionBg: "#D6FFE1",
    subscriptionText: "#1B7329",
  },
];

export const featureSpecificPlan = [
  {
    id: "aiAssistant",
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
    id: "contractDrafting",
    title: "Contract draft generation",
    description:
      "Effortlessly input your contract requirements and receive meticulously crafted, customized draft contracts promptly.",
    // price: "$5 per draft generation",
    price: "10",
    priceDesc: "per draft generation",
    icon: (
      <div className="bg-[#F5FAF0] p-3 rounded-[8px] h-fit w-fit">
        <DocumentIcon className="[&>g>path]:fill-[#5E9B22] [&>path]:fill-[#5E9B22] w-8 h-8" />
      </div>
    ),
    input_label: "# of draft you need",
  },
  {
    id: "contractAnalysis",
    title: "Contract Analysis",
    description:
      "Upload existing contracts for detailed analysis and insights on clauses and key information.",
    // price: "$5 per generation",
    price: "10",
    priceDesc: "per generation",
    icon: (
      <div className="bg-[#F2FFFC] p-3 rounded-[8px] h-fit w-fit">
        <ContractIcon className="[&>g>path]:fill-[#42B89C] [&>path]:fill-[#42B89C] w-8 h-8" />
      </div>
    ),
    input_label: "# of Analysis you need",
  },
  {
    id: "businessEntity",
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

export const PlanType = {
  yearly: "Y",
  monthly: "M",
};
