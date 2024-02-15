import React, { createContext, useState, useContext, useEffect } from "react"

interface ICharacterContext {
  characterName: string
  setCharacterName: React.Dispatch<React.SetStateAction<string>>
  baseStats: IStats
  setBaseStats: React.Dispatch<React.SetStateAction<IStats>>
  stats: IStats
  setStats: React.Dispatch<React.SetStateAction<IStats>>
  greatRune: GreatRune | null
  setGreatRune: React.Dispatch<React.SetStateAction<GreatRune | null>>
  activateGreatRune: boolean
  setActivateGreatRune: React.Dispatch<React.SetStateAction<boolean>>
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
  rh1: any
  setRh1: React.Dispatch<React.SetStateAction<any>>
  rh2: any
  setRh2: React.Dispatch<React.SetStateAction<any>>
  rh3: any
  setRh3: React.Dispatch<React.SetStateAction<any>>
  lh1: any
  setLh1: React.Dispatch<React.SetStateAction<any>>
  lh2: any
  setLh2: React.Dispatch<React.SetStateAction<any>>
  lh3: any
  setLh3: React.Dispatch<React.SetStateAction<any>>
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

  // User Great Rune
  const [greatRune, setGreatRune] = useState<GreatRune | null>(null)

  // Toggle Great Rune
  const [activateGreatRune, setActivateGreatRune] = useState<boolean>(false)

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

  const [rh1, setRh1] = useState<any>(null)
  const [rh2, setRh2] = useState<any>(null)
  const [rh3, setRh3] = useState<any>(null)
  const [lh1, setLh1] = useState<any>(null)
  const [lh2, setLh2] = useState<any>(null)
  const [lh3, setLh3] = useState<any>(null)

  return (
    <CharacterContext.Provider value={{
      characterName,
      setCharacterName,
      baseStats,
      setBaseStats,
      stats,
      setStats,
      greatRune,
      setGreatRune,
      activateGreatRune,
      setActivateGreatRune,
      headArmour,
      setHeadArmour,
      bodyArmour,
      setBodyArmour,
      handsArmour,
      setHandsArmour,
      legsArmour,
      setLegsArmour,
      talismans,
      setTalismans,
      rh1,
      setRh1,
      rh2,
      setRh2,
      rh3,
      setRh3,
      lh1,
      setLh1,
      lh2,
      setLh2,
      lh3,
      setLh3
    }}>
      {children}
    </CharacterContext.Provider>
  )
}

export { CharacterContext, CharacterContextProvider  }