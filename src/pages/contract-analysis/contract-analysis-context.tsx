import React, { useEffect, useState, useCallback } from "react";
import { getUser } from "../../helpers/utils";
import { api } from "../../helpers/api";

export const ContractAnalysisContext = React.createContext({});

export function ContractAnalysisProvider({ children }) {
  const querySignalRef = React.useRef<any>(null);
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
      querySignalRef.current = new AbortController();
      const response = await api.queryContract(
        selectedContract.id,
        {
          message,
        },
        querySignalRef.current.signal
      );

      setSending(false);
      if ([200, 201].includes(response.status)) {
        setCurrentReply(response.data.message);
        fetchContractMessages(selectedContract.id, false);
      }
    } catch (error) {
      setSending(false);
    }
  };

  const fetchContracts = async (userId?: string, selectLast = false) => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await api.getContracts(userId, false);
      setLoading(false);
      setContractList(res.data || []);
      if (selectLast && res?.data?.length > 0) {
        setSelectedContract(res.data[res.data.length - 1]);
      } else {
        if (!selectedContract && res?.data?.[0]) {
          setSelectedContract(res.data[0]);
        }
      }
    } catch (e) {}
  };

  const refetch = async (selectLast = false) => {
    if (!user.id) return;
    await fetchContracts(user?.id, selectLast);
  };

  useEffect(() => {
    if (user.id) {
      fetchContracts(user.id);
    }
  }, [user.id]);

  useEffect(() => {
    if (selectedContract?.id) {
      setCurrentReply("");
      setCurrentUserMessage("");
      if (querySignalRef.current) {
        querySignalRef.current.abort();
        querySignalRef.current = null;
      }
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
