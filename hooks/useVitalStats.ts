const coreStatsTable = require('@/data/lookup.json')
import { useContext, useState } from 'react'
import { EffectContext } from '@/context/effectContext'
import { ClassContext } from '@/context/classContext'
const { HP, FP, END, EQUIPLOAD } = coreStatsTable

export default function useVitalStats() {
  const { stats } = useContext(ClassContext)
  const { effects } = useContext(EffectContext)

  const calculateVigor = () => {
    const baseVigor = Math.floor(HP[stats.vigor - 1])
    // Iterate through effects and add all hpRate values to array
    const hpRateModifiers = effects.map(effect => effect.hpRate)
    // Multiply all values in array together
    const hpRateModifiersTotal = hpRateModifiers.reduce((acc, val) => acc * val, 1)  
    // Get final HP value by multiplying lookup value by modifiers
    const finalHP = Math.floor(baseVigor * hpRateModifiersTotal)

    return finalHP ?? "??"
  }

  return { calculateVigor }
}