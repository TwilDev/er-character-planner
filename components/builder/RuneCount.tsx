import { useEffect, useContext } from "react"
import { ClassContext } from "@/context/classContext"

export default function RuneCount() {
  const { level, baseStats, useRuneCosts } = useContext(ClassContext)
  const getBaselevel = () => {
    return Object.values(baseStats).reduce((acc, val) => acc + val, 0) - 79
  }
  const { nextLevelRunes, totalRunesRequired } = useRuneCosts(level, getBaselevel())
  // console.log(nextLevelRunes)
  // console.log(totalRunesRequired)
  return (
    <div>
      <div className='flex items-center justify-between w-full mb-2'>
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