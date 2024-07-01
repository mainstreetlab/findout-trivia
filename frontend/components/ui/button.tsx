import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-accent text-white hover:bg-accent-hover',
        primary: 'bg-primary text-white',
        outline:
          'border border-accent bg-transparent text-accent hover:text-white hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-white',
        icon: 'p-1 w-12 h-12 bg-accent rounded-full text-white  hover:bg-accent-hover',
        link: 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline hover:text-accent-hover h-10 px-1 py-1.5',
      },
      size: {
        default: 'h-[44px] px-6',
        sm: 'h-8 w-8',
        md: 'h-[48px] w-[48px] p-1',
        lg: 'h-[56px] px-8 text-sm uppercase tracking-[2px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
