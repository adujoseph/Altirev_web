import { memo } from 'react'

type Props = {}

const SkeletonCard = (props: Props) => {
  return (
    <div
      role="status"
      className="space-y-8 shadow w-[230px] rounded-xl p-4 my-5 h-[150px] animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
    >
      <div className="w-[280px]">
        <div className="h-2.5 bg-secondary/20 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-secondary/20 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-secondary/20 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-secondary/20 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-secondary/20 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-secondary/20 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default memo(SkeletonCard)
