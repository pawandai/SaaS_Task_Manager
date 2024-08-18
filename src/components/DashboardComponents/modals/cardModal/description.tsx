"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import FormTextArea from "../../form/formTextarea";
import SubmitButton from "../../form/submitButton";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks";
import { updateCard } from "@/actions";
import { toast } from "sonner";

interface DescriptionProps {
  data: CardWithList;
}

const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      toast.success(`Card "${data.title}" updated successfully`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({ description, boardId, id: data.id });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-slate-700" />
      <div className="w-full">
        <p className="font-semibold text-slate-700 mb-2">Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <FormTextArea
              className="w-full mt-2"
              id="description"
              placeholder="Add a more detailed description"
              defaultValue={data.description || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2">
              <SubmitButton>Save</SubmitButton>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-slate-200 text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-slate-200" />
      <div className="w-full">
        <Skeleton className="h-6 w-24 mb-2 bg-slate-200" />
        <Skeleton className="h-[78px] w-full mb-2 bg-slate-200" />
      </div>
    </div>
  );
};
