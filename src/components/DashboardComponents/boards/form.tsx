"use client";

import { create } from "@/actions";
import React from "react";
import { useFormState } from "react-dom";
import FormInput from "./formInput";
import FormButton from "./formButton";

const Form = () => {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={state?.errors} />
      </div>

      <FormButton />
    </form>
  );
};

export default Form;
