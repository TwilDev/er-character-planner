import { useContext } from "react"
import { ClassContext } from "@/context/classContext"

export default function RuneCount() {
  const { totalRunesRequired, nextLevelRunes } = useContext(ClassContext)

  return (
    <div>
      <div className='flex gap-4 items-center justify-between w-full mt-4'>
        <div>
          <label htmlFor='level'>To Next Level</label>
          <label
            className='ml-2'
            htmlFor='level'
          >
            {nextLevelRunes}
          </label>
        </div>
        <div>
          <label htmlFor='level'>Total Runes required</label>
          <label
            className='ml-2'
            htmlFor='level'
          >
            {totalRunesRequired}
          </label>
        </div>
      </div>
    </div>
  )
}