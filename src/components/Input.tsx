import React, { forwardRef } from "react";
import { type Ref } from "react";

function Input(
  props: React.ComponentPropsWithRef<"input">,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      {...props}
      ref={ref}
      type="text"
      className="rounded border border-gray-800 px-4 py-2 dark:text-gray-800"
    />
  );
}

export default forwardRef(Input);
