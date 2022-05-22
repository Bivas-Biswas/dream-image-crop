import { HTMLButtonProps } from 'interfaces'
import React from 'react'
import { style, tw } from 'twind/style'

export const buttonStyle = style({
  base: 'inline-flex transition-colors items-center px-4 py-2 border border-transparent font-medium shadow-sm text-white focus:outline-none not-disabled:focus:ring-2 cursor-pointer disabled:cursor-default disabled:opacity-80',
  variants: {
    variant: {
      primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
      secondary:
        'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500',
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      transparent:
        'text-gray-300 hover:bg-gray-700 hover:text-white shadow-none',
    },
    size: {
      small: 'text-xs',
      regular: 'text-base',
      large: 'text-xl',
    },
    rounded: {
      none: 'rounded-none',
      default: 'rounded-md',
      full: 'rounded-full',
    },
  },
  defaults: {
    variant: 'primary',
    size: 'regular',
    rounded: 'default',
  },
})

export type ButtonStyleProps = Parameters<typeof buttonStyle>[0]

export type ButtonProps = HTMLButtonProps & ButtonStyleProps

export const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    size = 'regular',
    rounded = 'default',
    children,
    className,
    ...rest
  } = props

  return (
    <button
      className={`${tw(buttonStyle({ size, variant, rounded }))} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
