"use client";

import { CardWithList } from "@/types";
import { Layout } from "lucide-react";
import React, { ElementRef, useRef, useState } from "react";
import FormInput from "../../form/formInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useAction } from "@/hooks";
import { updateCard } from "@/actions";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}

const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card updated successfully to "${data.title}"`);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    if (title === data.title) return;

    execute({ title, id: data.id, boardId });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 mt-1 text-slate-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-slate-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input shadow-none mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

export default Header;

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-slate-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-slate-200" />
        <Skeleton className="w-24 h-4 bg-slate-200" />
      </div>
    </div>
  );
};
