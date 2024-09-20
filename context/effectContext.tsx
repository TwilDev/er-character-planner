import React, { createContext, useState, useContext, useEffect } from 'react'
import { CharacterContext } from './characterContext'
import { effectData } from '@/data/effects/effectData.json'

interface IEffectContextContext {
  effects: IEffect[]
  setEffects: React.Dispatch<React.SetStateAction<IEffect[]>>
}

const EffectContext = createContext({} as IEffectContextContext)

const EffectContextProvider = ({ children }: any) => {
  const {
    greatRune,
    activateGreatRune,
    headArmour,
    bodyArmour,
    handsArmour,
    legsArmour,
    talismans,
  } = useContext(CharacterContext)

  const equipment = [
    headArmour,
    bodyArmour,
    handsArmour,
    legsArmour,
    talismans.slot1,
    talismans.slot2,
    talismans.slot3,
    talismans.slot4,
  ].filter((item) => item !== null)

  const [effects, setEffects] = useState<IEffect[]>([])

  const getEffects = () => {
    const newEffects: IEffect[] = []
    equipment.forEach((item) => {
      const checkEffect = effectData.find(
        (effect) => effect?.Source === item?.label
      )
      if (checkEffect) newEffects.push(checkEffect as IEffect)
    })

    // Get Effect for Great Rune if exists and is active
    if (greatRune) {
      if (activateGreatRune) {
        const checkEffect = effectData.find(
          (effect) => effect?.Source === greatRune
        )
        if (checkEffect) {
          newEffects.push(checkEffect as IEffect)
        }
      }
    }

    setEffects(newEffects)
  }

  useEffect(() => {
    getEffects()
  }, [
    headArmour,
    bodyArmour,
    handsArmour,
    legsArmour,
    talismans,
    activateGreatRune,
  ])

  return (
    <EffectContext.Provider value={{ effects, setEffects }}>
      {children}
    </EffectContext.Provider>
  )
}

export { EffectContextProvider, EffectContext }
