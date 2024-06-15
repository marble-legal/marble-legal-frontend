import { useEffect, useRef, useState } from "react";
import { api } from "../../../helpers/api";
import { useDebounce } from "../../../helpers/useDebounce";
import { ShowToast } from "../../../components/toast";
const LIMIT = 25;

function useContracts({ userId }) {
  const signalRef = useRef<any>();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: LIMIT,
  });
  const [state, setState] = useState<any>({
    // page: 1,
    keyword: "",
    // status: "active",
    limit: LIMIT,
    sort_by: "",
    sort_order: "",
    isGenerated: true,
  });

  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const debouncedFilters = useDebounce(state, 500);

  const fetchUsers = async (
    params,
    pageInfo = pagination,
    refetchId?: string,
    isDeleted?: boolean,
    refetchAll?: boolean
  ) => {
    if (!userId) return;
    try {
      setIsLoading(true);
      signalRef.current = new AbortController();
      const { data, total } = await api.searchContracts(
        userId,
        {
          ...params,
          ...pageInfo,
        },
        signalRef.current.signal
      );
      setIsLoading(false);
      // filter deleted question
      if (isDeleted && refetchId) {
        setData((prev) => prev.filter((item) => item.user_id !== refetchId));
      } else if (refetchId) {
        setData((prev) => [
          ...prev.filter((item) => item.user_id !== refetchId),
          ...data,
        ]);
      } else if (refetchAll) {
        const newData: any[] = [];
        // refetch all pages
        for (let i = 1; i <= pageInfo.page; i++) {
          const { data } = await api.searchContracts(
            userId,
            {
              ...params,
              page: i,
            },
            signalRef
          );
          newData.push(...data);
        }
        setData(newData);
      } else {
        if (pageInfo.page === 1) {
          setData([...data]);
        } else {
          setData((prev) => [...prev, ...data]);
        }
      }
      setTotal(total);
    } catch (err: any) {
      setIsLoading(false);
      if (err.code !== "ERR_CANCELED") {
        ShowToast({
          type: "error",
          message: "Failed to fetch users",
        });
      }
    }
  };

  const refetch = (
    refetchId?: string,
    isDeleted?: boolean,
    refetchAll?: boolean
  ) => {
    if (signalRef.current) {
      signalRef.current.abort();
      signalRef.current = null;
    }
    fetchUsers(debouncedFilters, pagination, refetchId, isDeleted, refetchAll);
  };

  const loadMore = () => {
    // update page only we have data
    if (data?.length > 0) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));

      if (signalRef.current) {
        signalRef.current.abort();
        signalRef.current = null;
      }
      fetchUsers(debouncedFilters, {
        ...pagination,
        page: pagination.page + 1,
      });
    }
  };

  const handleFilters = (updates: any) => {
    // update filters & reset to first page
    setIsLoading(true);
    setTimeout(() => {
      setData([]);
    }, 0);

    if (signalRef.current) {
      signalRef.current.abort();
      signalRef.current = null;
    }
    setPagination((prev) => ({ ...prev, page: 1 }));
    setState((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    if (signalRef.current) {
      signalRef.current.abort();
      signalRef.current = null;
    }
    fetchUsers(debouncedFilters);
  }, [debouncedFilters]);

  const users: any[] = data || [];
  return {
    users,
    totalPages: Math.ceil(total / LIMIT),
    total,
    isLoading: isLoading,
    isFetching,
    filters: state,
    loadMore,
    refetch,
    updateFilters: (updates) => handleFilters(updates),
    reset: () => {
      setData([]);
      setState({
        page: 1,
        keyword: "",
        // status: "active",
        limit: LIMIT,
        sort_by: "",
        sort_order: "",
      });
    },
  };
}

export default useContracts;
