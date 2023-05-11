import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "standard" | "outlined";
}

const variantClasses = {
  standard: "bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded",
  outlined: "border border-blue-400 hover:bg-blue-500 px-4 py-2 rounded",
};

export default function Button({
  className,
  variant = "standard",
  ...props
}: ButtonProps) {
  const _className = twMerge(variantClasses[variant], className);

  return (
    <button className={_className} {...props}>
      {props.children}
    </button>
  );
}
