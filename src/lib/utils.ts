import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that merges Tailwind classes
 * and removes conflicting or redundant styles.
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}
