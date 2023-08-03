const coreStatsTable = require('@/data/lookup.json')
const { HP, FP, END } = coreStatsTable
import { useContext } from 'react'
import { ClassContext } from '@/context/classContext'

export default function VitalStats() {
  const { stats } = useContext(ClassContext)

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <label htmlFor='hp'>HP</label>
        <label className='ml-2'>{Math.floor(HP[stats.vigor - 1]) ?? '??'}</label>
      </div>
      <div className="flex justify-between">
        <label htmlFor="fp">FP</label>
        <label className='ml-2'>{Math.floor(FP[stats.mind - 1])}</label>
      </div>
      <div className="flex justify-between">
        <label htmlFor="end">Stamina</label>
        <label className='ml-2'>{Math.floor(END[stats.endurance - 1])}</label>
      </div>
  </div>
  )
}