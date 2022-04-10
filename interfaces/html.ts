import React from 'react'

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export type HTMLAnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type HTMLDivProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type OnClick<T extends HTMLOrSVGElement> = React.MouseEvent<
  T,
  MouseEvent
>
