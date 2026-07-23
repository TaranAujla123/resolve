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
  'inline-flex items-center justify-center gap-2 font-sans font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none',
  {
    variants: {
      variant: {
        // V3.5: navy is the primary CTA on light surfaces; bronze is
        // reserved for the accent, not buttons. "accent" stays bronze
        // for the rare intentional bronze fill.
        primary:
          'bg-[#B89865] text-white border border-[#B89865] hover:bg-[#a5875a] hover:border-[#a5875a]',
        contrast:
          'bg-stone text-navy border border-stone hover:bg-white hover:border-white',
        accent:
          'bg-bronze text-white border border-bronze hover:bg-bronze-deep hover:border-bronze-deep',
        outline:
          'bg-transparent border border-navy text-navy hover:bg-navy hover:text-white',
        ghost: 'text-navy hover:bg-mist',
        link: 'text-bronze underline-offset-4 hover:underline hover:text-bronze-deep px-0 h-auto tracking-normal',
      },
      size: {
        sm: 'h-10 px-4 text-[13px] rounded-button',
        md: 'h-11 px-6 text-[14px] rounded-button',
        lg: 'h-12 px-7 text-[15px] rounded-button',
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
