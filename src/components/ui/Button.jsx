import React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button (legacy ui Button) — kept for backwards compatibility with
 * components migrated piecemeal during the V2 rebrand. The variant
 * styling has been updated in place so callers get V2 navy + stone
 * surfaces without a sweep, but new code should prefer
 * `@/components/brand/Button` for parity with the V2 design system.
 */
const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.12em] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-navy text-stone border border-navy hover:bg-[#051F35] hover:border-[#051F35]',
        accent:
          'bg-bronze text-stone border border-bronze hover:bg-bronze-deep hover:border-bronze-deep',
        outline:
          'bg-transparent border border-navy text-navy hover:bg-navy hover:text-stone',
        ghost: 'text-navy hover:bg-mist',
        link: 'text-bronze underline-offset-4 hover:underline hover:text-bronze-deep px-0 h-auto normal-case tracking-normal',
      },
      size: {
        sm: 'h-9 px-4 text-[12px] rounded-md',
        md: 'h-11 px-5 text-[13px] rounded-md',
        lg: 'h-12 px-6 text-[13.5px] rounded-md',
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
