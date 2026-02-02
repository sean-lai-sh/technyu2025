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
  const hasLink = Boolean(applicationLink)
  const shouldShowButton = isOpen
  const resolvedLink = hasLink ? (  applicationLink as string) : '#'

  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${className ?? ''}`}
    >
      <ApplicationStatus
        isOpen={isOpen}
        color={isOpen ? 'green' : 'red'}
        className={statusClassName}
      />
      {/* {shouldShowButton ? (
        <Link
          href={resolvedLink}
          aria-disabled={!hasLink}
          className={`w-full md:w-auto text-center rounded-md border border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors duration-[600ms] ease-in-out hover:bg-white hover:text-black ${!hasLink ? 'pointer-events-none opacity-60' : ''} ${buttonClassName ?? ''}`}
        >
          {buttonText}
        </Link>
      ) : null} */}
    </div>
  )
}
