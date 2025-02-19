import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShowToast } from "../../components/toast";
import { getUser } from "../../helpers/utils";
import { api } from "../../helpers/api";
import { FeatureCode, SubscriptionTier } from "../../helpers/consts";
import { useLocation } from "react-router-dom";

const useStripeSession = () => {
  const [stripeLoading, setStripeLoading] = useState(false);
  const user = getUser();
  const { pathname } = useLocation();

  const {
    data: activeSubscription,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["subscription"], () => api.getUserSubscription(user?.id), {
    staleTime: 15 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!user?.id,
  });

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
      if (!tier || !user?.id) return;
      setStripeLoading(true);
      if (
        activeSubscription?.[0] &&
        !activeSubscription?.[0]?.cancelledAt &&
        activeSubscription?.[0]?.tier !== SubscriptionTier.Customised &&
        tier !== SubscriptionTier.Customised
      ) {
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
          .customerStripePortal(user?.id)
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
            id: user?.id,
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
    [activeSubscription, user?.id, refetch]
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

  const subscriptionStatus = useMemo(() => {
    const subscription = activeSubscription?.[0];
    let subscriptionStatus = {
      isCustomised: false,
      aiAssistant: false,
      contractAnalysis: false,
      contractDrafting: false,
      businessEntity: false,
      attorneyReview: false,

      assignedAiAssistant: 0,
      assignedContractAnalysis: 0,
      assignedContractDrafting: 0,
      assignedBusinessEntity: 0,
      assignedAttorneyReview: 0,

      currentAiAssistant: 0,
      currentContractAnalysis: 0,
      currentContractDrafting: 0,
      currentBusinessEntity: 0,
      currentAttorneyReview: 0,
    };
    if (!subscription) return subscriptionStatus;

    // check for tier subscription
    if (
      [
        SubscriptionTier.Basic,
        // SubscriptionTier.Enterprise,
        SubscriptionTier.Standard,
      ].includes(subscription.tier)
    ) {
      subscriptionStatus = {
        ...subscriptionStatus,

        aiAssistant: true,
        contractAnalysis: true,
        contractDrafting: true,
        businessEntity: false,
        attorneyReview: false,
      };
    }
    // customised subscription
    subscriptionStatus.isCustomised = true;
    const { currentCredit = [], assignedCredit = [] } = subscription;
    const assignedAiAssistant = assignedCredit.find(
      (credit) => credit.feature === FeatureCode.aiAssitant
    );
    const assignedContractAnalysis = assignedCredit.find(
      (credit) => credit.feature === FeatureCode.contractAnalysis
    );
    const assignedContractDrafting = assignedCredit.find(
      (credit) => credit.feature === FeatureCode.contractDrafting
    );
    const assignedBusinessEntity = assignedCredit.find(
      (credit) => credit.feature === FeatureCode.businessEntity
    );
    const assignedAttorneyReview = assignedCredit.find(
      (credit) => credit.feature === FeatureCode.attorneyReview
    );

    // current credit
    const currentAiAssistant = currentCredit.find(
      (credit) => credit.feature === FeatureCode.aiAssitant
    );
    const currentContractAnalysis = currentCredit.find(
      (credit) => credit.feature === FeatureCode.contractAnalysis
    );
    const currentContractDrafting = currentCredit.find(
      (credit) => credit.feature === FeatureCode.contractDrafting
    );
    const currentBusinessEntity = currentCredit.find(
      (credit) => credit.feature === FeatureCode.businessEntity
    );
    const currentAttorneyReview = currentCredit.find(
      (credit) => credit.feature === FeatureCode.attorneyReview
    );

    // check for aiAssistant
    subscriptionStatus.aiAssistant =
      Number(currentAiAssistant?.quantity || 0) > 0;
    subscriptionStatus.contractAnalysis =
      Number(currentContractAnalysis?.quantity || 0) > 0;
    subscriptionStatus.contractDrafting =
      Number(currentContractDrafting?.quantity || 0) > 0;
    subscriptionStatus.businessEntity =
      Number(currentBusinessEntity?.quantity || 0) > 0;
    subscriptionStatus.attorneyReview =
      Number(currentAttorneyReview?.quantity || 0) > 0;

    subscriptionStatus = {
      ...subscriptionStatus,
      assignedAiAssistant: Number(assignedAiAssistant?.quantity) || 0,
      assignedContractAnalysis: Number(assignedContractAnalysis?.quantity) || 0,
      assignedContractDrafting: Number(assignedContractDrafting?.quantity) || 0,
      assignedBusinessEntity: Number(assignedBusinessEntity?.quantity) || 0,
      assignedAttorneyReview: Number(assignedAttorneyReview?.quantity) || 0,

      currentAiAssistant: Number(currentAiAssistant?.quantity) || 0,
      currentContractAnalysis: Number(currentContractAnalysis?.quantity) || 0,
      currentContractDrafting: Number(currentContractDrafting?.quantity) || 0,
      currentBusinessEntity: Number(currentBusinessEntity?.quantity) || 0,
      currentAttorneyReview: Number(currentAttorneyReview?.quantity) || 0,
    };

    // check for Standard tier subscription, unlimited
    if (
      SubscriptionTier.Standard === subscription.tier ||
      SubscriptionTier.Basic === subscription.tier
    ) {
      subscriptionStatus = {
        ...subscriptionStatus,
        aiAssistant: true,
        contractAnalysis: true,
        contractDrafting: true,
      };
    }

    return subscriptionStatus;
  }, [activeSubscription]);

  useEffect(() => {
    refetch();
  }, [pathname]);

  const subscription = activeSubscription?.[0];

  return {
    handleGetStripeSession,
    stripeLoading,
    nextPackage,
    activeSubscription,
    isLoading: isLoading || isFetching,
    refetch,
    subscriptionStatus,
    subscription,
  };
};

export default useStripeSession;
