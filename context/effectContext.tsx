import React, { createContext, useState, useContext, useEffect } from "react"
import { EquipmentContext } from "./equipmentContext"
import { effectData } from "@/data/effects/effectData.json"

// Define the type for your context
interface IEffectContextContext {
  effects: IEffect[]
  setEffects: React.Dispatch<React.SetStateAction<IEffect[]>>
}

const EffectContext = createContext({} as IEffectContextContext)

const EffectContextProvider = ({ children }: any) => {

  const { armour, talismans } = useContext(EquipmentContext)
  
  const [effects, setEffects] = useState<IEffect[]>([])

  const getEffects = () => {
    const newEffects: IEffect[] = []
    // Get effects for armour
    for (const [key, value] of Object.entries(armour)) {
      const armourPiece = value as IArmourPiece
      if (armourPiece) {
        const checkEffect = effectData.find(effect => effect?.Source === armourPiece.label)
        if (checkEffect) {
          newEffects.push(checkEffect as IEffect)
        }
      }

    }
    
    // Get effects for talismans
    for (const [key, value] of Object.entries(talismans)) {
      const talisman = value as ITalisman
      if (talisman) {
        const checkEffect = effectData.find(effect => effect?.Source === talisman.label)
        if (checkEffect) {
          newEffects.push(checkEffect as IEffect)
        }
      }
    }

    // Get Effect for Great Rune if exists and is active
    
    
    setEffects(newEffects)
  }

  useEffect(() => {
    getEffects()
  }, [armour, talismans])


  return (
    <EffectContext.Provider value={{ effects, setEffects }}>
      {children}
    </EffectContext.Provider>
  )
}

export { EffectContextProvider, EffectContext }