import React, { createContext, useState, useContext, useEffect } from "react"
import { CharacterContext } from "./characterContext"
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
  talismans: ITalismanSlots
  selectTalisman: (talisman: ITalisman, slot: keyof ITalismanSlots) => void
  weapons: any
  selectWeapon: (weapon: any, weaponSlot: any, affinity: number, upgradeLevel: number) => void
}

const EquipmentContext = createContext({} as IEquipmentContextContext)

const EquipmentContextProvider = ({ children }: any) => {

  // import character context
  const { 
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
  } = useContext(CharacterContext)

  const [armour, setArmour] = useState<IArmour>(
    {
      head: headArmour, 
      body: bodyArmour, 
      hands: handsArmour, 
      legs: legsArmour
    }
  )

  const [weapons, setWeapons] = useState<IWeaponSlots>(
    {
      rh1: rh1,
      rh2: rh2,
      rh3: rh3,
      lh1: lh1,
      lh2: lh2,
      lh3: lh3
    }
  )

  const updateWeapons = (weapon: any, weaponSlot: any) => {
    const newWeapons: any = {
      ...weapons,
      [weaponSlot]: weapon
    }
    setWeapons(newWeapons)
  }

  const selectWeapon = (weapon: any, weaponSlot: any, affinity: number, upgradeLevel: number) => {
    switch (weaponSlot) {
      case 'rh1':
        setRh1({ ID: weapon.id, weapon: weapon.weapon, weaponSlot: weaponSlot, affinity: affinity, upgradeLevel: upgradeLevel})
        updateWeapons(weapon, 'rh1')
        break;
      case 'rh2':
        setRh2({ ID: weapon.id, weapon: weapon.weapon, weaponSlot: weaponSlot, affinity: affinity, upgradeLevel: upgradeLevel})
        updateWeapons(weapon, 'rh2')
        break;
      case 'rh3':
        setRh3({ ID: weapon.id, weapon: weapon.weapon, weaponSlot: weaponSlot, affinity: affinity, upgradeLevel: upgradeLevel})
        updateWeapons(weapon, 'rh3')
        break;
      case 'lh1':
        setLh1({ ID: weapon.id, weapon: weapon.weapon, weaponSlot: weaponSlot, affinity: affinity, upgradeLevel: upgradeLevel})
        updateWeapons(weapon, 'lh1')
        break;
      case 'lh2':
        setLh2({ ID: weapon.id, weapon: weapon.weapon, weaponSlot: weaponSlot, affinity: affinity, upgradeLevel: upgradeLevel})
        updateWeapons(weapon, 'lh2')
        break;
      case 'lh3':
        setLh3({ ID: weapon.id, weapon: weapon.weapon, weaponSlot: weaponSlot, affinity: affinity, upgradeLevel: upgradeLevel})
        updateWeapons(weapon, 'lh3')
        break;
      default:
        break;
    }
  }

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

  const selectTalisman = (talisman: ITalisman, slot: keyof ITalismanSlots) => {
    const newTalismanSlots: ITalismanSlots = {
      ...talismans,
      [slot]: talisman
    }
    setTalismans(newTalismanSlots)
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
      armour,
      talismans,
      selectTalisman,
      weapons,
      selectWeapon
    }}>
      {children}
    </EquipmentContext.Provider>
  )
}

export { EquipmentContext, EquipmentContextProvider  }