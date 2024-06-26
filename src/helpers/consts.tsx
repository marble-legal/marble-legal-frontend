import { ReactComponent as MessageIcon } from "../assets/icons/message-text.svg";
import { ReactComponent as ContractIcon } from "../assets/icons/scan.svg";
import { ReactComponent as DocumentIcon } from "../assets/icons/document-text.svg";
import { ReactComponent as BuildingIcon } from "../assets/icons/buliding.svg";
import { ReactComponent as AttorneyIcon } from "../assets/icons/attorny.svg";

export const SubscriptionTier = {
  Basic: "IN",
  Standard: "SB",
  Enterprise: "SP",
  Customised: "CU",
};

export const subscriptions = [
  {
    plan: "Pay per query",
    price: "Cost will vary per document",
    tier: SubscriptionTier.Customised,
    features: ["Unlimited queries", "Pay per document generated"],
    color: "#F3FAFE",
    subscriptionBg: "#D5EFFA",
    subscriptionText: "#139EA7",
  },
  {
    plan: "Base",
    price: "19.99",
    yearlyPrice: "199",
    tier: SubscriptionTier.Basic,
    features: [
      "10 queries per month",
      "2 AI-generated contracts per month",
      "2 AI-analyzed contracts per month",
    ],
    color: "#F9F3FE",
    subscriptionBg: "#DECAFF",
    subscriptionText: "#883EC2",
  },
  {
    plan: "Professional",
    price: "99.99",
    yearlyPrice: "999",
    tier: SubscriptionTier.Standard,
    features: [
      "Unlimited queries",
      "Unlimited contract drafting",
      "Unlimited contract analysis",
    ],
    color: "#FEF5F3",
    subscriptionBg: "#FFE5D6",
    subscriptionText: "#B85042",
  },
  {
    plan: "Contact for custom pricing and plans",
    price: "99.99",
    yearlyPrice: "999",
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
    input_label: "# of drafts",
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
    input_label: "# of Analysis",
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
    input_label: "# of entities",
  },
  {
    id: "attorneyReview",
    title: "Attorney Review",
    description:
      "Ensure legal accuracy and compliance with expert attorney feedback",
    price: "100",
    priceDesc: "per review",
    icon: (
      <div className="bg-[rgba(232,232,232,0.50)] p-3 rounded-[8px] h-fit w-fit">
        <AttorneyIcon className="w-8 h-8" />
      </div>
    ),
    input_label: "# of reviews",
    isHorizontal: true,
  },
];

export const contractTypes = [
  { value: "business-consulting", label: "Business Consulting" },
  { value: "employment", label: "Employment" },
  { value: "llc", label: "LLC" },
  { value: "llc-operating-agreements", label: "LLC Operating Agreements" },
  { value: "llc-ownership-assignment", label: "LLC Ownership Assignment" },
  { value: "non-profit", label: "Non-Profit" },
  { value: "promissory-note-mortgages", label: "Promissory Note Mortgages" },
  { value: "real-estate", label: "Real Estate" },
  { value: "trust-probate", label: "Trust Probate" },
];

export const PlanType = {
  yearly: "Y",
  monthly: "M",
};

export const FeatureCode = {
  aiAssitant: "AI",
  contractAnalysis: "CA",
  contractDrafting: "CD",
  businessEntity: "BE",
  attorneyReview: "AR",
};
