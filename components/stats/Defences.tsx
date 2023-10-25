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
  const { total, stats } = useContext(ClassContext)

  return (
    <div>
      <div className="mt-2">
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">Physical Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[stats.strength - 1])}</label>
            <label className='ml-2'>/ { physicalAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Strike</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[stats.strength - 1])}</label>
            <label className='ml-2'>/ { strikeAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Slash</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[stats.strength - 1])}</label>
            <label className='ml-2'>/ { slashAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Pierce</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[stats.strength - 1])}</label>
            <label className='ml-2'>/ { pierceAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="magicDefence">Magic Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defIntAdj[stats.intelligence - 1])}</label>
            <label>/ { magicalAbsorption }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="fireDefence">Fire Defence</label>
          <div>
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defFire[stats.vigor - 1])}</label>
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
            <label className='ml-2'>{Math.floor(defFlat[total - 1] + defHoly[stats.arcane - 1])}</label>
            <label>/ { holyAbsorption }</label>
          </div>
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