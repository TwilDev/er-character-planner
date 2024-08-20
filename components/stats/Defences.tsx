// Get lookup tables from JSON files
const defTable = require('@/data/defence.json')
const { defFlat, defStrAdj, defIntAdj, defFire, defHoly } = defTable
const resistancesTable = require('@/data/resistances.json')
const { imFlat, imAdj, robFlat, robAdj, focFlat, focAdj, vitFlat, vitAdj } = resistancesTable

import useCalculateAbsorption from '@/hooks/useCalculateAbsorption'
import { useContext } from 'react'
import { ClassContext } from '@/context/classContext'
import { useEffect, useState } from 'react'

export default function Defences() {

  const { 
    physical,
    strike,
    slash,
    pierce,
    magical,
    fire,
    lightning,
    holy,
  } = useCalculateAbsorption()
  const { total, totalStats } = useContext(ClassContext)

  // Physical defences
  const [physicalDefence, setPhysicalDefence] = useState<number>(0)
  const [strikeDefence, setStrikeDefence] = useState<number>(0)
  const [slashDefence, setSlashDefence] = useState<number>(0)
  const [pierceDefence, setPierceDefence] = useState<number>(0)
  
  // Elemental defences
  const [magicDefence, setMagicDefence] = useState<number>(0)
  const [fireDefence, setFireDefence] = useState<number>(0)
  const [lightningDefence, setLightningDefence] = useState<number>(0)
  const [holyDefence, setHolyDefence] = useState<number>(0)

  // Status resistances
  const [immunity, setImmunity] = useState<number>(0)
  const [robustness, setRobustness] = useState<number>(0)
  const [focus, setFocus] = useState<number>(0)
  const [vitality, setVitality] = useState<number>(0)


  useEffect(() => {
    setPhysicalDefence(Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1]))
    setStrikeDefence(Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1]))
    setSlashDefence(Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1]))
    setPierceDefence(Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1]))
    setMagicDefence(Math.floor(defFlat[total - 1] + defIntAdj[totalStats.intelligence - 1]))
    setFireDefence(Math.floor(defFlat[total - 1] + defFire[totalStats.vigor - 1]))
    setLightningDefence(Math.floor(defFlat[total - 1]))
    setHolyDefence(Math.floor(defFlat[total - 1] + defHoly[totalStats.arcane - 1]))
    setImmunity(Math.floor(imFlat[total - 1] + imAdj[totalStats.vigor - 1]))
    setRobustness(Math.floor(robFlat[total - 1] + robAdj[totalStats.endurance - 1]))
    setFocus(Math.floor(focFlat[total - 1] + focAdj[totalStats.mind - 1]))
    setVitality(Math.floor(vitFlat[total - 1] + vitAdj[totalStats.arcane - 1]))

  }, [total, totalStats])

  return (
    <div className="w-full">
      <label htmlFor="def">Defence/Absorption</label>
      <div className="mt-2">
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">Physical Defence</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label> */}
            <label className='ml-2'>{ physicalDefence }</label>
            <label className='ml-2'>/ { physical }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Strike</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label> */}
            <label className='ml-2'>{ strikeDefence }</label>
            <label className='ml-2'>/ { strike }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Slash</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label> */}
            <label className='ml-2'>{ slashDefence }</label>
            <label className='ml-2'>/ { slash }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="physicalDefence">VS Pierce</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1] + defStrAdj[totalStats.strength - 1])}</label> */}
            <label className='ml-2'>{ pierceDefence }</label>
            <label className='ml-2'>/ { pierce }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="magicDefence">Magic Defence</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1] + defIntAdj[totalStats.intelligence - 1])}</label> */}
            <label className='ml-2'>{ magicDefence }</label>
            <label>/ { magical }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="fireDefence">Fire Defence</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1] + defFire[totalStats.vigor - 1])}</label> */}
            <label className='ml-2'>{ fireDefence }</label>
            <label>/ { fire }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="lightningDefence">Lightning Defence</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1])}</label> */}
            <label className='ml-2'>{ lightningDefence }</label>
            <label>/ { lightning }</label>
          </div>
        </div>
        <div className="flex justify-between">
          <label htmlFor="holyDefence">Holy Defence</label>
          <div>
            {/* <label className='ml-2'>{Math.floor(defFlat[total - 1] + defHoly[totalStats.arcane - 1])}</label> */}
            <label className='ml-2'>{ holyDefence }</label>
            <label>/ { holy }</label>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor="resistances">Resistances</label>
        <div className="flex justify-between mt-1">
          <label htmlFor="immunityResistance">Immunity</label>
          {/* <label className='ml-2'>{Math.floor(imFlat[total - 1] + imAdj[totalStats.vigor - 1])}</label> */}
          <label className='ml-2'>{ immunity }</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="robustnessResistance">Robustness</label>
          {/* <label className='ml-2'>{Math.floor(robFlat[total - 1] + robAdj[totalStats.endurance - 1])}</label> */}
          <label className='ml-2'>{ robustness }</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="focusResistance">Focus</label>
          {/* <label className='ml-2'>{Math.floor(focFlat[total - 1] + focAdj[totalStats.mind - 1])}</label> */}
          <label className='ml-2'>{ focus }</label>
        </div>
        <div className="flex justify-between">
          <label htmlFor="vitalityResistance">Vitality</label>
          {/* <label className='ml-2'>{Math.floor(vitFlat[total - 1] + vitAdj[totalStats.arcane - 1])}</label> */}
          <label className='ml-2'>{ vitality }</label>
        </div>
      </div> 
    </div>
  )
}