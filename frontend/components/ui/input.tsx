import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input focus-visible:border-accent",
        clickable:
          "text-left border border-accent/40 focus-visible:bg-accent  cursor-pointer text-accent focus-visible:text-white placeholder:text-[20px]          placeholder:text-accent focus-visible:placeholder:text-white/90 placeholder:font-medium placeholder:text-center cursor-pointer",
      },
      size: {
        default: "h-12",
        md: "h-[56px] p-3",
        lg: "h-[64px] px-8 text-sm uppercase tracking-[2px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "default" | "clickable" | null | undefined
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant="default", size="default", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`${cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )} ${ inputVariants({variant})}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
