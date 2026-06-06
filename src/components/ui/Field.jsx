import React from 'react'
import { cn } from '@/lib/utils'

// V2: stone surface, divider border, navy ink, bronze focus ring.
const fieldBase =
  'w-full bg-stone border border-divider text-navy placeholder:text-navy-mute/70 rounded-md px-3.5 py-2.5 text-[15px] transition-colors duration-150 focus:border-bronze focus:ring-0 outline-none'

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldBase, 'h-11', className)} {...props} />
))
Input.displayName = 'Input'

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, 'min-h-[120px] resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        fieldBase,
        'h-11 pr-10 appearance-none bg-white cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-mute"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
))
Select.displayName = 'Select'

export function Label({ htmlFor, required, children, className }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('block text-[14px] font-medium text-navy mb-1.5', className)}
    >
      {children}
      {required && <span className="ml-0.5 text-bronze">*</span>}
    </label>
  )
}

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      'mt-1 h-4 w-4 rounded border-divider text-bronze focus:ring-bronze accent-[#C8A56B] cursor-pointer',
      className,
    )}
    {...props}
  />
))
Checkbox.displayName = 'Checkbox'
