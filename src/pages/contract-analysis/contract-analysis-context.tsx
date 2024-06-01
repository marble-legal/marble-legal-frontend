import React, { useEffect, useState, useCallback } from "react";
import { getUser } from "../../helpers/utils";
import { api } from "../../helpers/api";

export const ContractAnalysisContext = React.createContext({});

export function ContractAnalysisProvider({ children }) {
  const [contractList, setContractList] = React.useState<any[] | null>(null);
  const [selectedContract, setSelectedContract] = React.useState<any | null>(
    null
  );
  const [conversations, setConversations] = React.useState<any[] | null>(null);
  const [conversationLoading, setConversationLoading] = React.useState(false);
  const [currentUserMessage, setCurrentUserMessage] = useState("");
  const [currentReply, setCurrentReply] = useState<string>("");
  const [sending, setSending] = useState(false);

  const [loading, setLoading] = useState(false);
  const user = getUser();

  const fetchContractMessages = useCallback(
    async (contractId: string, shouldShowLoading = true) => {
      if (!user?.id) return;
      try {
        shouldShowLoading && setConversationLoading(true);
        const res = await api.getAllConversations(user?.id, contractId);
        // console.log(res);
        shouldShowLoading && setConversationLoading(false);
        if ([200, 201].includes(res.status)) {
          setConversations(res?.data || []);
          setCurrentUserMessage("");
          setCurrentReply("");
        }
      } catch (e) {
        shouldShowLoading && setConversationLoading(false);
      }
    },
    [user?.id]
  );

  const askQuery = async (message: string) => {
    if (!message) return;
    try {
      setCurrentUserMessage(message);
      setSending(true);
      const response = await api.queryContract(selectedContract.id, {
        message,
      });
      setSending(false);
      if ([200, 201].includes(response.status)) {
        setCurrentReply(response.data.message);
        fetchContractMessages(selectedContract.id, false);
      }
      // console.log(response);
    } catch (error) {
      setSending(false);
      // console.log(error);
    }
  };

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

  useEffect(() => {
    if (selectedContract?.id) {
      fetchContractMessages(selectedContract.id);
    }
  }, [selectedContract, fetchContractMessages]);

  const values = {
    contractList,
    setContractList,
    selectedContract,
    setSelectedContract,
    loading,
    setLoading,
    conversations,
    conversationLoading,
    refetchContractList: refetch,
    askQuery,
    currentUserMessage,
    currentReply,
    sending,
  };

  return (
    <ContractAnalysisContext.Provider value={values}>
      {children}
    </ContractAnalysisContext.Provider>
  );
}

export function useContractAnalysis() {
  const context = React.useContext(ContractAnalysisContext);
  if (context === undefined) {
    throw new Error("useTags must be used within a ContractAnalysisProvider");
  }
  return context;
}
