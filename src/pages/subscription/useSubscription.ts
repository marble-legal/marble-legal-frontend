import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShowToast } from "../../components/toast";
import { getUser } from "../../helpers/utils";
import { api } from "../../helpers/api";

const useStripeSession = () => {
  const [stripeLoading, setStripeLoading] = useState(false);
  const user = getUser();

  const {
    data: activeSubscription,
    isLoading,
    refetch,
  } = useQuery(["subscription"], () => api.getUserSubscription(user.id));

  const handleGetStripeSession = useCallback(
    async ({
      planType,
      tier,
      aiAssistant,
      contractAnalysis,
      contractDrafting,
      businessEntity,
      attorneyReview,
    }: {
      planType: string;
      tier: string;
      aiAssistant?: number;
      contractAnalysis?: number;
      contractDrafting?: number;
      businessEntity?: number;
      attorneyReview?: number;
    }) => {
      console.log(
        "dddd",
        aiAssistant,
        contractAnalysis,
        contractDrafting,
        businessEntity,
        attorneyReview
      );
      if (!tier || !user.id) return;
      setStripeLoading(true);
      if (activeSubscription?.[0]) {
        // api
        //   .patchStripe(user.id, type, activeSubscription[0].subscriptionId)
        //   .then(() => {
        //     toast({
        //       description: "Subscription upgraded successfully",
        //     });
        //     refetch();
        //     setStripeLoading(false);
        //   })
        //   .catch(() => {
        //     toast({
        //       description: "Failed to upgrade subscription. Please try again.",
        //       variant: "destructive",
        //     });
        //     refetch();
        //     setStripeLoading(false);
        //   });
        api
          .customerStripePortal(user.id)
          .then((res) => {
            window.location.href = res.url;
            setStripeLoading(false);
            refetch();
          })
          .catch(() => {
            ShowToast({
              message: "Failed to upgrade subscription. Please try again.",
              type: "error",
            });
            setStripeLoading(false);
            refetch();
          });
      } else {
        try {
          const session = await api.getStripe({
            id: user.id,
            redirectUrl: window.location.origin + "/dashboard",
            planType,
            tier,
            aiAssistant,
            contractAnalysis,
            contractDrafting,
            businessEntity,
            attorneyReview,
          });
          window.location.href = session.url;
          setStripeLoading(false);
          refetch();
        } catch {
          ShowToast({
            message: "Failed to create Stripe session. Please try again.",
            type: "error",
          });
          setStripeLoading(false);
          refetch();
        }
      }
      refetch();
    },
    [activeSubscription, user.id, refetch]
  );

  const nextPackage = useCallback((): string => {
    if (activeSubscription?.[0]?.tier === "ST") {
      return "PR";
    } else if (activeSubscription?.[0]?.tier === "PR") {
      return "MX";
    } else if (activeSubscription?.[0]?.tier === "MX") {
      return "UL";
    } else if (activeSubscription?.[0]?.tier === "UL") {
      return "";
    }
    return "ST";
  }, [activeSubscription]);

  return {
    handleGetStripeSession,
    stripeLoading,
    nextPackage,
    activeSubscription,
    isLoading,
    refetch,
  };
};

export default useStripeSession;
