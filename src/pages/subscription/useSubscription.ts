import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShowToast } from "../../components/toast";
import { getUser } from "../../helpers/utils";
import { api } from "../../helpers/api";
import { FeatureCode, SubscriptionTier } from "../../helpers/consts";

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

  const subscriptionStatus = useMemo(() => {
    console.log(activeSubscription);
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
        SubscriptionTier.Enterprise,
        SubscriptionTier.Standard,
      ].includes(subscription.tier)
    ) {
      return {
        ...subscriptionStatus,

        aiAssistant: true,
        contractAnalysis: true,
        contractDrafting: true,
        businessEntity: true,
        attorneyReview: false,
      };
    } else {
      // customised subscription
      subscriptionStatus.isCustomised = true;
      const { currentCredit, assignedCredit } = subscription;
      const assignedAiAssistant = subscription.assignedCredit.find(
        (credit) => credit.feature === FeatureCode.aiAssitant
      );
      const assignedContractAnalysis = subscription.assignedCredit.find(
        (credit) => credit.feature === FeatureCode.contractAnalysis
      );
      const assignedContractDrafting = subscription.assignedCredit.find(
        (credit) => credit.feature === FeatureCode.contractDrafting
      );
      const assignedBusinessEntity = subscription.assignedCredit.find(
        (credit) => credit.feature === FeatureCode.businessEntity
      );
      const assignedAttorneyReview = subscription.assignedCredit.find(
        (credit) => credit.feature === FeatureCode.attorneyReview
      );

      // current credit
      const currentAiAssistant = subscription.currentCredit.find(
        (credit) => credit.feature === FeatureCode.aiAssitant
      );
      const currentContractAnalysis = subscription.currentCredit.find(
        (credit) => credit.feature === FeatureCode.contractAnalysis
      );
      const currentContractDrafting = subscription.currentCredit.find(
        (credit) => credit.feature === FeatureCode.contractDrafting
      );
      const currentBusinessEntity = subscription.currentCredit.find(
        (credit) => credit.feature === FeatureCode.businessEntity
      );
      const currentAttorneyReview = subscription.currentCredit.find(
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
        assignedContractAnalysis:
          Number(assignedContractAnalysis?.quantity) || 0,
        assignedContractDrafting:
          Number(assignedContractDrafting?.quantity) || 0,
        assignedBusinessEntity: Number(assignedBusinessEntity?.quantity) || 0,
        assignedAttorneyReview: Number(assignedAttorneyReview?.quantity) || 0,

        currentAiAssistant: Number(currentAiAssistant?.quantity) || 0,
        currentContractAnalysis: Number(currentContractAnalysis?.quantity) || 0,
        currentContractDrafting: Number(currentContractDrafting?.quantity) || 0,
        currentBusinessEntity: Number(currentBusinessEntity?.quantity) || 0,
        currentAttorneyReview: Number(currentAttorneyReview?.quantity) || 0,
      };
      return subscriptionStatus;
    }
  }, [activeSubscription]);

  return {
    handleGetStripeSession,
    stripeLoading,
    nextPackage,
    activeSubscription,
    isLoading,
    refetch,
    subscriptionStatus,
  };
};

export default useStripeSession;
