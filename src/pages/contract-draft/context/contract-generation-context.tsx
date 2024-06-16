import React, { useEffect, useState, useCallback } from "react";
import { getUser } from "../../../helpers/utils";
import { api } from "../../../helpers/api";
import moment from "moment";

export const ContractGenerationContext = React.createContext({});

export function ContractGenerationProvider({ children }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    date: { startDate: "", endDate: "" },
    types: [],
  });
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
        const res = await api.getContracts(userId, true);
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

  const filterContractList = (
    list: any[] | null,
    search: string,
    filters: {
      date: { startDate: string; endDate: string };
      types: string[];
    } | null
  ) => {
    if (!list) return [];
    let filteredList = list;

    if (search) {
      filteredList = filteredList.filter((item) => {
        return item?.title?.toLowerCase().includes(search.toLowerCase());
      });
    }
    if (filters) {
      if (
        filters.date.startDate &&
        filters.date.endDate &&
        filters.date.startDate !== "" &&
        filters.date.endDate !== ""
      ) {
        const { startDate, endDate } = filters.date;
        filteredList = filteredList.filter((item) => {
          const itemDate = moment(item.createdAt);
          const start = moment(startDate, "YYYY-MM-DD")
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .local();
          const end = moment(endDate, "YYYY-MM-DD").local().endOf("day");
          return itemDate.isSameOrAfter(start) && itemDate.isSameOrBefore(end);
        });
      }

      if (filters.types && filters.types.length > 0) {
        filteredList = filteredList.filter((item) => {
          return filters.types.includes(item.type);
        });
      }
    }

    return filteredList;
  };
  const values = {
    contractList: filterContractList(contractList, search, filters),
    setContractList,
    selectedContract,
    setSelectedContract,
    loading,
    setLoading,
    refetchContractList: refetch,
    search,
    setSearch,
    filters,
    setFilters,
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
