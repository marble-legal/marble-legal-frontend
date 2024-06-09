import React, { useEffect, useState, useCallback } from "react";
import { getUser } from "../../../helpers/utils";
import { api } from "../../../helpers/api";

export const ContractGenerationContext = React.createContext({});

export function ContractGenerationProvider({ children }) {
  const [search, setSearch] = useState("");
  const [contractList, setContractList] = React.useState<any[] | null>(null);
  const [selectedContract, setSelectedContract] = React.useState<any | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const user = getUser();

  const fetchContracts = useCallback(
    async (userId?: string) => {
      if (!userId) return;
      try {
        setLoading(true);
        const res = await api.getContracts(userId, false);
        console.log(res);
        setLoading(false);
        setContractList(res.data || []);
        if (!selectedContract && res?.data?.[0]) {
          setSelectedContract(res.data[0]);
        }
      } catch (e) {}
    },
    [selectedContract]
  );

  const refetch = async () => {
    if (!user.id) return;
    await fetchContracts(user?.id);
  };

  useEffect(() => {
    if (user.id) {
      fetchContracts(user.id);
    }
  }, [user.id, fetchContracts]);

  const filterContractList = (list, search) => {
    if (!list) return [];
    if (!search) return list;
    return list.filter((item) => {
      return item?.title?.toLowerCase().includes(search.toLowerCase());
    });
  };

  console.log({ contractList });
  const values = {
    contractList: filterContractList(contractList, search),
    setContractList,
    selectedContract,
    setSelectedContract,
    loading,
    setLoading,
    refetchContractList: refetch,
    search,
    setSearch,
  };

  return (
    <ContractGenerationContext.Provider value={values}>
      {children}
    </ContractGenerationContext.Provider>
  );
}

export function useContractGeneration() {
  const context = React.useContext(ContractGenerationContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a ContractAnalysisProvider");
  }
  return context;
}
