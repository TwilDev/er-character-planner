import React, { createContext, useState, useContext, useEffect } from "react"

interface ICharacterContext {
  characterName: string
  setCharacterName: React.Dispatch<React.SetStateAction<string>>
  baseStats: IStats
  setBaseStats: React.Dispatch<React.SetStateAction<IStats>>
  stats: IStats
  setStats: React.Dispatch<React.SetStateAction<IStats>>
  headArmour: IArmourPiece | null
  setHeadArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  bodyArmour: IArmourPiece | null
  setBodyArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  handsArmour: IArmourPiece | null
  setHandsArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  legsArmour: IArmourPiece | null
  setLegsArmour: React.Dispatch<React.SetStateAction<IArmourPiece | null>>
  talismans: ITalismanSlots
  setTalismans: React.Dispatch<React.SetStateAction<ITalismanSlots>>
}

const CharacterContext = createContext({} as ICharacterContext)

const CharacterContextProvider = ({ children }: any) => {

  // Name for Character
  const [characterName, setCharacterName] = useState<string>('Maidenless Tarnished')

  //Base stats currently hardcoded for Vagabond
  const [baseStats, setBaseStats] = useState<IStats>({
    vigor: 15,
    mind: 10,
    endurance: 11,
    strength: 14,
    dexterity: 13,
    intelligence: 9,
    faith: 9,
    arcane: 7,
  })

  // User Stats
  const [stats, setStats] = useState<IStats>(baseStats)

  // User selected Armour
  const [headArmour, setHeadArmour] = useState<IArmourPiece | null>(null)
  const [bodyArmour, setBodyArmour] = useState<IArmourPiece | null>(null)
  const [handsArmour, setHandsArmour] = useState<IArmourPiece | null>(null)
  const [legsArmour, setLegsArmour] = useState<IArmourPiece | null>(null)

  // User selected Talismans
  const [talismans, setTalismans] = useState<ITalismanSlots>({
    slot1: null,
    slot2: null,
    slot3: null,
    slot4: null
  })

  return (
    <CharacterContext.Provider value={{
      characterName,
      setCharacterName,
      baseStats,
      setBaseStats,
      stats,
      setStats,
      headArmour,
      setHeadArmour,
      bodyArmour,
      setBodyArmour,
      handsArmour,
      setHandsArmour,
      legsArmour,
      setLegsArmour,
      talismans,
      setTalismans
    }}>
      {children}
    </CharacterContext.Provider>
  )
}

export { CharacterContext, CharacterContextProvider  }