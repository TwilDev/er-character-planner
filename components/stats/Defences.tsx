// Get lookup tables from JSON files
const defTable = require('@/data/defence.json')
const { defFlat, defStrAdj, defIntAdj, defFire, defHoly } = defTable
const resistancesTable = require('@/data/resistances.json')
const { imFlat, imAdj, robFlat, robAdj, focFlat, focAdj, vitFlat, vitAdj } = resistancesTable

import useCalculateAbsorption from '@/hooks/useCalculateAbsorption'
import { useContext } from 'react'
import { ClassContext } from '@/context/classContext'

export default function Defences() {

  const { 
    physicalAbsorption,
    strikeAbsorption,
    slashAbsorption,
    pierceAbsorption,
    magicalAbsorption, 
    fireAbsorption, 
    lightningAbsorption, 
    holyAbsorption 
  } = useCalculateAbsorption()
  const { total, totalStats } = useContext(ClassContext)

  return (
    <div>
      <div className="mt-2">
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">Physical Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label>
            <label className='ml-2'>/ { physicalAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Strike</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label>
            <label className='ml-2'>/ { strikeAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Slash</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label>
            <label className='ml-2'>/ { slashAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Pierce</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label>
            <label className='ml-2'>/ { pierceAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="magicDefence">Magic Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defIntAdj[totalStats.intelligence - 1])}</label>
            <label>/ { magicalAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="fireDefence">Fire Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defFire[totalStats.vigor - 1])}</label>
            <label>/ { fireAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="lightningDefence">Lightning Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1])}</label>
            <label>/ { lightningAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="holyDefence">Holy Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defHoly[totalStats.arcane - 1])}</label>
            <label>/ { holyAbsorption }</label>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between">
          <label htmlFor="immunityResistance">Immunity</label>
          <label className='ml-2'>{Math.floor(imFlat[total - 1] + imAdj[totalStats.vigor - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="robustnessResistance">Robustness</label>
          <label className='ml-2'>{Math.floor(robFlat[total - 1] + robAdj[totalStats.endurance - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="focusResistance">Focus</label>
          <label className='ml-2'>{Math.floor(focFlat[total - 1] + focAdj[totalStats.mind - 1])}</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="vitalityResistance">Vitality</label>
          <label className='ml-2'>{Math.floor(vitFlat[total - 1] + vitAdj[totalStats.arcane - 1])}</label>
        </div>
      </div> 
    </div>
  )
}