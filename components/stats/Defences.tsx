// Get lookup tables from JSON files
const defTable = require('@/data/defence.json')
const { defFlat, defStrAdj, defIntAdj, defFire, defHoly } = defTable
const resistancesTable = require('@/data/resistances.json')
const { imFlat, imAdj, robFlat, robAdj, focFlat, focAdj, vitFlat, vitAdj } = resistancesTable

import useCalculateAbsorption from '@/hooks/useCalculateAbsorption'
import { useContext } from 'react'
import { ClassContext } from '@/context/classContext'

export default function Defences() {

  const { phsyicalAbsorption } = useCalculateAbsorption()
  const { total, stats } = useContext(ClassContext)

  return (
    <div>
      <div className="mt-2">
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">Physical Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[stats.strength - 1])}</label>
          <label className='ml-2'>/ { phsyicalAbsorption }</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="magicDefence">Magic Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defIntAdj[stats.intelligence - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="fireDefence">Fire Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defFire[stats.vigor - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="lightningDefence">Lightning Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="holyDefence">Holy Defence</label>
          <label className='ml-2'>{Math.floor(defFlat[total - 1] + defHoly[stats.arcane - 1])}</label>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between">
          <label htmlFor="immunityResistance">Immunity</label>
          <label className='ml-2'>{Math.floor(imFlat[total - 1] + imAdj[stats.vigor - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="robustnessResistance">Robustness</label>
          <label className='ml-2'>{Math.floor(robFlat[total - 1] + robAdj[stats.endurance - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="focusResistance">Focus</label>
          <label className='ml-2'>{Math.floor(focFlat[total - 1] + focAdj[stats.mind - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="vitalityResistance">Vitality</label>
          <label className='ml-2'>{Math.floor(vitFlat[total - 1] + vitAdj[stats.arcane - 1])}</label>
        </div>
      </div> 
    </div>
  )
}