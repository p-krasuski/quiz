import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-white font-medium transition",
        className
      )}
      {...props}
    />
  );
}
