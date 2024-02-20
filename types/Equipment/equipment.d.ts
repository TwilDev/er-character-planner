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
}

interface IWeaponSlots {
  rh1: IWeapon | null
  rh2: IWeapon | null
  rh3: IWeapon | null
  lh1: IWeapon | null
  lh2: IWeapon | null
  lh3: IWeapon | null
}

