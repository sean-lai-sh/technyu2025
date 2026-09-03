import React from 'react'
import Link from 'next/link'
import { ApplicationStatus } from './ApplicationStatus'

type ApplyProps = {
  isOpen: boolean
  applicationLink?: string
  buttonText?: string
  className?: string
  statusClassName?: string
  buttonClassName?: string
}

export const Apply = ({
  isOpen,
  applicationLink,
  buttonText = 'Apply',
  className,
  statusClassName,
  buttonClassName
}: ApplyProps) => {
  const resolvedLink = applicationLink?.trim() || ''
  const isActionable = isOpen && Boolean(resolvedLink)

  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${className ?? ''}`}
    >
      <ApplicationStatus
        isOpen={isActionable}
        color={isActionable ? 'green' : 'red'}
        className={statusClassName}
      />
      {isActionable ? (
        <Link
          href={resolvedLink}
          className={`w-full rounded-md border border-white bg-transparent px-6 py-3 text-center font-semibold text-white transition-colors duration-[600ms] ease-in-out hover:bg-white hover:text-black md:w-auto ${buttonClassName ?? ''}`}
        >
          {buttonText}
        </Link>
      ) : null}
    </div>
  )
}
