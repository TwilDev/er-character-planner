import React, { createContext, useState, useContext, useEffect } from "react"
import getNextLevelRunes from "@/helpers/getNextLevelRunes"

// Define the type for your context
interface IEquipmentContextContext {
  headArmour: IArmourPiece | null
  setHeadArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  bodyArmour: IArmourPiece | null
  setBodyArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  handsArmour: IArmourPiece | null
  setHandsArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  legsArmour: IArmourPiece | null
  setLegsArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  selectArmour: (armourPiece: IArmourPiece) => void
  armour: IArmour
}

const EquipmentContext = createContext({} as IEquipmentContextContext)

const EquipmentContextProvider = ({ children }: any) => {

  const [headArmour, setHeadArmour] = useState<IArmourPiece | null>(null)
  const [bodyArmour, setBodyArmour] = useState<IArmourPiece | null>(null)
  const [handsArmour, setHandsArmour] = useState<IArmourPiece | null>(null)
  const [legsArmour, setLegsArmour] = useState<IArmourPiece | null>(null)

  const [armour, setArmour] = useState<IArmour>(
    {
      head: headArmour, 
      body: bodyArmour, 
      hands: handsArmour, 
      legs: legsArmour
    }
  )

  const updateArmour = (armourPiece: IArmourPiece, armourSlot: keyof IArmour) => {
    const newArmour: IArmour = {
      ...armour,
      [armourSlot]: armourPiece
    }
    setArmour(newArmour)
  }

  const selectArmour = (armourPiece: IArmourPiece) => {
    switch (armourPiece.value.armourType) {
      case 'Head':
        setHeadArmour(armourPiece)
        updateArmour(armourPiece, 'head')
        break;
      case 'Body':
        setBodyArmour(armourPiece)
        updateArmour(armourPiece, 'body')
        break;
      case 'Hands':
        setHandsArmour(armourPiece)
        updateArmour(armourPiece, 'hands')
        break;
      case 'Legs':
        setLegsArmour(armourPiece)
        updateArmour(armourPiece, 'legs')
        break
      default:
        break;
    }
  }


  return (
    <EquipmentContext.Provider value={{
      headArmour,
      bodyArmour,
      handsArmour,
      legsArmour,
      setHeadArmour,
      setBodyArmour,
      setHandsArmour,
      setLegsArmour,
      selectArmour,
      armour
    }}>
      {children}
    </EquipmentContext.Provider>
  )
}

export { EquipmentContext, EquipmentContextProvider  }