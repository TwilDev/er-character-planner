interface IArmour {
  head: IArmourPiece | null
  body: IArmourPiece | null
  hands: IArmourPiece | null
  legs: IArmourPiece | null
}

interface IArmourPiece {
  label: string, 
  value: {
    armourType: string,
    armourPiece: string,
    id: number
  } 
}

interface ITalismanSlots {
  slot1: ITalisman | null
  slot2: ITalisman | null
  slot3: ITalisman | null
  slot4: ITalisman | null
}


interface ITalisman {
  value: {
    Talisman: string
    ID: number
    accessoryGroup: number
  }
  label: string
}

interface IWeapon {
  ID: number
  weapon: string
  weaponSlot: string
  affinity: number
  upgradeLevel: number
  isReinforce: boolean
  isInfuse: boolean
  isUnique: boolean
}

interface IWeaponSlots {
  rh1: IWeapon | null
  rh2: IWeapon | null
  rh3: IWeapon | null
  lh1: IWeapon | null
  lh2: IWeapon | null
  lh3: IWeapon | null
}

interface IWeaponData {
  bothHandsAtkBonus: boolean
  castingBonusRate: string | null
  castingBonusType: string | null
  defaultPhysType: string
  id: number
  isInfuse: boolean
  isReinforce: boolean
  isUnique: true
  label: string
  specialStatusSpEffectId: number | null
  throwable: boolean
  value?: string
  waAttackElementCorrectId: null
  weapon: string
  weaponClass: string
}

