"use client";

import { stripeRedirect } from "@/actions";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks";
import { useProModal } from "@/hooks/useProModal";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const { onOpen } = useProModal();

  const { execute, loading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) execute({});
    else onOpen();
  };

  return (
    <Button disabled={loading} onClick={onClick}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};

export default SubscriptionButton;
