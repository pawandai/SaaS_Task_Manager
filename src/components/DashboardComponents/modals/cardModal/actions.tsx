"use client";

import { copyCard, deleteCard } from "@/actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction, useCardModal } from "@/hooks";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

const Actions = ({ data }: ActionsProps) => {
  const params = useParams();

  const { onClose } = useCardModal();

  const { execute: deleteExecute, loading: loadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} deleted successfully!`);
        onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const { execute: copyExecute, loading: loadingCopy } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card ${data.title} copied successfully!`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = () => {
    const boardId = params.boardId as string;

    copyExecute({ id: data.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    deleteExecute({ id: data.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        disabled={loadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={loadingDelete}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default Actions;

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-slate-200" />
      <Skeleton className="w-full h-8 bg-slate-200" />
      <Skeleton className="w-full h-8 bg-slate-200" />
    </div>
  );
};
