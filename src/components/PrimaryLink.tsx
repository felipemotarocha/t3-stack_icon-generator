import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function PrimaryLink({
  className,
  children,
  ...props
}: LinkProps & { children: ReactNode; className?: string }) {
  const _className = twMerge("hover:text-cyan-500", className);

  return (
    <Link className={_className} {...props}>
      {children}
    </Link>
  );
}
