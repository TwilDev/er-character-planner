const coreStatsTable = require('@/data/lookup.json')
const { HP, FP, END, EQUIPLOAD } = coreStatsTable
import { useContext } from 'react'
import { ClassContext } from '@/context/classContext'
import { EffectContext } from '@/context/effectContext'
import useCalculatePoise from '@/hooks/useCalculatePoise'
import useVitalStats from '@/hooks/useVitalStats'

export default function VitalStats() {
  const { stats } = useContext(ClassContext)
  const { poise } = useCalculatePoise()
  const { effects } = useContext(EffectContext)
  const { calculateVitalStat } = useVitalStats()

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <label htmlFor='hp'>HP</label>
        <label className='ml-2'>{calculateVitalStat('vigor')}</label>
      </div>
      <div className="flex justify-between">
        <label htmlFor="fp">FP</label>
        <label className='ml-2'>{calculateVitalStat('mind')}</label>
      </div>
      <div className="flex justify-between">
        <label htmlFor="end">Stamina</label>
        <label className='ml-2'>{calculateVitalStat('endurance')}</label>
      </div>
      <div className="flex justify-between">
        <label htmlFor="eqp">Equip Load</label>
        <label className='ml-2'>TODO</label>
      </div>
      <div className="flex justify-between">
        <label htmlFor="poise">Poise</label>
        <label className='ml-2'>{ poise }</label>
      </div>
  </div>
  )
}