import React from 'react'
import { cn } from '@/lib/utils'

const fieldBase =
  'w-full bg-white border border-surface-line text-ink placeholder:text-ink-mute/70 rounded-lg px-3.5 py-2.5 text-[15px] transition-colors duration-150 focus:border-accent focus:ring-0 outline-none'

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
      className={cn('block text-sm font-medium text-ink mb-1.5', className)}
    >
      {children}
      {required && <span className="ml-0.5 text-accent-deep">*</span>}
    </label>
  )
}

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      'mt-1 h-4 w-4 rounded border-surface-line text-accent focus:ring-accent accent-[#1F8B5A] cursor-pointer',
      className,
    )}
    {...props}
  />
))
Checkbox.displayName = 'Checkbox'
