import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-ink text-white hover:bg-[#0d2855] shadow-sm hover:shadow-md',
        accent:
          'bg-accent text-white hover:bg-accent-deep shadow-sm hover:shadow-md',
        outline:
          'border border-surface-line bg-white text-ink hover:border-ink/40 hover:bg-surface-tint',
        ghost: 'text-ink hover:bg-surface-tint',
        link: 'text-accent-deep underline-offset-4 hover:underline px-0 h-auto',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg',
        md: 'h-11 px-5 text-[15px] rounded-lg',
        lg: 'h-12 px-6 text-base rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export const Button = React.forwardRef(
  ({ className, variant, size, as: Tag = 'button', ...props }, ref) => (
    <Tag ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'
