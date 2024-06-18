interface Owner {
  name: string;
  address: string;
  interest: string;
  initialContribution: string;
}

interface Client {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface BaseBusinessEntity {
  userId: string;
  name: string;
  address: string;
  state: string;
  clients: Client[];
  owners: Owner[];
  isInvestorsUsCitizen: boolean;
  isRestrictionsOnTransfer: boolean;
  restrictionsOnTransferDetail: string;
  isProfitsLossSharedEqually: boolean;
  type: string;
  issues: string[];
  purpose: string;
  agent: string;
  useTrademark: string;
  specialLicenses: string;
  bankAccountType: string;
  loanDetail: string;
  accountantDetail: string;
  managementDetail: string;
  signingResposibility: string;
  powersDetail: string;
  initialOfficers: string;
}

export interface BusinessEntityCreation extends BaseBusinessEntity {}
export interface BusinessEntity extends BaseBusinessEntity {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  status: number;
}
