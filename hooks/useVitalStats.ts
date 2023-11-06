const coreStatsTable = require('@/data/lookup.json')
import { useContext, useState } from 'react'
import { EffectContext } from '@/context/effectContext'
import { ClassContext } from '@/context/classContext'
const { HP, FP, END, EQUIPLOAD } = coreStatsTable

export default function useVitalStats() {
  const { stats } = useContext(ClassContext)
  const { effects } = useContext(EffectContext)

  const calculateVitalStat = (stat: keyof IStats) => {

    let lookupTable: any = null
    let modifierKey: keyof IEffect

    // Set lookup table and modifier key based on stat
    switch (stat) {
      case "vigor":
        lookupTable = HP
        modifierKey = "hpRate"
        break
      case "mind":
        lookupTable = FP
        modifierKey = "mpRate"
        break
      case "endurance":
        lookupTable = END
        modifierKey = "stamRate"
        break
      default:
        return "??"
    }
    
    if (!lookupTable || !modifierKey) return "??"

    const baseStat = Math.floor(lookupTable[stats[stat] - 1])
    // Iterate through effects and add all values matching modifier key to array
    const modifiers = effects.map(effect => effect[modifierKey])
    // Multiply all values in array together
    const modifiersTotal = modifiers.reduce((acc, val) => Number(acc) * Number(val), 1)  
    // Get final stat value by multiplying lookup value by modifiers
    const finalStat = Math.floor(baseStat * Number(modifiersTotal))

    return finalStat ?? "??"
  }



  return { calculateVitalStat }
}