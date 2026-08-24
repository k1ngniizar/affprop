import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally combine CSS classes and merge Tailwind CSS classes efficiently.
 *
 * @param {...ClassValue[]} inputs - Class names, expressions, or objects.
 * @returns {string} Merged class names string with Tailwind conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

