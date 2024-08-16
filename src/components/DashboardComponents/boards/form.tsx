"use client";

import React from "react";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions";
import FormInput from "../form/formInput";
import SubmitButton from "../form/submitButton";

const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "success");
    },
    onError: (error) => {
      console.error(error, "error");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} id="title" label="Board Title" />
      </div>
      <SubmitButton>Create</SubmitButton>
    </form>
  );
};

export default Form;
