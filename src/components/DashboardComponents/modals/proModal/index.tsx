"use client";

import { stripeRedirect } from "@/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks";
import { useProModal } from "@/hooks/useProModal";
import { error } from "console";
import Image from "next/image";
import { toast } from "sonner";

const ProModal = () => {
  const { isOpen, onClose } = useProModal();

  const { execute, loading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image className="object-cover" fill alt="Pro hero" src="/logo.png" />
        </div>
        <div className="text-slate-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Pro for legendary features!
          </h2>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards per organization</li>
              <li>Advanced Features</li>
              <li>Legendary Looks</li>
              <li>High quality background images</li>
            </ul>
          </div>
          <Button disabled={loading} onClick={onClick} className="w-full">
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
