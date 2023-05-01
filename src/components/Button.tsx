import React from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={twMerge(
        "rounded bg-blue-400 px-4 py-2 hover:bg-blue-500",
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}
