import { memo } from 'react'

type Props = {}

const SkeletonTable = (props: Props) => {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-100 my-3 rounded"></div>
      <div className="my-3 h-10 bg-gray-100 rounded"></div>
      <div className="my-3 h-10 bg-gray-100  rounded"></div>
      <div className="my-3 h-10 bg-gray-100 rounded"></div>
      <div className="my-3 h-10 bg-gray-100 rounded"></div>
      <div className="my-3 h-10 bg-gray-100  rounded"></div>
    </div>
  )
}

export default memo(SkeletonTable)
