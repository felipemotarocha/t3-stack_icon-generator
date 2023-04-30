import React from "react";

export default function FormGroup(
  props: React.ComponentPropsWithoutRef<"div">
) {
  return (
    <div className="flex flex-col gap-1" {...props}>
      {props.children}
    </div>
  );
}
