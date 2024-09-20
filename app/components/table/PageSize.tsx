import { memo } from 'react'

type Props = {
  setPageCount: (e: any) => void
}

const PageSize = ({ setPageCount }: Props) => {
  return (
    <div className="flex space-x-3 items-center ">
      <p>Page Size</p>
      <select
        className="w-[70px] p-1 my-3 border-2 rounded-md outline-none border-secondary cursor-pointer"
        onChange={(e: any) => setPageCount(Number(e.target.value))}
        name="page"
        id="page"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  )
}

export default memo(PageSize)
